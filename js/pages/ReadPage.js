import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView } from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import AntDesign from "react-native-vector-icons/AntDesign";
import QiDian from "../bookstore/QiDian";
import HTMLView from 'react-native-htmlview';


export default class ReadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            showSeting: false,
            chapter: null,
            book: null,
        }
    }
    componentDidMount() {
        if (this.props.navigation.state.params.chapter) {
            this._loadData(this.props.navigation.state.params)
        }

    }

    _loadData(params) {
        const booksotre = new QiDian();
        booksotre._getChapterContent(params.chapter.href,booksotre.chapter_content_rule)
            .then(data => {
                this.setState({
                    chapter: {
                        content: data,
                        chapter_index: params.chapter_index,
                        ...params.chapter,
                    },
                    loading: false,
                    book: {
                        bookmarks: params.chapter_index,
                        ...params.book,
                    },
                })
            })
    }

    _goBack = () => {

        // NavigationUtil.goToPageWithName({
        //     navigation: this.props.navigation,
        // },"DetailPage");
    }

    _showSeting = () => {
        this.setState({showSeting: true})
    }
    _hideSeting = () => {
        this.setState({showSeting: false})
    }

    _toChapter = (book) => {

        //redux.....
        console.log(book)

        NavigationUtil.goToPageWithName({
            navigation: this.props.navigation,
            book: book,
        },"BookChapter");
    }

    render() {
        const { loading, chapter, book } = this.state;
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
        return (
            <View style={styles.container}>
                <View style={_style.goback}>
                    <TouchableOpacity
                        onPress={() => this._goBack()}
                        style={{flexDirection: 'row',alignItems:'center',position: 'absolute',left:10}}
                    >
                        <AntDesign name={'left'} size={24} style={{color: '#9f9f9f',marginRight: 5}}/>
                    </TouchableOpacity>
                </View>

                <View style={_style.buttonview}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttontext}>上一章</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._toChapter(book)} style={styles.button}>
                        <Text style={styles.buttontext}>目录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttontext}>下一章</Text>
                    </TouchableOpacity>
                </View>
                
                {loading
                    ? <View style={{alignItems:'center',marginTop:200}}><Text>加载中...</Text></View>
                    : <ScrollView style={_style.contentview}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this._hideSeting()}
                            onLongPress={() => this._showSeting()}
                        >
                            <Text style={_style.chapter_title}>{chapter.title}</Text>
                            <HTMLView
                                value={chapter.content}
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
