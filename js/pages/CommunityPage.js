import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TitleBar from "../componenets/TitleBar";
import CommentPanel from "../componenets/CommentPanel";


export default class CommunityPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TitleBar type={"Community"} {...this.props}/>
                <View style={styles.images}>
                     <Text style={{color:'white',fontSize:30}}>横幅</Text>
                </View>
                <CommentPanel/>
                <CommentPanel/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
    },
    images: {
        height: 100,
        padding:10,
        backgroundColor: '#5F9EA0',
        alignItems:'center',
        justifyContent:'center',
    },
})
