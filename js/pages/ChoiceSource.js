import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

import NavigationUtil from "../navigator/NavigationUtil";
import AntDesign from "react-native-vector-icons/AntDesign";


export default class ChoiceSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceList: [
                {name:"起点中文网",value:"QIDIAN"},
                {name:"纵横中文网",value:"ZONGHENG"},
                {name:"书旗小说网",value:"SHUQI"},
            ],
            selectSource: "QIDIAN"
        }
    }
    _goBack() {
        return (<TouchableOpacity
            onPress={() => {
                NavigationUtil.goToBack(this.props.navigation);
            }}
            style={{flexDirection: 'row',alignItems:'center',position: 'absolute',left:10}}
        >
            <AntDesign name={'left'} size={24} style={{color: 'black',marginRight: 5}}/>
        </TouchableOpacity>);
    }

    _getSourceItem() {
        let list = new Array();
        for (let item of this.state.sourceList) {
            list.push(<RadioButton style={styles.radioButton} value={item.value} key={item.value} >
                <Text>{item.name}</Text>
            </RadioButton>)
        }
        return list;
    }


    _saveChange = () => {
        
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerWrap}>
                    <View style={styles.header}>
                        {this._goBack()}
                        <Text>选择数据源</Text>
                        <TouchableOpacity onPress={() => this._saveChange()} style={styles.saveview}>
                            <Text>保存</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <RadioGroup
                    selectedIndex={0}
                    onSelect={(index,value) => this.setState({selectSource:value})}
                    style={styles.radioGroup}
                >
                    {this._getSourceItem()}
                </RadioGroup>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
    },
    headerWrap: {
        paddingTop: Platform.OS === 'ios' ? 40 : 0,
        backgroundColor: 'white',
    },
    header: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    saveview: {
        position: 'absolute',
        right:20,
    },
    radioGroup: {
        marginTop:10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    radioButton: {
        height: 50,
        paddingLeft:20,
        paddingRight:20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})
