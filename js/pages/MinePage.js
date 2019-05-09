import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    TouchableHighlight,
    Modal,
    ScrollView,
    AsyncStorage,
} from 'react-native';

import { connect } from 'react-redux';

import TitleBar from "../componenets/TitleBar";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import NavigationUtil from "../navigator/NavigationUtil";
import URL from "../../serverAPI";
import Toast from "react-native-easy-toast";
import actions from "../redux/action";



class MinePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLogin: false,
            modalVisible: false,
            updateKey: "",
            text: "",
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
        const _user = {
            ...this.props.user,
            [this.state.updateKey]: this.state.text,
        }
        this.props.onUserUpdate(_user)
        this.setState({modalVisible: false})
    }

    _logOutUser = () => {
        this.props.onLogOut()
        AsyncStorage.removeItem("userToken",(error) => {
            if (error !== null) {
                console.log("error",error)
            }
        })
        this.setState({hasLogin:false})
    }

    render() {
        const {  user } = this.props;
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
            logOutBtnview: {
                height: 40,
                width:250,
                borderRadius:12,
                opacity: 0.9,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: this.props.theme,
                alignItems: 'center',
                justifyContent: 'center',
            }
        })
        return (
            <View style={styles.container}>
                <TitleBar type={"Mine"} {...this.props}/>
                <ScrollView>
                    <View>
                        {user !== null
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
                            : <TouchableOpacity
                                onPress={() => {
                                    NavigationUtil.goToPageWithName({
                                        navigation: this.props.navigation,
                                    },"LoginPage");
                                }}
                                activeOpacity={0.5}
                                style={styles.userview}
                            >
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

                        <TouchableOpacity
                            onPress={() => this.refs.toast.show("已是最新版本！")}
                            activeOpacity={0.5} style={styles.setingview}
                        >
                            <View style={{flexDirection: 'row',alignItems:'center'}}>
                                <Entypo name={'arrow-up'} size={20} style={{color:this.props.theme,marginRight: 5}}/>
                                <Text style={{marginLeft:10,fontSize:12}}>更新版本</Text>
                            </View>
                            <AntDesign name={'right'} size={16} style={{color:this.props.theme,marginRight: 5}}/>
                        </TouchableOpacity>

                        <View style={styles.line}/>

                        <TouchableOpacity
                            onPress={() => this.refs.toast.show("菜鸟阅读 v1.1")}
                            activeOpacity={0.5}
                            style={styles.setingview}
                        >
                            <View style={{flexDirection: 'row',alignItems:'center'}}>
                                <Entypo name={'tools'} size={20} style={{color:this.props.theme,marginRight: 5}}/>
                                <Text style={{marginLeft:10,fontSize:12}}>版本介绍</Text>
                            </View>
                            <AntDesign name={'right'} size={16} style={{color:this.props.theme,marginRight: 5}}/>
                        </TouchableOpacity>

                        <View style={styles.line}/>

                        <TouchableOpacity
                            onPress={() => this.refs.toast.show("作者：创造之（ 张心彧 ）")}
                            activeOpacity={0.5}
                            style={styles.setingview}
                        >
                            <View style={{flexDirection: 'row',alignItems:'center'}}>
                                <Entypo name={'emoji-flirt'} size={20} style={{color:this.props.theme,marginRight: 5}}/>
                                <Text style={{marginLeft:10,fontSize:12}}>关于作者</Text>
                            </View>
                            <AntDesign name={'right'} size={16} style={{color:this.props.theme,marginRight: 5}}/>
                        </TouchableOpacity>

                    </View>

                    {this.props.user !== null ? <View style={{marginTop: 20,alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={() => this._logOutUser()}
                            activeOpacity={0.5}
                            style={styles.logOutBtnview}
                        >
                            <View style={{flexDirection: 'row',alignItems:'center'}}>
                                <Entypo name={'log-out'} size={18} style={{color:'white',marginRight: 5}}/>
                                <Text style={{marginLeft:10,fontSize:14,color:'white'}}>退出登录</Text>
                            </View>
                        </TouchableOpacity>
                    </View> : null}

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

                    <Toast
                        ref="toast"
                        style={{backgroundColor:this.props.theme}}
                        position='top'
                        positionValue={400}
                        fadeInDuration={500}
                        fadeOutDuration={800}
                        opacity={0.8}
                        textStyle={{color:'#fff'}}
                    />
                </ScrollView>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
    user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
    onLogOut: () => dispatch(actions.onLogOut()),
    onUserUpdate: (user) => dispatch(actions.onUserUpdate(user)),
});

export default connect(mapStateToProps,mapDispatchToProps)(MinePage);


