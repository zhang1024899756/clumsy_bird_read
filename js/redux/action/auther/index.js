import  Types from '../types';
import URL from "../../../../serverAPI";

export function onLogIn(user) {
    return {type: Types.USER_LOAIN,user: user}
}

export function onLogOut() {
    return dispatch => {
        dispatch({type: Types.USER_LOGOUT, user: null})
    }
}

export function onUserUpdate(user) {
    return dispatch => {
        fetch(URL.update,getOptions(user))
            .then((response) => response.json())
            .then(data => {
                dispatch({type: Types.USER_UPDATE, user: data.data})
            })
    }
}


function getOptions(data) {
    return {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
}