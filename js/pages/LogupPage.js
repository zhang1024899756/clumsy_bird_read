import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Toast, {DURATION} from 'react-native-easy-toast';
import TitleBar from "../componenets/TitleBar";
import URL from "../../serverAPI";
import NavigationUtil from "../navigator/NavigationUtil";


export default class LogupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasAllowRules: false,
            hasFinished: false,
            username: '',
            password: '',
        }
    }

    componentWillUnmount() {
        // 销毁定时器，防止泄露
        this.timer && clearTimeout(this.timer);
    }

    _submitForm = () => {
        if (this.state.hasAllowRules && this.state.username !== '' && this.state.password !== '') {
            fetch(URL.repeat,this.getOptions({username: this.state.username}))
                .then((response) => response.json())
                .then((data) => {
                    if (data.repeat) {
                        this.refs.toast.show('用户名已存在!');
                    }else {
                       fetch(URL.logup,this.getOptions({
                           username: this.state.username,
                           password: this.state.password,
                       }))
                       .then((response) => response.json())
                       .then(data => {
                           this.refs.toast.show("注册成功，称号： " + data.data.call);
                           // 定时器跳转
                           this.timer = setTimeout(() => {
                               NavigationUtil.goToPageWithName({
                                   navigation: this.props.navigation,
                               },"LoginPage");
                           },2000);
                       })
                    }
                })
        }
    }

    getOptions(data) {
        return {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    }

    _allowRules = (isAllow) => {
        this.setState({hasAllowRules: isAllow})
    }

    render() {
        const { hasFinished, hasAllowRules } = this.state;
        const styles = StyleSheet.create({
            rules: {
                margin: 10,
                flexDirection: 'row',
                alignItems: 'center',
            },
            helpview: {
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                marginTop:20,
                marginBottom: 10,
            },
            container: {
                flex: 1,
                backgroundColor: '#ffffff',
            },
            logo: {
                alignItems: 'center',
                margin: 20,
                marginBottom: 30.
            },
            inputView: {
                height: 50,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 20,
                marginRight: 20,
                fontSize: 16,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: '#f4f4f4',
                color: '#000000',
                borderRadius: 5,
            },
            submitButton: {
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: hasAllowRules ? '#3492fa' : '#6acaff',
                marginTop: 15,
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 5,
            },
        })
        return (
            <View style={styles.container}>
                <TitleBar type={"Logup"} {...this.props}/>
                <View style={styles.logo}>
                    <Image source={require('../image/头像1.png')} style={{width:80,height:80}}/>
                </View>
                <TextInput
                    ref={"username"}
                    style={styles.inputView}
                    onChangeText={(text) => {this.setState({username:text})}}
                    autoCapitalize={"none"}
                    placeholder={"用户名"}
                    clearButtonMode={'always'}
                    maxLength={30}
                />
                <TextInput
                    ref={"password"}
                    style={styles.inputView}
                    onChangeText={(text) => {this.setState({password:text})}}
                    secureTextEntry={true}
                    autoCapitalize={"none"}
                    placeholder={"密码"}
                    clearButtonMode={'always'}
                    maxLength={30}
                />
                <TouchableOpacity
                    ref={"submitButton"}
                    onPress={() => this._submitForm()}
                    style={styles.submitButton}
                    activeOpacity={0.5}
                >
                    <Text style={{fontSize: 20,color: 'white'}}>注  册</Text>
                </TouchableOpacity>
                <View style={styles.helpview}>
                    <TouchableOpacity onPress={() => this._allowRules(!hasAllowRules)} style={styles.rules}>
                        {hasAllowRules
                            ? <AntDesign name={'checkcircle'} size={16} style={{color: '#3b8cff'}}/>
                            : <AntDesign name={'exclamationcircleo'} size={16} style={{color: '#818181'}}/>
                        }
                        <View style={{margin:5}}/>
                        <Text style={{color:hasAllowRules ? '#3b8cff' : '#818181'}}>《许可及服务协议》</Text>
                    </TouchableOpacity>
                </View>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'#69bbff'}}
                    position='top'
                    positionValue={500}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'#fff'}}
                />
            </View>
        );
    }
}
