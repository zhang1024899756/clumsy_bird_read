import React, {Component} from 'react';
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList} from 'react-native';
import TitleBar from "../componenets/TitleBar";
import CommentPanel from "../componenets/CommentPanel";
import AntDesign from "react-native-vector-icons/AntDesign";
import URL from "../../serverAPI";
import DataStore from "../expand/DataStore";
import {connect} from "react-redux";
import Toast from "react-native-easy-toast";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import NavigationUtil from "../navigator/NavigationUtil";


class CommunityPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true,
            refreshing: false,
            modalVisible: false,
            title: "",
            content:"",
            datalist:[],
        }
    }

    componentDidMount() {
        this._loadData()
    }

    _loadData = () => {
        fetch(URL.commentList)
        .then((response) => response.json())
        .then(data => {
            this.setState({
                datalist:data.data,
                loading: false,
                refreshing: false,
            })
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.userId !== null) {
            fetch(URL.getUser + "?id=" + nextProps.userId)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    user:data.data,
                })
                console.log("getUser",data.data)
            })
        }
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
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

    _submitComment = () => {
        if (this.state.user !== null) {
            const { books, ...user} = this.state.user
            fetch(URL.commentSave,this.getOptions({
                title: this.state.title,
                content: this.state.content,
                author: user,
            }))
            .then((response) => response.json())
            .then(data => {
                if (data.success) {
                    let user = this.state.user;
                    user.comments.push(data.data)
                    fetch(URL.update,this.getOptions(user))
                        .then((response) => response.json())
                        .then(response => {
                            this._loadData();
                            this.setState({title:"",content:""})
                            this.setModalVisible(!this.state.modalVisible)
                        })
                }else {
                    this.refs.toast.show(data.data);
                }
            })
        }
    }

    _toEditer = () => {
        if (this.props.userId !== null) {
            this.setModalVisible(!this.state.modalVisible)
        }else {
            NavigationUtil.goToPageWithName({
                navigation: this.props.navigation,
            },"LoginPage");
        }
    }

    _onRefreshList = () => {
        this.setState({refreshing:true})
        this._loadData()
    }

    _keyExtractor = (item, index) => `key${index}`;

    render() {
        const { loading,datalist } = this.state;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#F0F8FF',
            },
            images: {
                height: 100,
                padding:10,
                backgroundColor: '#5F9EA0',
                alignItems:'center',
                justifyContent:'center',
            },
            submitview: {
                width: 60,
                height:30,
                backgroundColor: '#6b80ff',
                borderRadius: 5,
                alignItems:'center',
                justifyContent: 'center',
                position: 'absolute',
                right:20,
                top:40,
            },
            titleinput: {
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
            contentinput: {
                width: 300,
                minHeight: 100,
                lineHeight:30,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 20,
                marginRight: 20,
                fontSize: 16,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                backgroundColor: '#f4f4f4',
                color: '#000000',
                borderRadius: 5,
            },
            commentBtn: {
                width:50,
                height:50,
                backgroundColor:this.props.theme,
                borderRadius:30,
                position:'absolute',
                top:50,
                right: 20,
                alignItems:'center',
                justifyContent:'center',
            }
        })
        return (
            <View style={styles.container}>
                <TitleBar type={"Community"} {...this.props}/>
                {loading
                    ? <View style={{alignItems:'center',marginTop:200}}><Text>加载中...</Text></View>
                    : <View>
                        <View style={styles.images}>
                            <Text style={{color:'white',fontSize:30}}>横幅</Text>
                        </View>
                        <FlatList
                            data={datalist}
                            onRefresh={() => this._onRefreshList()}
                            refreshing={this.state.refreshing}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={({item}) => <CommentPanel data={item}   {...this.props}/>}
                        />
                    </View>
                }

                <TouchableOpacity onPress={() =>  this._toEditer()} activeOpacity={0.9} style={styles.commentBtn}>
                    <EvilIcons name={'close'} size={30} style={{color:'#ffffff'}}/>
                </TouchableOpacity>


                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={{height: 80,}}>
                        <TouchableOpacity
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}
                            style={{flexDirection: 'row',alignItems:'center',position: 'absolute',left:10,top:40}}
                        >
                            <AntDesign name={'left'} size={24} style={{color:this.props.theme,marginRight: 5}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this._submitComment()}
                            style={styles.submitview}
                        >
                            <Text style={{color:'white'}}>发表</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={{alignItems:'center'}}>
                            <TextInput
                                style={styles.titleinput}
                                autoFocus={true}
                                onChangeText={(text) => this.setState({title:text})}
                                value={this.state.title}
                                placeholder={"小目标"}
                            />
                            <TextInput
                                style={styles.contentinput}
                                multiline={true}
                                onChangeText={(text) => this.setState({content:text})}
                                value={this.state.content}
                                placeholder={"侃一侃，生活美满"}
                            />
                        </View>
                    </ScrollView>

                </Modal>

                <Toast
                    ref="toast"
                    style={{backgroundColor:this.props.theme}}
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

const mapStateToProps = state => ({
    theme: state.theme.theme,
    userId: state.userId.userId,
});

export default connect(mapStateToProps)(CommunityPage);
