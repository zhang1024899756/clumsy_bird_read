import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import TitleBar from "../componenets/TitleBar";
import NavigationUtil from "../navigator/NavigationUtil";
import URL from "../../serverAPI";
import Toast from "react-native-easy-toast";
import DataStore from '../expand/DataStore';
import actions from "../redux/action";
import {connect} from "react-redux";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    _submitForm = () => {
        if (this.state.username !== '' && this.state.password !== '') {
            fetch(URL.check,this.getOptions({
                username: this.state.username,
                password: this.state.password,
            }))
            .then((response) => response.json())
            .then(data => {
                if (data.success) {
                    const store = new DataStore();
                    store.saveData("userToken",data.data._id);
                    this.props.onLogIn(data.data._id)
                    this.props.navigation.goBack()
                }else {
                    this.refs.toast.show(data.data);
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

    _toLogupPage = () => {
        NavigationUtil.goToPageWithName({
            navigation: this.props.navigation,
        },"LogupPage");
    }

    render() {
        const styles = StyleSheet.create({
            logup: {
                margin: 10,
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
                backgroundColor: '#3492fa',
                marginTop: 15,
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 5,
            },
        })
        return (
            <View style={styles.container}>
                <TitleBar type={"Login"} {...this.props}/>
                <View style={styles.logo}>
                    <Image source={require('../image/ben_niao_LOGO.png')} style={{width:180,height:120}}/>
                </View>
                <TextInput
                    style={styles.inputView}
                    onChangeText={(text) => {this.setState({username:text})}}
                    value={this.state.username}
                    autoCapitalize={"none"}
                    placeholder={"用户名"}
                    clearButtonMode={'always'}
                    maxLength={30}
                />
                <TextInput
                    style={styles.inputView}
                    onChangeText={(text) => {this.setState({password:text})}}
                    value={this.state.password}
                    secureTextEntry={true}
                    autoCapitalize={"none"}
                    placeholder={"密码"}
                    clearButtonMode={'always'}
                    maxLength={30}
                />
                <TouchableOpacity
                    onPress={() => this._submitForm()}
                    style={styles.submitButton}
                    activeOpacity={0.5}
                >
                    <Text style={{fontSize: 20,color: 'white'}}>登  录</Text>
                </TouchableOpacity>
                <View style={styles.helpview}>
                    <TouchableOpacity onPress={() => this._toLogupPage()} style={styles.logup}>
                        <Text style={{color:'#3b8cff'}}>新用户注册</Text>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onLogIn: (userId) => dispatch(actions.onLogIn(userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);


