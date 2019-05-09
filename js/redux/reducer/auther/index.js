import Types from '../../action/types';


const defaultState = {
    user: null
}

export default function onAction(state=defaultState,action) {
    switch (action.type) {
        case Types.USER_LOAIN:
            return {
                ...state,
                user: action.user,
            }
        case Types.USER_LOGOUT:
            return {
                ...state,
                user: action.user,
            }
        case Types.USER_UPDATE:
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
}