import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image} from 'react-native';
import TitleBar from "../componenets/TitleBar";
import AntDesign from "react-native-vector-icons/AntDesign";
import {NavigationActions, StackActions} from "react-navigation";
import {connect} from "react-redux";
import URL from "../../serverAPI";
import NavigationUtil from "../navigator/NavigationUtil";




class BookcasePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTip: true,
            loading: true,
            hasLoad: false,
            bookList: [],
        }
    }

    componentDidMount() {
        this.setState({
            loading: false,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate",{
            "this.state.hasLoad": this.state.hasLoad,
            "this.props.bookList": this.props.bookList
        })
        if (!this.state.hasLoad) {
            console.log("设置");
            console.log("this.props.bookList.bookListData",this.props.bookList.bookList);
            if (this.props.bookList.bookList) {
                if (!this.props.bookList.bookList.bookListData) {
                    return
                }
                if (this.props.bookList.bookList.bookListData.books.length > 0) {
                    this.setState({
                        bookList: this.props.bookList.bookList.bookListData.books,
                        loading: false,
                        hasLoad: true,
                        showTip: false,
                    })
                }else {
                    this.setState({
                        loading: false,
                        hasLoad: true,
                        showTip: true,
                    })
                }
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({hasLoad: false})
    }



    _keyExtractor = (item, index) => item.bid;

    _toReadPage = (item) => {
        const { chapterList, ...book } = item;
        NavigationUtil.goToPageWithName({
            navigation: this.props.navigation,
            chapterList: chapterList,
            book: book,
        },"ReadPage");
    }

    _toBookCity = () => {
        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'HomePage' })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        const { loading, bookList, showTip } = this.state;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#ffffff',
            },
            book: {
                height: 130,
                margin: 16,
            },
            listFooter: {
                width: 90,
                height: 120,
                margin: 16,
                backgroundColor: '#cdeaff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
            },
            tips: {
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.4,
                position:'absolute',
                top:0,
            },
        })
        return (
            <View style={styles.container}>
                <TitleBar
                    type={"Bookcase"}
                    theme={this.props.theme}
                    userId={this.props.userId}
                    {...this.props}
                />
                {loading ? <View style={{alignItems:'center',marginTop:200}}><Text>加载中...</Text></View>
                    : <ScrollView>
                        <FlatList
                            data={bookList}
                            numColumns={3}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={({item}) => <TouchableOpacity
                                style={styles.book}
                                activeOpacity={0.5}
                                onPress={() => this._toReadPage(item)}
                            >
                                <Image
                                    style={{width: 90, height: 120,marginBottom: 5}}
                                    source={{uri: item.cover}}
                                />
                                <Text>{item.title}</Text>
                            </TouchableOpacity>}
                        />
                        {loading
                            ? null
                            : showTip
                                ? <View style={styles.tips}>
                                    <Image
                                        style={{width:360,height:360}}
                                        source={require('../image/打脸.png')}
                                    />
                                    <Text style={{fontSize:20,color: '#505050'}}>空 空 如 也 ~</Text>
                                </View>
                                : null
                        }
                    </ScrollView>
                }
            </View>
        );
    }
}



const mapStateToProps = state => ({
    theme: state.theme.theme,
    userId: state.userId.userId,
    bookList: state.bookList,
});

export default connect(mapStateToProps)(BookcasePage);



/*{/!*<FlatList*!/}
{/!*    numColumns={3}*!/}
{/!*    contentContainerStyle={styles.table}*!/}
{/!*    data={datalist}*!/}
{/!*    keyExtractor={this._keyExtractor}*!/}
{/!*    renderItem={({item}) => {*!/}
{/!*        <TouchableOpacity style={styles.book} activeOpacity={0.5}>*!/}
{/!*            <Image*!/}
{/!*                style={{width: 90, height: 120,marginBottom: 5}}*!/}
{/!*                source={{uri: item.cover}}*!/}
{/!*            />*!/}
{/!*            <Text>{item.title}</Text>*!/}
{/!*        </TouchableOpacity>*!/}
{/!*    }}*!/}
{/!*!/>*!/}*/


const datalist = [
    {
        title: "全球高武",
        href: "https://book.qidian.com/info/1012237441",
        cover: "https://bookcover.yuewen.com/qdbimg/349573/1012237441/150",
        bid: "10124897440",
        bookmarks: 3,
    },
    {
        title: "全球高武",
        href: "https://book.qidian.com/info/1012237441",
        cover: "https://bookcover.yuewen.com/qdbimg/349573/1012237441/150",
        bid: "10124835441",
        bookmarks: 3,
    },
    {
        title: "全球高武",
        href: "https://book.qidian.com/info/1012237441",
        cover: "https://bookcover.yuewen.com/qdbimg/349573/1012237441/150",
        bid: "10229937442",
        bookmarks: 3,
    },
    {
        title: "全球高武",
        href: "https://book.qidian.com/info/1012237441",
        cover: "https://bookcover.yuewen.com/qdbimg/349573/1012237441/150",
        bid: "1012277543",
        bookmarks: 3,
    },
    {
        title: "全球高武",
        href: "https://book.qidian.com/info/1012237441",
        cover: "https://bookcover.yuewen.com/qdbimg/349573/1012237441/150",
        bid: "1082237444",
        bookmarks: 3,
    },
    {
        title: "全球高武",
        href: "https://book.qidian.com/info/1012237441",
        cover: "https://bookcover.yuewen.com/qdbimg/349573/1012237441/150",
        bid: "10129935445",
        bookmarks: 3,
    },
    {
        title: "全球高武",
        href: "https://book.qidian.com/info/1012237441",
        cover: "https://bookcover.yuewen.com/qdbimg/349573/1012237441/150",
        bid: "10129935446",
        bookmarks: 3,
    },
];
