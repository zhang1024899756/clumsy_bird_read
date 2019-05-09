import  Types from '../types';
import URL from "../../../../serverAPI";

export function onInitBookList(userId) {
    return dispatch => {
        dispatch({type: Types.BOOKLIST_LOADING, loading: true});
        fetch(URL.getUser + "?id=" + userId)
        .then((response) => response.json())
        .then(data => {
            dispatch({type: Types.BOOKLIST_INIT,bookListData:data.data})
        })
    }
}