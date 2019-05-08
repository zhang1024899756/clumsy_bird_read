import Types from '../../action/types';


const defaultState = {
    userId: null
}

export default function onAction(state=defaultState,action) {
    switch (action.type) {
        case Types.USER_LOAIN:
            return {
                ...state,
                userId: action.userId,
            }
        default:
            return state;
    }
}