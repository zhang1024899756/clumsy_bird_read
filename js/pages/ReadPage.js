import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView } from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import AntDesign from "react-native-vector-icons/AntDesign";
import QiDian from "../bookstore/QiDian";
import HTMLView from 'react-native-htmlview';

import { connect } from 'react-redux';

class ReadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            showSeting: false,
            content: null,
            book: null,
            chapterList: null,
        }
    }
    componentDidMount() {
        console.log("ReadPage",this.props.navigation.state.params)
        if (this.props.navigation.state.params.chapter) {
            this._loadData(this.props.navigation.state.params.chapter)
        }
        this.setState({
            book: this.props.navigation.state.params.book,
            chapterList: this.props.navigation.state.params.chapterList,
        })

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
        this.props.navigation.navigate('Main');
    }

    _addBook = () => {

    }

    _showSeting = () => {
        this.setState({showSeting: true})
    }
    _hideSeting = () => {
        this.setState({showSeting: false})
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

    _toChapter = (book) => {

        //redux.....
        console.log(book)

        NavigationUtil.goToPageWithName({
            navigation: this.props.navigation,
            book: book,
        },"BookChapter");
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


    render() {
        const { loading, content, book, showSeting } = this.state;
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
                position: 'absolute',
                top: this.state.showSeting ? 90 : 40,
            },
            contentview: {
                backgroundColor: '#ffffff',
                paddingLeft: 10,
                paddingRight: 10,
                zIndex: -1,
            },
            buttomview: {
                flex: 1,
                backgroundColor: '#e3fdff',
                flexDirection: 'row',
                position: 'absolute',
                bottom: this.state.showSeting ? 0 : -130,
            },
            setingview: {
                flex: 1,
                height:150,
                alignItems: 'center',
                justifyContent: 'center',
            },
            chapter_title: {
                fontSize:16,
                marginTop:10,
                marginBottom:10,
            },
            _content: {
                span: {
                    lineHeight: 25,
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

                <View style={_style.buttonview}>
                    <TouchableOpacity onPress={() => this._preChap()} style={styles.button}>
                        <Text style={styles.buttontext}>上一章</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._toChapter(book)} style={styles.button}>
                        <Text style={styles.buttontext}>目录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._nextChap()} style={styles.button}>
                        <Text style={styles.buttontext}>下一章</Text>
                    </TouchableOpacity>
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
                            <Text style={_style.chapter_title}>{this.state.chapterList[this.state.book.chapter_index].title}</Text>
                            <HTMLView
                                value={content}
                                stylesheet={_style._content}
                            />
                        </TouchableOpacity>
                        <Text style={styles.welcome}>本章完</Text>
                    </ScrollView>
                }
                <View style={_style.buttomview}>
                    <View style={_style.setingview}>
                        <Text>ssdddddddddddd</Text>
                    </View>

                </View>
            </View>
        );
    }
}



const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(ReadPage);
