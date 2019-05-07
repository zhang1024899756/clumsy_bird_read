import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import { connect } from 'react-redux';
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers';


import WellcomePage from '../pages/WellcomePage';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import BookChapter from '../pages/BookChapter';
import ReadPage from '../pages/ReadPage';
import LogupPage from '../pages/LogupPage';
import LoginPage from '../pages/LoginPage';
import ThemeColor from '../pages/ThemeColor';
import ChoiceSource from '../pages/ChoiceSource';
import CommentDtailPage from '../pages/CommentDtailPage';


export const rootCom = 'Init';//设置根路由


const InitNavigator = createStackNavigator({
    WellcomePage: {
        screen: WellcomePage,
        navigationOptions: {
            header: null,
        }
    }
}); 


const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            header: null,
        }
    },
    BookChapter: {
        screen: BookChapter,
        navigationOptions: {
            header: null,
        }
    },
    ReadPage: {
        screen: ReadPage,
        navigationOptions: {
            header: null,
        }
    },
    LoginPage: {
        screen: LoginPage,
        navigationOptions: {
            header: null,
        }
    },
    LogupPage: {
        screen: LogupPage,
        navigationOptions: {
            header: null,
        }
    },
    ThemeColor: {
        screen: ThemeColor,
        navigationOptions: {
            header: null,
        }
    },
    ChoiceSource: {
        screen: ChoiceSource,
        navigationOptions: {
            header: null,
        }
    },
    CommentDtailPage: {
        screen: CommentDtailPage,
        navigationOptions: {
            header: null,
        }
    },
});




export const RootNavigator = createAppContainer(createSwitchNavigator(
    {
        Init: InitNavigator,
        Main: MainNavigator,
    },{
        defaultNavigationOptions: {
            header: null,
        }
    }
));


/** * 1.初始化react-navigation与redux的中间件，
 * * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * * @type {Middleware} */
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root',
);


/** * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * * 注意：要在createReactNavigationReduxMiddleware之后执行
 * */
const AppWithNavigationState = createReduxContainer(RootNavigator,'root');


/** * State到Props的映射关系
 * * @param state
 * */
const mapStateToProps = state => ({
    state: state.nav,
});


/** * 3.连接 React 组件与 Redux store
 * */
export default connect(mapStateToProps)(AppWithNavigationState);
