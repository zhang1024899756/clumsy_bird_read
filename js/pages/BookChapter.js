import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import TitleBar from "../componenets/TitleBar";
import QiDian from "../bookstore/QiDian";
import NavigationUtil from "../navigator/NavigationUtil";


export default class BookChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            chapterList: null,
        }
    }
    componentDidMount() {
        console.log("BookChapter",this.props.navigation.state.params.book)
        if (this.props.navigation.state.params.book) {
            this._loadData(this.props.navigation.state.params.book)
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    _loadData(book) {
        const booksotre = new QiDian();
        booksotre._getBookChapter(book.href,booksotre.chapter_rule)
            .then(data => {
                if (data.length >= 1) {
                    this.setState({chapterList: data,loading: false})
                } else {
                    booksotre._ajaxGetChapter(book.bid)
                        .then(data => {
                            if (data.length >= 1) {
                                this.setState({chapterList: data,loading: false})
                            } 
                        })
                }
            })
    }

    _keyExtractor = (item, index) => `key${index}`;

    _toRead = (item,index) => {
        NavigationUtil.goToPageWithName({
            key: this.props.navigation.state.key,
            navigation: this.props.navigation,
            chapterList: this.state.chapterList,
            book: {
                ...this.props.navigation.state.params.book,
                chapter_index: index,
            },
            chapter: item,
        },"ReadPage");
    }

    render() {
        const { loading, chapterList } = this.state;
        return (
            <View style={styles.container}>
                <TitleBar type={"BookChapter"} {...this.props}/>
                {loading
                    ? <View style={{alignItems:'center',marginTop:200}}><Text>加载中...</Text></View>
                    : <FlatList
                        data={chapterList}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item,index}) => <TouchableOpacity onPress={() => this._toRead(item,index)} style={styles.item}>
                            <Text style={styles.text} ellipsizeMode={"tail"} numberOfLines={1}>{item.title}</Text>
                        </TouchableOpacity>}
                    />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
    },
    item: {
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 10,
        marginBottom: 1,
    },
    text: {
        width: 300,
        color: 'rgba(31,36,49,0.56)',
    },
})
