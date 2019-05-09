import  Types from '../types';
import URL from "../../../../serverAPI";

export function onRefreshComment() {
    return dispatch => {
        dispatch({type: Types.COMMENT_REFRESH});
        fetch(URL.commentList)
        .then((response) => response.json())
        .then(data => {
            dispatch({type: Types.COMMENT_REFRESH_SUCCESS,data:data.data})
        })
        .catch(error => {
            dispatch({
                type: Types.COMMENT_REFRESH_FAIL,
                error:error
            });
        })
    }
}