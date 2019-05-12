import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import TitleBar from "../componenets/TitleBar";
import NavigationUtil from "../navigator/NavigationUtil";
import URL from "../../serverAPI";
import Toast from "react-native-easy-toast";
import Spinner from "react-native-spinkit";
import DataStore from '../expand/DataStore';
import actions from "../redux/action";
import {connect} from "react-redux";
const {width,height} =  Dimensions.get('window');

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:false,
            username: '',
            password: '',
        }
    }
    _submitForm = () => {
        if (this.state.username !== '' && this.state.password !== '') {
            this.setState({isLoading:true})
            fetch(URL.check,this.getOptions({
                username: this.state.username,
                password: this.state.password,
            }))
            .then((response) => response.json())
            .then(data => {
                if (data.success) {
                    this.setState({isLoading:false})
                    const store = new DataStore();
                    store.saveData("userToken",data.data._id);
                    this.props.onLogIn(data.data);
                    this.props.onInitBookList(data.data._id);
                    this.props.navigation.goBack()
                }else {
                    this.setState({isLoading:false})
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
            spinner: {
                position:'absolute',
                top: height/2 - 18,
                left: width/2 - 18,
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
                    autoCapitalize={"none"}
                    placeholder={"用户名"}
                    clearButtonMode={'always'}
                    maxLength={30}
                />
                <TextInput
                    style={styles.inputView}
                    onChangeText={(text) => {this.setState({password:text})}}
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
                <Spinner
                    style={styles.spinner}
                    isVisible={this.state.isLoading}
                    type={'Wave'}
                    color={this.props.theme}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
    onLogIn: (user) => dispatch(actions.onLogIn(user)),
    onInitBookList: (userId) => dispatch(actions.onInitBookList(userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);


