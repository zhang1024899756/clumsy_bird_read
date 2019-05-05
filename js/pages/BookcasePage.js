import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image} from 'react-native';
import TitleBar from "../componenets/TitleBar";
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigationUtil from "../navigator/NavigationUtil";




export default class BookcasePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            bookList: [{type:"button"},],
        }
    }
    componentDidMount() {
        this.setState({
            // bookList: [
            //     ...datalist,
            //     {type:"button"},
            // ],
            loading: false,
        })
    }

    _keyExtractor = (item, index) => item.bid;

    _toBookCity = () => {
        this.props.navigation.push("")
    }

    render() {
        const { loading, bookList } = this.state;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#ffffff',
            },
            book: {
                height: 120,
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
        })
        return (
            <View style={styles.container}>
                <TitleBar type={"Bookcase"} {...this.props}/>

                {loading ? <View style={{alignItems:'center',marginTop:200}}><Text>加载中...</Text></View>
                    : <ScrollView>
                        <FlatList
                            numColumns={3}
                            contentContainerStyle={styles.table}
                            data={bookList}
                            keyExtractor={this._keyExtractor}
                            renderItem={({item}) => {
                                if (!item.type) {
                                    return <TouchableOpacity style={styles.book} activeOpacity={0.5}>
                                        <Image
                                            style={{width: 90, height: 120,marginBottom: 5}}
                                            source={{uri: item.cover}}
                                        />
                                    </TouchableOpacity>
                                } else {
                                    return  <TouchableOpacity
                                        onPress={() => this._toBookCity()}
                                        style={styles.listFooter}
                                        activeOpacity={0.5}>
                                        <AntDesign name={'plus'} size={30} style={{color: 'white'}}/>
                                    </TouchableOpacity>
                                }
                            }}
                        />
                        <TouchableOpacity onPress={() => NavigationUtil.restToHomePage(this.props)}>
                            <Text>按钮</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
            </View>
        );
    }
}

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
