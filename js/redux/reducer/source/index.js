import Types from '../../action/types';
import QiDian from "../../../bookstore/QiDian";


const defaultState = {}

export default function onAction(state=defaultState,action) {
    switch (action.type) {
        case Types.SOURCE_LOADING:
            return {
                ...state,
                source: {
                    data:[],
                    loading: true,
                    source: action.source.source,
                },

            }
        case Types.SOURCE_LOAD_SUCCESS:
            return {
                ...state,
                source: {
                    data:action.source.data,
                    loading: false,
                    source: action.source.source,
                },

            }
        default:
            return state;
    }
}