import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList, Text } from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";

import { connect } from 'react-redux';
import actions from '../redux/action';
import Entypo from "react-native-vector-icons/Entypo";

class ThemeColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTheme: "#38a1db",
            theme: [
                {name: '默认',color: '#38a1db'},
                {name: '暗青蓝 ',color: '#7b68ee'},
                {name: '浅肉色',color: '#ffa07a'},
                {name: '间紫色 ',color: '#9370db'},
                {name: '浅珊瑚色',color: '#f08080'},
                {name: '玫瑰棕色',color: '#bc8f8f'},
                {name: '暗橄榄绿色 ',color: '#556b2f'},
                {name: '军蓝色',color: '#5f9ea0'},
                {name: '浅海蓝色 ',color: '#20b2aa'},
                {name: '闪蓝色',color: '#1e90ff'},
                {name: '菊蓝色 ',color: '#6495ed'},
                {name: '深青色 ',color: '#008b8b'},
                {name: '中紫色',color: '#ba55d3'},
                {name: '西耶娜色',color: '#a0522d'},
                {name: '石板灰',color: '#5a6979'},
                {name: '暗灰色',color: '#4b4b4b'},
                {name: '紫红色',color: '#dda0dd'},
                {name: '紅梅色',color: '#f2a0a1'},
                {name: '櫨色',color: '#b77b57'},
                {name: '甚三紅',color: '#ee827c'},
                {name: '枇杷茶',color: '#ae7c4f'},
            ]
        }
    }

    _goBack() {
        return (<TouchableOpacity
            onPress={() => {
                NavigationUtil.goToBack(this.props.navigation);
            }}
            style={{flexDirection: 'row',alignItems:'center',position: 'absolute',top:30,left:20}}
        >
            <Entypo name={'chevron-left'} size={30} style={{color: 'white',marginRight: 5}}/>
        </TouchableOpacity>);
    }

    _keyExtractor = (item, index) => item.color;

    _touchTheme = (item) => {
        this.setState({currentTheme:item.color})
    }
    render() {
        const { theme, currentTheme } = this.state;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: "#38a1db",
                alignItems: 'flex-end',
                justifyContent: 'center',
            },
            modal: {
                marginBottom: 60,
                padding:10,
                backgroundColor: 'white',
            },
            header: {
                height: 130,
                paddingTop: 80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            },
            savebtn: {
                margin: 10,
                marginRight:20,
            },
        })
        return (
            <View style={styles.container}>
                {this._goBack()}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.savebtn} onPress={() => {
                        this.props.onThemeChange(this.state.currentTheme)
                        NavigationUtil.goToBack(this.props.navigation);
                    }}>
                        <Entypo name={'check'} size={30} style={{color:'#fff'}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.modal}>
                    <FlatList
                        style={styles.themelist}
                        numColumns={3}
                        extraData={this.state}
                        showsVerticalScrollIndicator = {false}
                        keyExtractor={this._keyExtractor}
                        data={theme}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => this._touchTheme(item)}
                                activeOpacity={0.5}
                                style={{
                                    width:110,
                                    height:110,
                                    backgroundColor: item.color,
                                    margin:4,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {currentTheme === item.color
                                    ? <Entypo name={'star'} size={40} style={{color:'#fff'}}/>
                                    : <Text style={{color:'#fff'}}>{item.name}</Text>
                                }
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemeColor);

