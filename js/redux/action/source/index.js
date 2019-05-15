import  Types from '../types';

export function onSourceChange(source) {
    return dispatch => {
        dispatch({type: Types.SOURCE_LOADING,source:{source:source}})
        _loadData(source).then(data => {
            console.log(data)
            dispatch({type: Types.SOURCE_LOAD_SUCCESS,source:{source:source,data:data}})
        }).catch(error => {
            console.log(error)
        })
    }
}

function _loadData(source) {
    return new Promise((resolve, reject) => {
        const booksotre = source;
        let listArr = [];
        for (let index = 0,len = booksotre.panel_url_list.length; index < len; index++) {
            booksotre._getFlatListItemData(booksotre.panel_url_list[index],booksotre.panel_book_rule_list,booksotre.panel_header_rule)
            .then((data) => {
                let listItem = {id: `key${index}`,data: data};
                listArr.push(listItem)
            })
            .catch(error => {
                reject(error)
            })
        }
        resolve(listArr)
    })

}