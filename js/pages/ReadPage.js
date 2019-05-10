import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ScrollView,
    TouchableHighlight,
    Dimensions,
    Modal, FlatList,
} from 'react-native';
import { NavigationActions, StackActions} from 'react-navigation';
import NavigationUtil from "../navigator/NavigationUtil";
import AntDesign from "react-native-vector-icons/AntDesign";
import QiDian from "../bookstore/QiDian";
import HTMLView from 'react-native-htmlview';
import Toast from "react-native-easy-toast";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from 'react-redux';
var {width} =  Dimensions.get('window');
import actions from "../redux/action";

class ReadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            loading: true,
            showSeting: false,
            content: null,
            textSize: 16,
            book: null,
            chapterList: null,
            chapterVisible: false,
        }
    }
    componentDidMount() {
        console.log("this.props.navigation.state.params",this.props.navigation.state.params)
        if (this.props.navigation.state.params.navigation.state.routeName === "BookChapter" ) {
            this._loadData(this.props.navigation.state.params.chapter)
        }else if (this.props.navigation.state.params.navigation.state.routeName === "BookcasePage") {
            this._loadData(this.props.navigation.state.params.chapterList[this.props.navigation.state.params.book.chapter_index])
        }
        this.setState({
            book: this.props.navigation.state.params.book,
            chapterList: this.props.navigation.state.params.chapterList,
        })

    }


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    _loadData(chapter) {
        const booksotre = new QiDian();
        booksotre._getChapterContent(chapter.href,booksotre.chapter_content_rule)
            .then(data => {
                this.setState({
                    content: data,
                    loading: false,
                })
            })
    }

    _goBack = () => {
        if (this.props.navigation.state.params.navigation.state.routeName === "BookcasePage") {
            this.props.navigation.goBack()
        }else {
            this.props.navigation.goBack(this.props.navigation.state.params.key);
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

    _addBook = () => {
        if (this.props.user !== null) {
            let user = this.props.user
            console.log(this.props.user)
            let hasBook = false;
            if (user.books.length > 0) {
                for (let book of user.books) {
                    if (book.bid == this.state.book.bid) {
                        hasBook = true;
                    }
                }
            }
            if (!hasBook) {
                user.books.push({
                    ...this.state.book,
                    chapterList: this.state.chapterList,
                })
                this.props.onUserUpdate(user);
                this.props.onInitBookList(this.props.user._id);
            }else {
                this.refs.toast.show("书架已存放");
            }
        }else {
            this.setModalVisible(!this.state.modalVisible);
        }
    }

    _showSeting = () => {
        this.setState({showSeting: true})
    }
    _hideSeting = () => {
        this.setState({showSeting: false})
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setChapterVisible(visible) {
        this.setState({ chapterVisible: visible });
    }

    _preChap = () => {
        if (this.state.book.chapter_index !== 0) {
            this.setState({loading:true})
            let chap = this.state.book.chapter_index - 1;
            this._loadData(this.state.chapterList[chap])
            let _book = this.state.book;
            _book.chapter_index = chap;
            this.setState({book: _book})
        }
        this.setState({loading:false})
        this.refs.content.scrollTo({x: 0, y: 0, animated: false})
    }
    _nextChap = () => {
        if (this.state.book.chapter_index < this.state.chapterList.length - 1) {
            this.setState({loading:true})
            let chap = this.state.book.chapter_index + 1;
            this._loadData(this.state.chapterList[chap])
            let _book = this.state.book;
            _book.chapter_index = chap;
            this.setState({book: _book})
        }
        this.setState({loading:false})
        this.refs.content.scrollTo({x: 0, y: 0, animated: false})
    }

    _changeChapter = (index) => {
        this._loadData(this.state.chapterList[index])
        let _book = this.state.book;
        _book.chapter_index = index;
        this.setState({
            book: _book,
            chapterVisible: false
        })
        this.refs.content.scrollTo({x: 0, y: 0, animated: false})
    }
    

    _onScroll(event) {
        if (this.state.loading) {
            return;
        }
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if(y + height >= contentHeight + 80) {
            this._nextChap();
        }
    }

    _toLogin = () => {
        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'HomePage' }),
                NavigationActions.navigate({ routeName: 'LoginPage'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    _keyExtractor = (item, index) => `key${index}`;


    changeTextSize = (pramas) => {
        if (pramas == 0) {
            if (this.state.textSize <= 30) {
                this.setState({textSize: this.state.textSize + 2})
            }
        }else {
            if (this.state.textSize >= 14) {
                this.setState({textSize: this.state.textSize - 2})
            }
        }
    }


    render() {
        const { loading, content, book, showSeting, chapterList } = this.state;
        const _style = {
            goback: {
                height: 50,
                backgroundColor: this.state.showSeting ? '#e3fdff' : '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 999,
            },
            buttonview: {
                flex: 1,
                backgroundColor: '#8cc7c7',
                flexDirection: 'row',
            },
            contentview: {
                backgroundColor: '#ffffff',
                paddingLeft: 10,
                paddingRight: 10,
                zIndex: -1,
            },
            buttomview: {
                width: width,
                backgroundColor: '#e3fdff',
                position: 'absolute',
                bottom: this.state.showSeting ? 0 : -100,
            },
            setingview: {
                flex: 1,
                height:80,
                alignItems: 'center',
                justifyContent: 'center',
            },
            chapter_title: {
                fontSize:this.state.textSize,
                marginTop:10,
                marginBottom:10,
            },
            _content: {
                span: {
                    fontSize: this.state.textSize,
                    lineHeight: this.state.textSize > 25 ? 30 : 25,
                    minHeight: 30,
                    letterSpacing: 1,
                }
            },
        };
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 40 : 0,
                backgroundColor: 'white',
            },
            welcome: {
                color: '#8a8a8a',
                fontSize: 14,
                textAlign: 'center',
                margin: 10,
                marginBottom: 30,
            },
            button: {
                flex: 1,
                height:50,
                alignItems: 'center',
                justifyContent: 'center',
            },
            buttontext: {
                color: '#595f69',
            },
            modalview: {
                marginTop: 200,
                backgroundColor:this.props.theme,
                marginLeft: 60,
                marginRight: 60,
                height: 180,
                borderRadius: 20,
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
            item: {
                height: 40,
                backgroundColor: 'white',
                justifyContent: 'center',
                paddingLeft: 40,
                paddingRight: 10,
                marginBottom: 1,
            },
            fontBtn: {
                width: 100,
                height:40,
                backgroundColor:this.props.theme,
                margin:10,
                alignItems:'center',
                justifyContent: 'center',
            },
        })
        return (
            <View style={styles.container}>
                <View style={_style.goback}>
                    <TouchableOpacity
                        onPress={() => this._goBack()}
                        style={{flexDirection: 'row',alignItems:'center',position: 'absolute',left:10}}
                    >
                        <AntDesign name={'left'} size={24} style={{color:this.props.theme,marginRight: 5}}/>
                    </TouchableOpacity>
                    {showSeting ? <TouchableOpacity
                        onPress={() => this._addBook()}
                        style={{flexDirection: 'row',alignItems:'center',position: 'absolute',right:10}}
                    >
                        <AntDesign name={'download'} size={24} style={{color:this.props.theme,marginRight: 5}}/>
                    </TouchableOpacity> : null}
                </View>
                
                {loading
                    ? <View style={{alignItems:'center',marginTop:200}}><Text>加载中...</Text></View>
                    : <ScrollView
                        ref={"content"}
                        style={_style.contentview}
                        onScroll={this._onScroll.bind(this)}
                        scrollEventThrottle={20}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this._hideSeting()}
                            onLongPress={() => this._showSeting()}
                        >
                            <Text style={_style.chapter_title}>
                                {this.state.chapterList[this.state.book.chapter_index].title}
                            </Text>
                            <HTMLView
                                value={content}
                                stylesheet={_style._content}
                            />
                        </TouchableOpacity>
                        <Text style={styles.welcome}>本章完</Text>
                    </ScrollView>
                }


                    <View style={_style.buttomview}>
                        {this.state.showSeting ? <View style={_style.buttonview}>
                            <TouchableOpacity onPress={() => this._preChap()} style={styles.button}>
                                <Text style={styles.buttontext}>上一章</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setChapterVisible(!this.state.chapterVisible)} style={styles.button}>
                                <Text style={styles.buttontext}>目录</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._nextChap()} style={styles.button}>
                                <Text style={styles.buttontext}>下一章</Text>
                            </TouchableOpacity>
                        </View> : null}
                        <View style={_style.setingview}>
                            {this.state.book !== null
                                ? <View>
                                    <View style={{flexDirection:'row',}}>
                                        <TouchableOpacity style={styles.fontBtn} onPress={() => this.changeTextSize(0)}>
                                            <MaterialCommunityIcons name={'format-font-size-increase'} size={24} style={{color:'white',marginRight: 5}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.fontBtn} onPress={() => this.changeTextSize(1)}>
                                            <MaterialCommunityIcons name={'format-font-size-decrease'} size={24} style={{color:'white',marginRight: 5}}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                : null
                            }
                        </View>
                    </View>
                
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                    styles={{backgroundColor:'red'}}
                >
                    <View style={styles.modalview}>
                        <View style={styles.modalcontent}>
                            <Text style={{color:'white',fontSize:20}}>请登录账号</Text>
                        </View>
                        <View style={styles.modalbtnviw}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    this.props.navigation.goBack(this.props.navigation.state.params.key);
                                }}
                            >
                                <Text style={{color:'white',fontSize:16}}>返回</Text>
                            </TouchableHighlight>
                            <View style={{margin:30}}/>
                            <TouchableHighlight
                                onPress={() => this._toLogin()}
                            >
                                <Text style={{color:'white',fontSize:16}}>登录</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>


                {chapterList !== null ? <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.chapterVisible}
                >
                    <View style={{height: 80,}}>
                        <TouchableOpacity
                            onPress={() => this.setChapterVisible(!this.state.chapterVisible)}
                            style={{flexDirection: 'row',alignItems:'center',position: 'absolute',left:10,top:40}}
                        >
                            <AntDesign name={'left'} size={24} style={{color:this.props.theme,marginRight: 5}}/>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={chapterList}
                        getItemLayout={(data,index) => ( {length:40,offset:40*index,index})}
                        initialScrollIndex={this.state.book.chapter_index}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item,index}) => <TouchableOpacity onPress={() => this._changeChapter(index)} style={styles.item}>
                            <Text
                                style={{
                                    width: 300,
                                    color: this.state.book.chapter_index == index ? this.props.theme : 'rgba(31,36,49,0.56)',
                                }}
                                ellipsizeMode={"tail"}
                                numberOfLines={1} >{item.title}</Text>
                        </TouchableOpacity>}
                    />
                </Modal> : null}


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
});

const mapDispatchToProps = dispatch => ({
    onInitBookList: (userId) => dispatch(actions.onInitBookList(userId)),
    onUserUpdate: (user) => dispatch(actions.onUserUpdate(user)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ReadPage);
