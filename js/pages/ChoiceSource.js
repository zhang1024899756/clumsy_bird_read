import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

import NavigationUtil from "../navigator/NavigationUtil";
import AntDesign from "react-native-vector-icons/AntDesign";
import actions from "../redux/action";
import {connect} from "react-redux";
import QiDian from "../bookstore/QiDian";
import ZongHeng from "../bookstore/ZongHeng";


class ChoiceSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceList: [
                {name:"起点中文网",value:"QiDian"},
                {name:"纵横中文网",value:"ZongHeng"},
            ],
            selectSource: "QiDian",
            selectIndex: this.props.source.source.index,
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
            list.push(
                <RadioButton
                    style={{
                        height: 50,
                        paddingLeft:20,
                        paddingRight:20,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                    value={item.value}
                    key={item.value}
                >
                    <Text>{item.name}</Text>
                </RadioButton>
            )
        }
        return list;
    }


    _saveChange = () => {
        if (this.state.selectSource == "QiDian") {
           this.props.onSourceChange(new QiDian())
        }else if (this.state.selectSource == "ZongHeng") {
            this.props.onSourceChange(new ZongHeng()) 
        }
        NavigationUtil.goToBack(this.props.navigation);
    }

    _changeItem = (index,value) => {
        this.setState({selectSource:value,selectIndex:index})
        console.log("_changeItem",index)
    }



    render() {
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
        })
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
                    selectedIndex={this.state.selectIndex}
                    onSelect={(index,value) => this._changeItem(index,value)}
                    style={styles.radioGroup}
                >
                    {this._getSourceItem()}
                </RadioGroup>

            </View>
        );
    }
}

const mapStateToProps = state => ({
    source: state.source.source,
});

const mapDispatchToProps = dispatch => ({
    onSourceChange: (source) => dispatch(actions.onSourceChange(source)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChoiceSource);

