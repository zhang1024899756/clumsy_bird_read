import React, {Component} from 'react';
import {StyleSheet, FlatList, View, Dimensions } from 'react-native';

import QiDian from '../bookstore/QiDian';
import Spinner from "react-native-spinkit";
import TitleBar from '../componenets/TitleBar';
import BookPanel from '../componenets/BookPanel';
import RnSwiper from '../componenets/RnSwiper';
import {connect} from "react-redux";
const {width,height} =  Dimensions.get('window');


class BookCityPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            FlatListData: [],
        }
    }

    componentDidMount() {
        this._loadData()
    }

    _loadData() {
        const booksotre = new QiDian();
        for (let index = 0,len = booksotre.panel_url_list.length; index < len; index++) {
            booksotre._getFlatListItemData(booksotre.panel_url_list[index],booksotre.panel_book_rule_list,booksotre.panel_header_rule)
            .then((data) => {
                let listItem = {id: `key${index}`,data: data};
                this.setState({FlatListData: [...this.state.FlatListData,listItem],loading: false});
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        const { FlatListData, loading } = this.state;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#F0F8FF',
            },
            spinner: {
                position:'absolute',
                top: height/2 - 18,
                left: width/2 - 18,
            },
        });
        return (
            <View style={styles.container}>
                <TitleBar type={"BookCity"} {...this.props}/>

                {loading ? null
                    : <FlatList
                    ListHeaderComponent={() => <View
                        style={{height:150,padding:10,backgroundColor:'white'}}
                    >
                        <RnSwiper/>
                    </View>}
                    data={FlatListData}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => <BookPanel id={item.id} data={item.data} />}
                />}
                <Spinner
                    style={styles.spinner}
                    isVisible={this.state.loading}
                    type={'FadingCircle'}
                    color={this.props.theme}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(BookCityPage);

