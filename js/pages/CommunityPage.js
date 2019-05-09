import React, {Component} from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    FlatList,
    RefreshControl,
} from 'react-native';
import TitleBar from "../componenets/TitleBar";
import CommentPanel from "../componenets/CommentPanel";
import AntDesign from "react-native-vector-icons/AntDesign";
import URL from "../../serverAPI";
import DataStore from "../expand/DataStore";
import {connect} from "react-redux";
import Toast from "react-native-easy-toast";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import NavigationUtil from "../navigator/NavigationUtil";
import actions from "../redux/action";


class CommunityPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            modalVisible: false,
            title: "",
            content:"",
        }
    }

    componentDidMount() {
        this._onRefreshList()
        this.setState({loading:false})
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
        if (this.props.user !== null) {
            const { books, ...user} = this.props.user
            fetch(URL.commentSave,this.getOptions({
                title: this.state.title,
                content: this.state.content,
                author: user,
            }))
            .then((response) => response.json())
            .then(data => {
                if (data.success) {
                    let user = this.props.user;
                    user.comments.push(data.data)
                    this.props.onUserUpdate(user)
                    this._onRefreshList();
                    this.setState({title:"",content:""})
                    this.setModalVisible(!this.state.modalVisible)
                }else {
                    this.refs.toast.show(data.data);
                }
            })
        }
    }

    _toEditer = () => {
        if (this.props.user !== null) {
            this.setModalVisible(!this.state.modalVisible)
        }else {
            NavigationUtil.goToPageWithName({
                navigation: this.props.navigation,
            },"LoginPage");
        }
    }

    _onRefreshList = () => {
        this.props.onRefreshComment()
    }

    _store() {
        let refresf = this.props.commentRefresh
        if (!refresf) {
            refresf = {
                loading: false,
                data:[]
            }
        }
        return refresf;
    }

    _keyExtractor = (item, index) => `key${index}`;

    render() {
        const { loading } = this.state;
        const  refresf = this._store();
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
            },
            listFooter: {
                height: 40,
                alignItems:'center',
                justifyContent:'center',
            },
        })
        return (
            <View style={styles.container}>
                <TitleBar type={"Community"} {...this.props}/>
                {loading
                    ? <View style={{alignItems:'center',marginTop:200}}><Text>加载中...</Text></View>
                    : <View style={{marginBottom:140}}>
                        <View style={styles.images}>
                            <Text style={{color:'white',fontSize:30}}>横幅</Text>
                        </View>
                        <FlatList
                            data={refresf.data}
                            extraData={this.state}
                            showsVerticalScrollIndicator = {false}
                            refreshControl={
                                <RefreshControl
                                    title={'加载...'}
                                    titleColor={this.props.theme}
                                    colors={[this.props.theme]}
                                    refreshing={refresf.loading}
                                    onRefresh={() => this._onRefreshList()}
                                    tintColor={this.props.theme}
                                    style={{height:10}}
                                />
                            }
                            keyExtractor={this._keyExtractor}
                            renderItem={({item}) => <CommentPanel data={item}   {...this.props}/>}
                            ListFooterComponent={() => <View style={styles.listFooter}>
                                <Text style={{color:this.props.theme}}>我是有底线的</Text>
                            </View>}
                        />
                    </View>
                }

                <TouchableOpacity onPress={() =>  this._toEditer()} activeOpacity={0.9} style={styles.commentBtn}>
                    <EvilIcons name={'pencil'} size={30} style={{color:'#ffffff'}}/>
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
    user: state.user.user,
    commentRefresh: state.commentRefresh.refresh,
});


const mapDispatchToProps = dispatch => ({
    onRefreshComment: () => dispatch(actions.onRefreshComment()),
    onUserUpdate: (user) => dispatch(actions.onUserUpdate(user)),
})


export default connect(mapStateToProps, mapDispatchToProps)(CommunityPage);
