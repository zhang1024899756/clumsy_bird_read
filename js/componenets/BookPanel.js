import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { connect } from 'react-redux';

import NavigationUtil from '../navigator/NavigationUtil';

class BookPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            header: null,
            propsData: null,
            loading: true,
            currentData: null,
        }
    }
    componentDidMount() {
        const _propsData = this.props.data.content;
        //截取8本书显示
        if ( _propsData && _propsData.length >= 8) {
            let currentArr = _propsData.slice(0,8);
            this.setState({
                header: this.props.data.header,
                currentData: currentArr,
                loading: false,
                propsData: _propsData,
            });
        }
    }

    //数组随机取值
    _randomCurrent = () => {
        const propsData = this.state.propsData;
        let shuffled = propsData.slice(0); //复制数组
        let i = propsData.length; //原始数组长度
        let min = i - 8;
        let temp = null;
        let index = null;
        while (i-- > min) { //取8个
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        this.setState({currentData: shuffled.slice(min)});
    }

    _keyExtractor = (item, index) => item.bid;

    _toBookDetail = (item) => {
        NavigationUtil.goToPageWithName({
            navigation: this.props.navigation,
            book: item,
        },"DetailPage");
    }

    render() {
        const { currentData, loading, header } = this.state;
        const styles = StyleSheet.create({
            container: {
                backgroundColor: 'white',
                padding: 5,
                paddingTop: 20,
                marginBottom: 10,
            },
            header: {
                flexDirection: 'row',
                height: 40,
            },
            table: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            book:{
                padding: 2,
            },
            booktitle: {
                color: '#464c5c',
                width: 75,
                fontSize: 13,
                lineHeight: 16,
            },
            bookauthor: {
                color: '#7a8dbb',
                width: 75,
                fontSize: 12,
                lineHeight:14,
            },
            footer: {
                height: 30,
                marginTop: 10,
                paddingTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopWidth: 1,
                borderTopColor: '#F0F8FF',
            },
        });
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Entypo name={'bookmark'} size={18} style={{color:this.props.theme,marginRight: 10}}/>
                    <Text style={{color:this.props.theme}}>{header}</Text>
                </View>
                {loading
                    ? <Text>加载中...</Text>
                    : <FlatList
                        style={styles.table}
                        data={currentData}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => this._toBookDetail(item)} style={styles.book}>
                                <Image
                                    style={{width: 75, height: 100,marginBottom: 5}}
                                    source={{uri: item.cover}}
                                />
                                <Text ellipsizeMode={"tail"} numberOfLines={1} style={styles.booktitle}>{item.title}</Text>
                                <Text ellipsizeMode={"tail"} numberOfLines={1} style={styles.bookauthor}>{item.author}</Text>
                            </TouchableOpacity>
                        )}
                    />}
                <TouchableOpacity onPress={this._randomCurrent} style={styles.footer}>
                    <Text style={{fontSize: 12,color:this.props.theme}}>换一批</Text>
                    <Entypo name={'cycle'} size={16} style={{color:this.props.theme,marginLeft: 10}}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(BookPanel);

