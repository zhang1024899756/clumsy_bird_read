import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import TitleBar from "../componenets/TitleBar";


export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    _submitForm = () => {
        
    }
    render() {
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
                    placeholder={"用户名"}
                    clearButtonMode={'always'}
                    maxLength={30}
                />
                <TextInput
                    style={styles.inputView}
                    onChangeText={(text) => {this.setState({password:text})}}
                    value={this.state.password}
                    secureTextEntry={true}
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
