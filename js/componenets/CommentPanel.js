import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import NavigationUtil from "../navigator/NavigationUtil";



export default class CommentPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
        }
    }
    componentDidMount() {
        this.setState({
            data: {
                title: "结局猜想,他的结局可能会成为炸弹仁的同事",
                content: "我觉得高温不会在躺下了，他的结局可能会成为炸弹仁的同事，成为审查官。西陵里说过，有的审查官是会组建自己的势力的。\n我觉得高温不会在躺下了，他的结局可能会成为炸弹仁的同事，成为审查官。西陵里说过，有的审查官是会组建自己的势力的。",
                images:[
                    "http://5b0988e595225.cdn.sohucs.com/images/20180524/d948e00d9c984422a9d6db90e14cbf82.jpeg",
                    "http://5b0988e595225.cdn.sohucs.com/images/20180524/d948e00d9c984422a9d6db90e14cbf82.jpeg",
                    "http://5b0988e595225.cdn.sohucs.com/images/20180524/d948e00d9c984422a9d6db90e14cbf82.jpeg",
                    "http://5b0988e595225.cdn.sohucs.com/images/20180524/d948e00d9c984422a9d6db90e14cbf82.jpeg",
                ],
                book: {
                    title: "道君",
                    cover:"https://bookcover.yuewen.com/qdbimg/349573/1005236478/180",
                    tag: "修仙",
                    state:"连载",
                },
                type: "book",
                author: {
                    cover: "http://bpic.588ku.com/element_origin_min_pic/18/01/12/9b3634950a2c2a899413958c93ebfab5.jpg%21/fwfh/804x804/quality/90/unsharp/true/compress/true",
                    name: "一千古",
                    power: 1,
                },
                star: 54,
                commentNumber: 50,
            },
            loading:false,
        })
    }
    _getImagesItem(images) {
        let list = new Array();
        let index = 0;
        let size = 60;
        if (images.length  <= 2 && images.length > 1) {
            size = 100;
        }else if (images.length  == 1) {
            size = 120;
        }
        for (let item of images) {
            list.push(<Image source={{uri: item}} key={index} style={{width:size,height:size,marginRight:10,marginBottom:5}}/>)
            index++;
        }
        return list;
    }

    _toCommentDtail = (data) => {
        NavigationUtil.goToPageWithName({
            navigation: this.props.navigation,
            data: data,
        },"CommentDtailPage");
    }

    render() {
        const { data, loading } = this.state;
        return(
            <View style={styles.container}>
                {loading
                    ? <View style={{alignItems:'center',marginTop:200}}><Text>加载中...</Text></View>
                    : <TouchableOpacity onPress={() => this._toCommentDtail(data)} activeOpacity={0.5}>
                        <View style={styles.header}>
                            <View style={styles._row}>
                                <Image source={{uri:data.author.cover}} style={{width:30,height:30,borderRadius:15}}/>
                                <Text style={{marginLeft:10,fontSize:12,color:'#291400'}}>{data.author.name}</Text>
                            </View>
                            {data.author.power == 10
                                ? <Image source={require('../image/官方置顶印章.png')} style={{width:50,height:50,opacity:0.5}}/>
                                : data.commentNumber >= 50
                                    ? <Image source={require('../image/热门帖子印章.png')} style={{width:50,height:50,opacity:0.5}}/>
                                    : null
                            }
                        </View>
                        <View style={styles.content}>
                            <Text style={{marginBottom:10,width:250}} ellipsizeMode={"tail"} numberOfLines={1}>{data.title}</Text>
                            <Text
                                ellipsizeMode={"tail"}
                                numberOfLines={2}
                                style={{fontSize:12,color:'#425060',lineHeight:18}}
                            >
                                {data.content}
                            </Text>
                            {data.type != 'book'
                                ? null
                                : <View style={styles.book}>
                                    <Image
                                        source={{uri:data.book.cover }}
                                        style={{width: 30, height: 40,marginRight:10,borderRadius:2}}
                                    />
                                    <View>
                                        <Text style={{marginBottom:8}}>{data.book.title}</Text>
                                        <View style={styles._row}>
                                            <Text style={styles.bookinfo}>{data.book.tag}</Text>
                                            <Text style={{marginLeft:10,marginRight:10,color:'#bababa'}}>|</Text>
                                            <Text style={styles.bookinfo}>{data.book.state}</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            {data.images.length <= 0 ? null
                                : <View style={styles.images}>
                                    {this._getImagesItem(data.images)}
                                </View>
                            }
                        </View>
                        <View style={styles.footer}>
                            <EvilIcons name={'comment'} size={20} style={{color:'#425060',marginLeft:10}}/>
                            <Text style={styles.tips}>{data.commentNumber}</Text>
                            <EvilIcons name={'like'} size={20} style={{color:'#425060',marginLeft:10}}/>
                            <Text style={styles.tips}>{data.star}</Text>
                        </View>
                </TouchableOpacity>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 10,
    },
    _row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        marginLeft: 40,
    },
    book: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.4,
        borderRadius: 3,
        borderColor: '#8a8a8a',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    bookinfo: {
        fontSize:12,
        color:'#a4b7c3',
    },
    images: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    footer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'flex-end',
        marginTop:10,
    },
    tips: {
        marginLeft:2,
        fontSize: 12,
        color: '#425060',
    },
})