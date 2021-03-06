import {combineReducers} from 'redux';
import {rootCom, RootNavigator} from '../../navigator/AppNavigator';

import theme from './theme';
import auther from './auther';
import book from './book';
import comment from './comment';
import source from './source';

//1.指定默认state
const navState = RootNavigator.router.getStateForAction(
    RootNavigator.router.getActionForPathAndParams(rootCom)
);


/** * 2.创建自己的 navigation reducer
 * */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

/** * 3.合并reducer
 * * @type {Reducer<any> | Reducer<any, AnyAction>}
 * */
const index = combineReducers({
    nav: navReducer,
    theme: theme,
    user: auther,
    bookList: book,
    commentRefresh: comment,
    source: source,
});

export default index;


