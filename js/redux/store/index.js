import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import { middleware } from '../../navigator/AppNavigator';
import reducers from '../reducer';


//自定义log中间件
const logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('dispatching a function');
    } else {
        console.log('dispatching ', action);
    }
    const result = next(action);
    console.log('nextState ', store.getState());
    return result;
};


const middlewares = [
    middleware,
    thunk,
];


/** * 创建store */
export default createStore(
    reducers,
    applyMiddleware(...middlewares)
);
