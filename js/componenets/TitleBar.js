import React, {Component} from 'react';
import {
    Text,
    View,
    Platform,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigationUtil from "../navigator/NavigationUtil";


export default class TitleBar extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {

    }

    _goBack() {
        return (<TouchableOpacity
            onPress={() => {
                NavigationUtil.goToBack(this.props.navigation);
            }}
            style={{flexDirection: 'row',alignItems:'center',position: 'absolute',left:10}}
        >
            <AntDesign name={'left'} size={24} style={{color: 'black',marginRight: 5}}/>
        </TouchableOpacity>);
    }

    _toLogin = () => {
        NavigationUtil.goToPageWithName({
            navigation: this.props.navigation,
        },"LoginPage");
    }
    render() {
        const { type } = this.props;
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
                    <Text>目录</Text>
                </View> : null }

                {type == "Bookcase" ? <View style={styles.bookcase}>
                    <TouchableOpacity onPress={() => this._toLogin()} style={styles.user}>
                        <AntDesign name={'user'} size={24} style={{color: 'black',marginRight: 5}}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View> : null}

                {type == "Community" ? <View style={styles.bookcase}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View> : null}

                {type == "CommentDtail" ? <View style={styles.bookcase}>
                    {this._goBack()}
                    <Text>详情</Text>
                </View> : null}

                {type == "Mine" ? <View style={styles.bookcase}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View> : null}

                {type == "Login" ? <View style={styles.bookchapter}>
                    {this._goBack()}
                </View> : null }

                {type == "Logup" ? <View style={styles.bookchapter}>
                    {this._goBack()}
                    <Text>注册</Text>
                </View> : null }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 30 : 0,
        backgroundColor: 'white',
    },
    bookcity: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        fontSize: 20,
        color: 'black',
    },
    detailpage: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    bookchapter: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    bookcase: {
        height: 50,
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
    },
});