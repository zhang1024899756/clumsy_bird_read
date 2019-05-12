import React, {Component} from 'react';
import {
    Text,
    View,
    Platform,
    TouchableOpacity,
    StyleSheet, Image,
} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigationUtil from "../navigator/NavigationUtil";
import URL from "../../serverAPI";

export default class TitleBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }


    _goBack() {
        return (<TouchableOpacity
            onPress={() => {
                NavigationUtil.goToBack(this.props.navigation);
            }}
            style={{flexDirection: 'row',alignItems:'center',position: 'absolute',left:10,top:40}}
        >
            <AntDesign name={'left'} size={24} style={{color:this.props.theme,marginRight: 5}}/>
        </TouchableOpacity>);
    }

    _toLogin = () => {
        NavigationUtil.goToPageWithName({
            navigation: this.props.navigation,
        },"LoginPage");
    }

    _toUser = () => {
        
    }

    render() {
        const { type, user } = this.props;
        const styles = StyleSheet.create({
            container: {
                backgroundColor: 'white',
            },
            bookcity: {
                height: 80,
                paddingTop: Platform.OS === 'ios' ? 30 : 0,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 20,
                paddingRight: 20,
            },
            title: {
                fontSize: 20,
                color: this.props.theme,
            },
            minetitle: {
                fontSize: 20,
                color: 'white',
            },
            detailpage: {
                height: 80,
                paddingTop: Platform.OS === 'ios' ? 30 : 0,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 10,
            },
            bookchapter: {
                height: 80,
                paddingTop: Platform.OS === 'ios' ? 30 : 0,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 10,
            },
            bookcase: {
                height: 80,
                paddingTop: Platform.OS === 'ios' ? 30 : 0,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 20,
                paddingRight: 20,
            },
            mineview: {
                height: 80,
                paddingTop: Platform.OS === 'ios' ? 30 : 0,
                backgroundColor: this.props.theme,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 20,
                paddingRight: 20,
            },
            user: {
                flexDirection: 'row',
                alignItems:'center',
                position: 'absolute',
                left:20,
                top:40,
            },
        });
        return (
            <View style={styles.container}>

                {type == "BookCity" ? <View style={styles.bookcity}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View> : null}

                {type == "DetailPage" ? <View style={styles.detailpage}>
                    {this._goBack()}
                </View> : null}

                {type == "BookChapter" ? <View style={styles.bookchapter}>
                    {this._goBack()}
                    <Text style={{color:this.props.theme}}>目录</Text>
                </View> : null }

                {type == "Bookcase" ? <View style={styles.bookcase}>
                    {user !== null
                        ? <TouchableOpacity onPress={() => this._toUser()} style={styles.user}>
                            <Image source={{uri:user.cover}} style={{width:30,height:30,borderRadius:15}}/>
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => this._toLogin()} style={styles.user}>
                            <AntDesign name={'user'} size={24} style={{color:this.props.theme,marginRight: 5}}/>
                        </TouchableOpacity>
                    }
                    <Text style={styles.title}>{this.props.title}</Text>
                </View> : null}

                {type == "Community" ? <View style={styles.bookcase}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View> : null}

                {type == "CommentDtail" ? <View style={styles.bookcase}>
                    {this._goBack()}
                    <Text style={{color:this.props.theme,fontSize:18}}>详情</Text>
                </View> : null}

                {type == "Mine" ? <View style={styles.mineview}>
                    <Text style={styles.minetitle}>{this.props.title}</Text>
                </View> : null}

                {type == "Login" ? <View style={styles.bookchapter}>
                    {this._goBack()}
                </View> : null }

                {type == "Logup" ? <View style={styles.bookchapter}>
                    {this._goBack()}
                    <Text style={{color:this.props.theme}}>注册</Text>
                </View> : null }
            </View>
        );
    }
}

