import cheerio from 'cheerio';
import DataStore from '../expand/DataStore';

export default class CheerioParser {
    constructor() {
        this.dataStore = new DataStore();
    }
    /**
     * 传入参数解析网页
     *
     * @param url
     * @param rule
     * @returns Promise
     */
    parserHtmlWithRule(url,ruleArr) {
        return new Promise((resolve, reject) => {
            this.dataStore.fetchData(url)
            .then(data => {
                this.cheerioHtml(data.data,ruleArr).then(data => {
                    resolve(data);
                })
            })
            .catch((error) => {
                reject(error);
            })
        });
    }

    /**
     * cheerio解析网页
     *
     * @param data
     * @param ruleArr
     * @returns Promise
     */
    cheerioHtml(data,ruleArr) {
        return new Promise((resolve, reject) => {
            try {
                let $ =  cheerio.load(data);  //当前的$符相当于拿到了所有的body里面的选择器
                //拿到所有解析的结构
                let bodyArr = [];
                for( const rule of ruleArr) {
                    bodyArr.push($(rule));
                }
                let resArr = [];
                for (let i = 0,len = bodyArr[0].length; i < len; i++) {
                    let obj = new Object();
                    for (const index in ruleArr) {
                        let key = index;
                        obj[key] = bodyArr[index][i];
                    }
                    resArr.push(obj);
                }
                resolve(resArr);
            } catch (error) {
                reject(error)
            }
        });
    }

}