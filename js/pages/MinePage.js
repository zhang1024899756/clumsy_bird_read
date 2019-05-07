import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import TitleBar from "../componenets/TitleBar";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import NavigationUtil from "../navigator/NavigationUtil";


class MinePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLogin: false,
        }
    }
    _themeModal = () => {
        NavigationUtil.goToPageWithName({
            navigation: this.props.navigation,
        },"ThemeColor");
    }

    _choiceSource = () => {
        NavigationUtil.goToPageWithName({
            navigation: this.props.navigation,
        },"ChoiceSource");
    }

    render() {
        const { hasLogin } = this.state;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#F0F8FF',
            },
            userview: {
                height: 75,
                marginTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            },
            viewtitle: {
                marginLeft: 10,
                marginTop: 10,
                marginBottom: 5,
                fontSize: 12,
                color: '#747474',
            },
            setingview: {
                height: 50,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            },
            line: {
                height:0.5,
                backgroundColor:'#c3d6e2',
            },
        })
        return (
            <View style={styles.container}>
                <TitleBar type={"Mine"} {...this.props}/>
                <TouchableOpacity activeOpacity={0.5}>
                    {hasLogin
                        ? <View><Text>已登陆</Text></View>
                        : <View style={styles.userview}>
                            <View style={{flexDirection: 'row',alignItems:'center'}}>
                                <AntDesign name={'user'} size={30} style={{color:this.props.theme,marginRight: 5}}/>
                                <Text style={{marginLeft:10}}>立即登录</Text>
                            </View>
                            <AntDesign name={'right'} size={16} style={{color:this.props.theme,marginRight: 5}}/>
                        </View>
                    }
                </TouchableOpacity>
                <View style={{marginTop: 10}}>
                    <Text style={styles.viewtitle}>设置</Text>

                    <TouchableOpacity
                        onPress={() => this._themeModal()}
                        activeOpacity={0.5}
                        style={styles.setingview}
                    >
                        <View style={{flexDirection: 'row',alignItems:'center'}}>
                            <Entypo name={'palette'} size={20} style={{color:this.props.theme,marginRight: 5}}/>
                            <Text style={{marginLeft:10,fontSize:12}}>主题颜色</Text>
                        </View>
                        <AntDesign name={'right'} size={16} style={{color:this.props.theme,marginRight: 5}}/>
                    </TouchableOpacity>

                    <View style={styles.line}/>

                    <TouchableOpacity
                        onPress={() => this._choiceSource()}
                        activeOpacity={0.5}
                        style={styles.setingview}>
                        <View style={{flexDirection: 'row',alignItems:'center'}}>
                            <Entypo name={'hand'} size={20} style={{color:this.props.theme,marginRight: 5}}/>
                            <Text style={{marginLeft:10,fontSize:12}}>更改数据源</Text>
                        </View>
                        <AntDesign name={'right'} size={16} style={{color:this.props.theme,marginRight: 5}}/>
                    </TouchableOpacity>
                    
                </View>

                <View style={{marginTop: 10}}>

                    <Text style={styles.viewtitle}>关于应用</Text>

                    <TouchableOpacity activeOpacity={0.5} style={styles.setingview}>
                        <View style={{flexDirection: 'row',alignItems:'center'}}>
                            <Entypo name={'arrow-up'} size={20} style={{color:this.props.theme,marginRight: 5}}/>
                            <Text style={{marginLeft:10,fontSize:12}}>更新版本</Text>
                        </View>
                        <AntDesign name={'right'} size={16} style={{color:this.props.theme,marginRight: 5}}/>
                    </TouchableOpacity>

                    <View style={styles.line}/>

                    <TouchableOpacity activeOpacity={0.5} style={styles.setingview}>
                        <View style={{flexDirection: 'row',alignItems:'center'}}>
                            <Entypo name={'tools'} size={20} style={{color:this.props.theme,marginRight: 5}}/>
                            <Text style={{marginLeft:10,fontSize:12}}>版本介绍</Text>
                        </View>
                        <AntDesign name={'right'} size={16} style={{color:this.props.theme,marginRight: 5}}/>
                    </TouchableOpacity>
                    
                    <View style={styles.line}/>

                    <TouchableOpacity activeOpacity={0.5} style={styles.setingview}>
                        <View style={{flexDirection: 'row',alignItems:'center'}}>
                            <Entypo name={'emoji-flirt'} size={20} style={{color:this.props.theme,marginRight: 5}}/>
                            <Text style={{marginLeft:10,fontSize:12}}>关于作者</Text>
                        </View>
                        <AntDesign name={'right'} size={16} style={{color:this.props.theme,marginRight: 5}}/>
                    </TouchableOpacity>

                </View>


            </View>
        );
    }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(MinePage);


