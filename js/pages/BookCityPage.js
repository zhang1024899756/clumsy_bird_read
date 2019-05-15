import React, {Component} from 'react';
import {StyleSheet, FlatList, View, Dimensions } from 'react-native';


import Spinner from "react-native-spinkit";
import TitleBar from '../componenets/TitleBar';
import BookPanel from '../componenets/BookPanel';
import RnSwiper from '../componenets/RnSwiper';
import {connect} from "react-redux";
import QiDian from "../bookstore/QiDian";
import actions from "../redux/action";
const {width,height} =  Dimensions.get('window');


class BookCityPage extends Component{


    _keyExtractor = (item, index) => item.id;

    _store () {
        let store = this.props.source;
        if (!store) {
            store = {
                data: [],
                loading: true,
            }

        }
        return store;
    }

    render() {
        const store = this._store();
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

                {store.loading ? null
                    : <FlatList
                    ListHeaderComponent={() => <View
                        style={{height:150,padding:10,backgroundColor:'white'}}
                    >
                        <RnSwiper/>
                    </View>}
                    data={store.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => <BookPanel id={item.id} data={item.data} />}
                />}
                <Spinner
                    style={styles.spinner}
                    isVisible={store.loading}
                    type={'FadingCircle'}
                    color={this.props.theme}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    source: state.source.source,
});

const mapDispatchToProps = dispatch => ({
    onSourceChange: (source) => dispatch(actions.onSourceChange(source)),
});


export default connect(mapStateToProps,mapDispatchToProps)(BookCityPage);

