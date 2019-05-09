import Types from '../../action/types';


const defaultState = {}

export default function onAction(state=defaultState,action) {
    switch (action.type) {
        case Types.BOOKLIST_LOADING:
            return {
                ...state,
                bookList: {
                    loading: action.loading,
                },
            }
        case Types.BOOKLIST_INIT:
            return {
                ...state,
                bookList: {
                    bookListData: action.bookListData,
                    loading: false,
                },
            }
        default:
            return state;
    }
}