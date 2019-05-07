import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import QiDian from "../bookstore/QiDian";
import Entypo from "react-native-vector-icons/Entypo";
import TitleBar from "../componenets/TitleBar";
import NavigationUtil from "../navigator/NavigationUtil";

import { connect } from 'react-redux';

//const MainWidth = Dimensions.get('window').width;

class DetailPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            book: null,
        }
    }
    componentDidMount() {
        if (this.props.navigation.state.params.book) {
            this._loadData()
        }
    }

    //导入书籍信息
    _loadData() {
        const booksotre = new QiDian();
        booksotre._getBookDetail(this.props.navigation.state.params.book.href)
            .then(data => {
                let _book = data;
                const { bid, href, state, tag, cover } = this.props.navigation.state.params.book;
                _book.bid = bid;
                _book.href = href;
                _book.state = state;
                _book.tag = tag;
                _book.cover = cover;
                this.setState({book: _book,loading: false})
            })
    }

    _toChapter = (book) => {
        NavigationUtil.goToPageWithName({
            navigation: this.props.navigation,
            book: book,
        },"BookChapter");
    }

    _keyExtractor = (item, index) => item.bid;

    render() {
        const { loading, book } = this.state;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                //justifyContent: 'center',
                // alignItems: 'center',
                backgroundColor: '#F0F8FF',
            },
            bookpaner: {
                backgroundColor: 'white',
                padding: 20,
                alignItems: 'center',
            },
            bookcover: {
                width: 105,
                height: 140,
            },
            bookinfo: {
                alignItems: 'center',
                justifyContent: 'center',
            },
            title: {
                fontSize: 20,
                color:this.props.theme,
            },
            author: {
                color: '#2F4F4F',
                fontSize: 14,
            },
            tags: {
                flexDirection: 'row',
            },
            comline: {
                color:'#E0EEEE',
                marginLeft: 5,
                marginRight: 5,
            },
            icon: {
                color: this.props.theme,
                marginRight: 5,
            },
            infotext: {
                fontSize: 12,
            },
            divide: {
                height: 1,
                backgroundColor: '#85baba',
                marginTop: 10,
                marginBottom: 10,
            },
            newchapter: {
                height: 40,
                backgroundColor: 'white',
                marginTop: 5,
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
                paddingLeft: 10,
                paddingRight: 10,
            },
            chapter: {
                height: 40,
                backgroundColor: 'white',
                marginBottom: 5,
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
                paddingLeft: 10,
                paddingRight: 10,

            },
            liketitle: {
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
            },
            liketext: {
                fontSize: 12,
                width: 75,
                marginTop: 10,
                marginBottom: 10,
                color: this.props.theme,
            },
        })
        return (
            <View style={styles.container}>
                <TitleBar type={"DetailPage"} {...this.props}/>
                {loading ? <View style={{alignItems:'center',marginTop:200}}><Text>加载中...</Text></View>
                    : <ScrollView>
                        <View style={styles.bookpaner}>
                            <Image source={{uri: book.cover}} style={styles.bookcover}/>
                            <View style={styles.bookinfo}>

                                <View style={{marginTop:15,marginBottom: 15}}><Text style={styles.title}>{book.title}</Text></View>
                                <View style={{marginBottom: 15}}><Text style={styles.author}>{book.author}</Text></View>

                                <View style={styles.tags}>
                                    <AntDesign name={'tago'} size={12} style={styles.icon}/>
                                    <Text style={styles.infotext}>{book.tag}</Text>
                                    <Text style={styles.comline}>|</Text>
                                    <AntDesign name={'hourglass'} size={12} style={styles.icon}/>
                                    <Text style={styles.infotext}>{book.state}</Text>
                                </View>

                                <View>
                                    <View style={styles.divide} />
                                    <Text style={{lineHeight: 25}}>{book.intro}</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.newchapter}>
                                <Text style={{color:this.props.theme}}>最新</Text>
                                <Text
                                    ellipsizeMode={"tail"}
                                    numberOfLines={1}
                                    style={{color: '#4b535b',width:250,fontSize: 12}}>{book.update}</Text>
                                <AntDesign name={'right'} size={12} style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._toChapter(book)} style={styles.chapter}>
                                <Text style={{color:this.props.theme}}>目录</Text>
                                <View style={{width:250}}/>
                                <AntDesign name={'right'} size={12} style={styles.icon}/>
                            </TouchableOpacity>
                        </View>

                        <View style={{backgroundColor:'white',paddingLeft:5,paddingRight:15,}}>
                            <View style={styles.liketitle}>
                                <Entypo name={'bookmark'} size={18} style={{color: 'red',marginRight: 10}}/>
                                <Text style={{color:this.props.theme}}>喜欢这本书的人还喜欢</Text>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={book.like_more}
                                keyExtractor={this._keyExtractor}
                                showsHorizontalScrollIndicator = {false}
                                renderItem={({item}) => <View style={{margin:10}}>
                                    <Image source={{uri: item.cover}} style={{width:75,height:100}}/>
                                    <Text ellipsizeMode={"tail"} numberOfLines={1} style={styles.liketext}>{item.title}</Text>
                                </View>}
                            />
                        </View>
                    </ScrollView>}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DetailPage);


