import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image} from 'react-native';
import TitleBar from "../componenets/TitleBar";
import AntDesign from "react-native-vector-icons/AntDesign";
import {NavigationActions, StackActions} from "react-navigation";
import {connect} from "react-redux";
import URL from "../../serverAPI";




class BookcasePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTip: true,
            loading: true,
            bookList: [],
        }
    }

    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
        if (this.state.bookList.length == 0) {

            if (this.props.userId !== null) {
                fetch(URL.getUser + "?id=" + this.props.userId)
                .then((response) => response.json())
                .then(data => {
                    if (data.data.books.length > 0) {
                        this.setState({
                            bookList:data.data.books,
                            loading: false,
                            showTip: false,
                        })
                        console.log(this.state.bookList)
                    }
                })
            }
        }
    }

    _keyExtractor = (item, index) => item.bid;

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
                height: 120,
                margin: 16,
                backgroundColor:'red',
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
                <FlatList
                    data={bookList}
                    extraData={this.state}
                    renderItem={({item}) => <Text>{item.title}</Text>}
                />
                {loading ? <View style={{alignItems:'center',marginTop:200}}><Text>加载中...</Text></View>
                    : <ScrollView>
                        <FlatList
                            // numColumns={3}
                            // contentContainerStyle={styles.table}
                            data={datalist}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={({item}) => {
                               <TouchableOpacity style={styles.book} activeOpacity={0.5}>
                                    <Image
                                        style={{width: 90, height: 120,marginBottom: 5}}
                                        source={{uri: item.cover}}
                                    />
                                    <Text>{item.title}</Text>
                                </TouchableOpacity>
                            }}
                        />
                        {showTip
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
});

export default connect(mapStateToProps)(BookcasePage);




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
