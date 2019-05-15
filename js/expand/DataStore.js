import {AsyncStorage} from 'react-native';

export default class DataStore {


    /**
     * 离线缓存策略
     * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
     * @param url
     * @param flag
     * @returns Promise
     */
    fetchData(url, flag) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((wrapData) => {   //先获取本地数据
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {   //判断是否过期
                    resolve(wrapData);      //没过期就返回
                } else {    //过期就进行网络获取
                    this.fetchNetData(url, flag).then((data) => {
                        resolve(this._wrapData(data));  //打上时间戳返回
                    }).catch((error) => {
                        reject(error);
                    })
                }
            }).catch((error) => {
                this.fetchNetData(url, flag).then((data) => {
                    resolve(this._wrapData(data));
                }).catch((error => {
                    reject(error);
                }))
            })
        })
    }


    /**
     * 获取网络数据
     * @param url
     * @param flag
     * @returns Promise
     */
    fetchNetData(url, flag) {
        return new Promise((resolve, reject) => {
            fetch(url)
            .then((response) => {
                if (response.ok) {
                    if (response.headers.map["content-type"] == "application/json") {
                        return response.json();
                    } else if (response.headers.map["content-type"] == "text/html") {
                        return response.json();
                    } else if (response.headers.map["content-type"] == "text/html; charset=utf-8" || response.headers.map["content-type"] == "text/html; charset=UTF-8") {
                        return response.text();
                    }
                }
                throw new Error('Network response was not ok.');
            })
            .then((responseData) => {
                this.saveData(url, responseData)
                resolve(responseData);
            })
            .catch((error) => {
                reject(error);
            })
        })
    }


    /**
     * 获取本地数据
     * @param url
     * @returns Promise
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }


    /**
     * 生成时间戳
     * @param data
     */
    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    /**
     * 保存网页数据
     * @param url
     * @param data
     * @param callback
     */
    saveData(url, data, callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }


    /**
     * 检查timestamp是否在有效期内
     * @param timestamp 项目更新时间
     * @return boolean;  true不需要更新,false需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 1) return false;//有效期1个小时
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}