import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import { middleware } from '../../navigator/AppNavigator';
import reducers from '../reducer';



const middlewares = [
    middleware,
];


/** * 创建store */
export default createStore(
    reducers,
    applyMiddleware(...middlewares)
);
