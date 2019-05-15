import CheerioParser from "../cheerio/CheerioParser";
import DataStore from '../expand/DataStore';



export default class ZongHeng {
    constructor() {
        this.index = 1;
        this.parser = new CheerioParser();
        this.datastore = new DataStore();
        this.panel_url_list = [
           "http://www.zongheng.com/rank/details.html?rt=1&d=1",
            "http://www.zongheng.com/rank/details.html?rt=3&d=1",
            "http://www.zongheng.com//rank/details.html?rt=4&d=1",
            "http://www.zongheng.com/rank/details.html?rt=5&d=1",
            "http://www.zongheng.com/rank/details.html?rt=6&d=1",
            "http://www.zongheng.com/rank/details.html?rt=7&d=1",
            "http://www.zongheng.com/rank/details.html?rt=8&d=1",
            "http://www.zongheng.com/rank/details.html?rt=9&d=1",
            "http://www.zongheng.com/rank/details.html?rt=10&d=1",
        ];
        this.panel_book_rule_list = [
            ".rank_d_book_img a img",
            ".rank_d_b_name a",
            ".rank_d_b_cate",
        ];
        this.panel_header_rule = [
            ".rank_i_title_name",
        ];
        this.book_detail_rule = [
            ".book-name",
            ".book-author .au-name a",
            ".book-new-chapter .tit a",
            ".book-img img",
            ".book-info .book-dec p",
            ".book-recommend",
            ".book-new-chapter .time",
        ];
        this.chapter_rule = [
            ".volume-list div .chapter-list",
        ];
        this.chapter_content_rule = [
            ".reader_box .content",
        ];
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
                innerText += "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + arr[index].children[0].data + "</span>";
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
    _getBookChapter(book,ruleArr) {
        return new Promise((resolve, reject) => {
            this.parser.parserHtmlWithRule("http://book.zongheng.com/showchapter/" + book.bid + ".html",ruleArr)
            .then(data => {
                console.log("_getBookChapter",data)
                const clearData = this.clearChapter(data)
                if (clearData.length >= 1) {
                    resolve(clearData)
                }
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
            const arr = groupArr[index][0].children;
            for (let i = 0, len = arr.length; i < len; i++) {
                if (arr[i].name == "li") {
                    chapter.push({
                        title: arr[i].children[1].children[0].data,
                        href:  arr[i].children[1].attribs.href,
                        tip:   arr[i].children[1].attribs.title,
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
                panelData.header = data[0][0].children[1].children[0].data;
                this.parser.parserHtmlWithRule(url,ruleArr)
                .then(data => {
                    //console.log("_getFlatListItemData",data[0])
                    let newCleanDta = [];
                    //清洗数据
                    for (const book of data) {
                        let obj = new Object();
                        obj.cover = book[0].attribs.src;
                        obj.title = book[1].children[0].data;
                        obj.href = book[1].attribs.href;
                        obj.author = book[2].attribs.title;
                        obj.tag = book[2].children[3].children[0].data;
                        obj.state = book[2].children[5].children[0].data;
                        obj.bid = JSON.parse(book[1].attribs["data-sa-d"]).book_id;
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
                console.log()
                book.title = data[0][0].children[0].data;
                book.author = data[0][1].children[0].data;
                book.cover = data[0][3].attribs.src;
                book.bid = null;
                book.href = null;
                book.state = null;
                book.tag = null;
                book.intro = data[0][4].children[0].data;
                book.update = data[0][2].children[0].data;
                book.update_time = data[0][6].children[0].data;
                book.like_more = [];
                resolve(book)
            })
            .catch(error => {
                reject(error);
            })
        })
    }

    
}