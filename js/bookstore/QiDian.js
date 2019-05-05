import CheerioParser from "../cheerio/CheerioParser";
import DataStore from '../expand/DataStore';

export default class QiDian {
    constructor() {
        this.parser = new CheerioParser();
        this.datastore = new DataStore();
        this.panel_url_list = [
            "https://www.qidian.com/rank/yuepiao",
            "https://www.qidian.com/rank/hotsales",
            "https://www.qidian.com/rank/newvipclick",
            "https://www.qidian.com/rank/recom",
            "https://www.qidian.com/rank/collect",
            "https://www.qidian.com/rank/fin",
            "https://www.qidian.com/rank/signnewbook",
            "https://www.qidian.com/rank/pubnewbook",
        ];
        this.panel_book_rule_list = [
            ".book-img-text ul li .book-img-box a img",
            ".book-mid-info h4 a",
            ".book-mid-info .author",
        ];
        this.panel_header_rule = [".rank-header .lang"];
        this.book_detail_rule = [
            ".book-intro p",
            ".update .detail .cf",
            ".book-img a img",
            ".book-info h1",
            ".like-more-list ul",
        ];
        this.chapter_rule = [
            ".volume-wrap .volume",
        ];
        this.chapter_content_rule = [
            ".read-content",
        ];
    }

    /**
     * 当遇到异步数据时使用异步链接获取章节列表
     * @param bookId
     * @returns {Promise<any>}
     * @private
     */
    _ajaxGetChapter(bookId) {
        return new Promise((resolve, reject) => {
            let _csrfToken = "GFdIkjcuDEf2oGrGhHYBOUXuGGtwsKV0zipboejF";
            this.datastore.fetchData("https://book.qidian.com/ajax/book/category?" + _csrfToken + "&bookId=" + bookId)
                .then(data => {
                    resolve(this.clearAjaxChapter(data.data.data.vs))
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }


    /**
     * 清洗异步的章节数据
     * @param arr
     * @returns {any[]}
     */
    clearAjaxChapter(arr) {
        let chaList = new Array();
        for (let index = 0, len = arr.length; index < len; index++) {
            const chapterList = arr[index].cs
            for (let i = 0, len = chapterList.length; i < len; i++) {
                chaList.push({
                    title: chapterList[i].cN,
                    href:  "https://read.qidian.com/chapter/" + chapterList[i].cU,
                    tip:   chapterList[i].uT,
                })
            }
        }
        return chaList;
    }




    /**
     * 获取章节内容
     * @param url
     * @param ruleArr
     * @returns {Promise<any>}
     * @private
     */
    _getChapterContent(url,ruleArr) {
        return new Promise((resolve, reject) => {
            this.parser.parserHtmlWithRule(url,ruleArr)
                .then(data => {
                    resolve(this.createNode(data[0][0].children))
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    createNode(arr) {
        let innerText = "";
        for (let index = 0, len = arr.length; index < len; index++) {
            if (arr[index].name == 'p') {
                innerText += "<span>" + arr[index].children[0].data + "</span>";
            }
        }
        return innerText;
    }



    /**
     * 获取书籍的章节列表
     * @param url
     * @param ruleArr
     * @returns {Promise<any>}
     * @private
     */
    _getBookChapter(url,ruleArr) {
        return new Promise((resolve, reject) => {
            this.parser.parserHtmlWithRule(url+ "#Catalog",ruleArr)
                .then(data => {
                    resolve(this.clearChapter(data))
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    /**
     * 从每个卷中解析提取章节
     * @param groupArr
     * @returns {any[]}
     */
    clearChapter(groupArr) {
        let chapter = new Array();
        for (let index = 0, len = groupArr.length; index < len; index++) {
            const arr = groupArr[index][0].children[5].children;
            for (let i = 0, len = arr.length; i < len; i++) {
                if (arr[i].name == "li") {
                    chapter.push({
                        title: arr[i].children[0].children[0].data,
                        href:  "https:" + arr[i].children[0].attribs.href,
                        tip:   arr[i].children[0].attribs.title,
                    })
                }
            }
        }
        return chapter;
    }



    /**
     * 获取面板数据并解析清洗数据
     * @param url
     * @param ruleArr
     * @param ruleHeader
     * @returns {Promise<any>}
     * @private
     */
    _getFlatListItemData(url,ruleArr,ruleHeader) {
        return new Promise((resolve, reject) => {
            let panelData = new Object();
            this.parser.parserHtmlWithRule(url,ruleHeader)
            .then((data) => {
                panelData.header = data[0][0].children[0].data;
                this.parser.parserHtmlWithRule(url,ruleArr)
                .then(data => {
                    let newCleanDta = [];
                    //清洗数据
                    for (const book of data) {
                        let obj = new Object();
                        obj.cover = "https:" + book[0].attribs.src;
                        obj.title = book[1].children[0].data;
                        obj.href = "https:" + book[1].attribs.href;
                        obj.author = book[2].children[2].children[0].data;
                        obj.tag = book[2].children[4].children[0].data;
                        obj.state = book[2].children[6].children[0].data;
                        obj.bid = book[1].attribs["data-bid"];
                        newCleanDta.push(obj);
                    }
                    panelData.content = newCleanDta;
                    resolve(panelData);
                })
                .catch((error) => {
                    reject(error);
                })
            })
        });
    }

    /**
     * 书籍详情数据
     * @param url
     * @returns {Promise<any>}
     * @private
     */
    _getBookDetail(url) {
        return new Promise((resolve, reject) => {
            let book = new Object();
            this.parser.parserHtmlWithRule(url,this.book_detail_rule)
                .then(data => {
                    book.title = data[0][3].children[1].children[0].data;
                    book.author = data[0][3].children[3].children[0].children[0].data;
                    book.cover = "https:" + data[0][2].attribs.src;
                    book.bid = null;
                    book.href = null;
                    book.state = null;
                    book.tag = null;
                    book.intro = this.textExtra(data[0][0].children);
                    book.update = data[0][1].children[1].children[0].data;
                    book.update_time = data[0][1].children[3].children[0].data;
                    book.like_more = this.likeExtra(data[0][4].children);
                    resolve(book)
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    likeExtra(arr) {
        let bookArr = [];
       for (var index = 0, len = arr.length; index < len; index++) {
           if (arr[index].name == "li") {
               bookArr.push({
                   title: arr[index].children[1].attribs.title,
                   cover: "https:" + arr[index].children[1].children[1].children[0].attribs['data-original'],
                   href:  "https:" + arr[index].children[1].children[1].attribs.href,
                   bid:   arr[index].children[1].children[1].attribs['data-bid'],
               })
           }
       }
       return bookArr;
    }

    /**
     * 数组提取文本
     * @param strArr
     * @returns {string}
     */
    textExtra(strArr) {
        let introStr = "";
        for (var index = 0, len = strArr.length; index < len; index++) {
            if (strArr[index].data) {
                introStr += strArr[index].data.replace(/(^\s*)|(\s*$)/g, "");
            }
        }
        return introStr;
    }

    

}