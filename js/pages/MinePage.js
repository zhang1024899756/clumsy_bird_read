import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity,TextInput, Image, TouchableHighlight, Modal, ScrollView } from 'react-native';

import { connect } from 'react-redux';

import TitleBar from "../componenets/TitleBar";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import NavigationUtil from "../navigator/NavigationUtil";
import URL from "../../serverAPI";



class MinePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLogin: false,
            user: null,
            modalVisible: false,
            updateKey: "",
            text: "",
        }
    }
    componentDidMount() {
        this._getUser()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.user == null) {
            this._getUser()
        }
    }

    _getUser = () => {
        if (this.props.userId !== null) {
            fetch(URL.getUser + "?id=" + this.props.userId)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    user:data.data,
                    hasLogin: true,
                })
            })
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
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

    _updateUser = ({key,value}) => {
        this.setModalVisible(true);
        this.setState({text: value,updateKey:key})
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

    _saveUpdate = () => {
        fetch(URL.update,this.getOptions({
            ...this.state.user,
            [this.state.updateKey]: this.state.text,
        }))
        .then((response) => response.json())
        .then(data => {
            this.setState({
                user:data.data,
                modalVisible: false,
            })

        })
    }

    render() {
        const { hasLogin, user } = this.state;
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
            hasUserview: {
                padding: 20,
                backgroundColor: this.props.theme,
                alignItems: 'center',
                justifyContent: 'center',
            },
            usercall: {
                margin: 10,
                fontSize: 20,
                color: 'white',
            },
            signature: {
                margin: 10,
                color: 'white',
            },
            modalview: {
                padding:20,
                alignItems: 'center',
                justifyContent: 'center',
            },
            modalcontent: {
                height: 100,
                alignItems:'center',
                justifyContent:'center',
            },
            modalbtnviw: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopWidth: 0.5,
                borderTopColor:'white',
            },
            updateinput: {
                width: 300,
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
        })
        return (
            <View style={styles.container}>
                <TitleBar type={"Mine"} {...this.props}/>
                <ScrollView>
                    <View>
                        {hasLogin
                            ? <View style={styles.hasUserview}>
                                <TouchableOpacity onPress={() => this._updateUser({key:"cover",value:user.cover})}>
                                    <Image source={{uri:user.cover}} style={{width:90,height:90,borderRadius:45}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._updateUser({key:"call",value:user.call})}>
                                    <Text style={styles.usercall}>{user.call}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._updateUser({key:"signature",value:user.signature})}>
                                    <Text style={styles.signature}>{user.signature}</Text>
                                </TouchableOpacity>
                            </View>
                            : <TouchableOpacity  activeOpacity={0.5} style={styles.userview}>
                                <View style={{flexDirection: 'row',alignItems:'center'}}>
                                    <AntDesign name={'user'} size={30} style={{color:this.props.theme,marginRight: 5}}/>
                                    <Text style={{marginLeft:10}}>立即登录</Text>
                                </View>
                                <AntDesign name={'right'} size={16} style={{color:this.props.theme,marginRight: 5}}/>
                            </TouchableOpacity>
                        }
                    </View>
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

                    <Modal
                        animationType={"slide"}
                        transparent={false}
                        visible={this.state.modalVisible}
                        styles={{backgroundColor:'red'}}
                    >
                        <View style={styles.modalview}>
                            <Text>{}</Text>
                            <View style={styles.modalcontent}>
                                <TextInput
                                    style={styles.updateinput}
                                    onChangeText={(text) => this.setState({text:text})}
                                    value={this.state.text}
                                />
                            </View>
                            <View style={styles.modalbtnviw}>
                                <TouchableHighlight
                                    onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
                                >
                                    <Text style={{color:this.props.theme,fontSize:16}}>返回</Text>
                                </TouchableHighlight>
                                <View style={{margin:30}}/>
                                <TouchableHighlight
                                    onPress={() => this._saveUpdate()}
                                >
                                    <Text style={{color:this.props.theme,fontSize:16}}>更新</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
    userId: state.userId.userId,
});

export default connect(mapStateToProps)(MinePage);


