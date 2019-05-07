import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';



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


export default createAppContainer(createSwitchNavigator(
    {
        Init: InitNavigator,
        Main: MainNavigator,
    },{
        defaultNavigationOptions: {
            header: null,
        }
    }
));

