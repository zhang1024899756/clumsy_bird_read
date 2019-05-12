import  Types from '../types';
import URL from "../../../../serverAPI";

export function onRefreshComment() {
    return dispatch => {
        dispatch({type: Types.COMMENT_REFRESH});
        fetch(URL.commentList)
        .then((response) => response.json())
        .then(data => {
            let list = data.data.sort((a,b) => {
                return a.meta.updateAt > b.meta.updateAt ? -1 : 1;
            })
            dispatch({type: Types.COMMENT_REFRESH_SUCCESS,data:list})
        })
        .catch(error => {
            dispatch({
                type: Types.COMMENT_REFRESH_FAIL,
                error:error
            });
        })
    }
}