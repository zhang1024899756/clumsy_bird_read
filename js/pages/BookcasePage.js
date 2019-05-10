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
        }
    }

    componentDidMount() {
        this.setState({
            loading: false,
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.user == null ) {
            this.setState({showTip: true,})
        }else if (nextProps.user.books.length == 0) {
            this.setState({showTip: true,})
        }else {
            this.setState({showTip: false,})
        }
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

    _store () {
        let store = this.props.user;
        if (store == null) {
            store = {
                books: []
            }
        }
        return store;
    }

    render() {
        const { loading, showTip } = this.state;
        const store = this._store();
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
                    user={this.props.user}
                    {...this.props}
                />
                {loading ? <View style={{alignItems:'center',marginTop:200}}><Text>加载中...</Text></View>
                    : <ScrollView>
                        <FlatList
                            data={store.books}
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
                                <Text ellipsizeMode={"tail"} numberOfLines={1} style={{width: 90}}>{item.title}</Text>
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
    user: state.user.user,
    bookList: state.bookList,
});

export default connect(mapStateToProps)(BookcasePage);
