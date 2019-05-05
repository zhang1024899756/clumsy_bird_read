import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');


export default class RnSwiper extends Component{
    render() {
        return(
            <Swiper height={300} autoplay showsPagination={false}>
                <View style={styles.slide}>
                    <Text style={styles.text}>菜鸟阅读</Text>
                </View>
                <View style={styles.slide}>
                    <Text style={styles.text}>精心出品</Text>
                </View>
                <View style={styles.slide}>
                    <Text style={styles.text}>匠心制作</Text>
                </View>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});