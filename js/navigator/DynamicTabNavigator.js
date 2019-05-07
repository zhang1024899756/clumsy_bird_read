import React, { Component } from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import { BottomTabBar } from 'react-navigation-tabs';

import { connect } from 'react-redux';


import BookcasePage from '../pages/BookcasePage';
import CommunityPage from '../pages/CommunityPage';
import BookCityPage from '../pages/BookCityPage';
import MinePage from '../pages/MinePage';


//页面路由
const TABS = {
    BookcasePage: {
        screen: props => {
            return <BookcasePage title={"书架"} {...props}/>
        },
        navigationOptions: {
            tabBarLabel: "书架",
            tabBarIcon: ({tintColor,focused}) => {
                return <Entypo name={'book'} size={26} style={{color: tintColor}}/>
            }
        }
    },
    CommunityPage: {
        screen: props => {
            return <CommunityPage title={"社区"} {...props}/>
        },
        navigationOptions: {
            tabBarLabel: "社区",
            tabBarIcon: ({tintColor,focused}) => {
                return <Entypo name={'network'} size={26} style={{color: tintColor}}/>
            }
        }
    },
    BookCityPage: {
        screen: props => {
            return <BookCityPage title={"书城"} {...props}/>
        },
        navigationOptions: {
            tabBarLabel: "书城",
            tabBarIcon: ({tintColor,focused}) => {
                return <Entypo name={'shop'} size={26} style={{color: tintColor}}/>
            }
        }
    },
    MinePage: {
        screen: props => {
            return <MinePage title={"我的"} {...props}/>
        },
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({tintColor,focused}) => {
                return <Entypo name={'user'} size={26} style={{color: tintColor}}/>
            }
        }
    },
};


//自定义标签栏组件
class TabBarComponent extends Component{
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }
    render(){
        return <BottomTabBar
            {...this.props}
            activeTintColor = {this.props.theme}
        />
    }
}


class DynamicTabNavigator extends Component{
    _tabNavigator() {
        if (this.Tabs) {
            return this.Tabs;
        }
        const {BookcasePage,CommunityPage,BookCityPage,MinePage,} = TABS;
        const tabs = {BookcasePage,CommunityPage,BookCityPage,MinePage,};
        this.Tabs = createAppContainer(createBottomTabNavigator(tabs,{
            tabBarComponent: props => {
                return <TabBarComponent theme={this.props.theme} {...props}/>
            }, //自定义组件
            tabBarOptions: {
                style: {height: 60,backgroundColor: 'white',paddingBottom: 6,paddingTop: 4},
            },
            initialRouteName:"BookCityPage",
        }));
        return this.Tabs;
    }
    render() {
        const Tab = this._tabNavigator();
        return <Tab/>;
    }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);