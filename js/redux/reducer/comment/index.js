import Types from '../../action/types';


const defaultState = {}

export default function onAction(state=defaultState,action) {
    switch (action.type) {
        case Types.COMMENT_REFRESH_SUCCESS:
            return {
                ...state,
                refresh: {
                    loading: false,
                    data:action.data,
                },
            }
        case Types.COMMENT_REFRESH:
            return {
                ...state,
                refresh: {
                    loading: true,
                },
            }
        case Types.COMMENT_REFRESH_FAIL:
            return {
                ...state,
                refresh: {
                    loading: false,
                    error:action.error
                },
            }
        default:
            return state;
    }
}