import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import NavigationUtil from '../navigator/NavigationUtil';
var {width,height} =  Dimensions.get('window');

export default class WellcomePage extends Component {
    componentDidMount() {
        // 定时器跳转
        this.timer = setTimeout(() => {
            SplashScreen.hide();
            //console.log("跳转主页this.props.navigation",this.props.navigation);
            //this.props.navigation.navigate("Main");
            //使用跳转工具类跳转首页
            NavigationUtil.restToHomePage({
              navigation: this.props.navigation
            });
        },1600);
    }
    componentWillUnmount() {
        // 销毁定时器，防止泄露
        this.timer && clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width:width,height:height}} source={require('../image/启动图.png')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
