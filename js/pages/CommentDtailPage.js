import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    FlatList,
    ScrollView,
    TextInput,
    KeyboardAvoidingView, Dimensions,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import TitleBar from "../componenets/TitleBar";
import {connect} from "react-redux";
import NavigationUtil from "../navigator/NavigationUtil";
import URL from "../../serverAPI";
import Spinner from "react-native-spinkit";
const {width,height} =  Dimensions.get('window');



class CommentDtailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            subLoading:false,
            data: null,
            hasStar:false,
            hasLike:false,
            images: null,
            imagesVisible: false,
            showInputView: false,
            text:"",
        }
    }
    componentDidMount() {
        this._loadData()
    }


    _loadData = () => {
        if (this.props.navigation.state.params.data) {
            this.setState({loading: true})
            fetch(URL.commentDetail + "?id=" + this.props.navigation.state.params.data._id)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    data:data.data,
                    loading: false,
                })
            })
        }
    }


    _submitComment = () => {
        if (this.props.user !== null) {
            const { books, ...user } = this.props.user
            const _comment = {
                author: user,
                content: this.state.text,
                star: 0,
                time: new Date(),
            }
            let Comment = this.state.data;
            Comment.comments.unshift(_comment)
            Comment.commentNumber += 1;
            this.setState({loading: true})
            fetch(URL.commentSave,this.getOptions(Comment))
            .then((response) => response.json())
            .then(data => {
                this.setState({loading: false})
                console.log("data.data",data.data)
                this._loadData()
                this.setState({
                    showInputView: false,
                    text:"",
                })
            })
        }
    }

    getOptions(data) {
        return {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    }

    _keyExtractor = (item, index) => `key${index}`;

    _getImagesItem(images) {
        console.log("_getImagesItem")
        let list = new Array();
        let index = 0;
        let size = 100;
        if (images.length  <= 2) {
            size = 120;
        }
        for (let item of images) {
            list.push(
                <TouchableOpacity onPress={() => this._showImages(!this.state.imagesVisible)}  key={index}>
                    <Image source={{uri: item}} style={{width:size,height:size,marginRight:10,marginBottom:10}}/>
                </TouchableOpacity>
            )
            index++;
        }
        return list;
    }
    _showImages = (visible) => {
        this.setState({ imagesVisible: visible });
    }
    _showInput = (visible) => {
        if (this.props.user !== null) {
            this.setState({showInputView: visible});
        }else {
            NavigationUtil.goToPageWithName({
                navigation: this.props.navigation,
            },"LoginPage");
        }
    }
    touchView = () => {
        this.setState({showInputView: false});
    }

    _starComment = () => {
        if (!this.state.hasStar) {
            let Comment = this.state.data;
            Comment.star += 9;
            fetch(URL.commentSave,this.getOptions(Comment))
            .then((response) => response.json())
            .then(data => {
                this._loadData()
                this.setState({
                    hasStar: true,
                })
            })
        }
    }

    _likeThis = (index) => {
        if (!this.state.hasLike) {
            let Comment = this.state.data;
            Comment.comments[index].star += 1;
            fetch(URL.commentSave,this.getOptions(Comment))
            .then((response) => response.json())
            .then(data => {
                this._loadData()
                this.setState({
                    hasLike: true,
                })
            })
        }
    }

    

    render() {
        const { loading, data, images, imagesVisible, showInputView } = this.state;
        const styles = StyleSheet.create({
            submitButton: {
                flex:2,
                height: 50,
                backgroundColor: this.props.theme,
                borderRadius:10,
                margin:10,
                alignItems:'center',
                justifyContent: 'center',
            },
            input: {
                flex:5,
                height: 50,
                marginLeft:10,
                paddingLeft:10,
                borderRadius:10,
                backgroundColor: '#e0f3ff',
            },
            buttonColor: {
                color: this.props.theme,
            },
            button: {
                flex: 1,
                height: 60,
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            },
            inputView: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f2f2f2',
            },
            bottomView: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderTopWidth: 0.4,
                borderTopColor: '#a5b7c3',
            },
            comTip: {
                color:'#7a7a7a',
                fontSize:12,
                marginRight:5,
            },
            star: {
                flexDirection: 'row',
                alignItems: 'center',
            },
            comHeader: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            },
            container: {
                flex: 1,
                backgroundColor: '#F0F8FF',
            },
            _row: {
                flexDirection: 'row',
                alignItems: 'center',
            },
            content: {
                backgroundColor: 'white',
                padding:20,
                marginBottom: 10,
            },
            title: {
                fontSize:18,
                lineHeight:28,
            },
            author: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 20,
            },
            contentText: {
                fontSize: 16,
                color: '#363636',
                lineHeight: 24,
                marginBottom:10,
            },
            book: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
            },
            bookinfo: {
                fontSize:12,
                color:'#a4b7c3',
            },
            images: {
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: 20,
            },
            closeModel: {
                position: 'absolute',
                top: 30,
                right: 10,
                zIndex:999,
            },
            comment: {
                backgroundColor: 'white',
                padding:20,
            },
            commentTitle: {
                fontSize: 16,
                marginBottom: 10,
            },
            spinner: {
                position:'absolute',
                top: height/2 - 18,
                left: width/2 - 18,
            },
        })
        return(
            <View style={styles.container}>
                <TitleBar type={"CommentDtail"} {...this.props}/>
                <ScrollView onTouchStart={() => this.touchView()} showsVerticalScrollIndicator={false} >
                    {loading
                        ? null
                        : <View style={styles.content}>
                            <Text style={styles.title}>{data.title}</Text>
                            <View style={styles.author}>
                                <Image source={{uri:data.author.cover}} style={{width:30,height:30,borderRadius:15}}/>
                                <Text style={{marginLeft:10,fontSize:12,color:this.props.theme}}>{data.author.call}</Text>
                            </View>
                            <Text style={styles.contentText}>{data.content}</Text>
                            {data.images.length <= 0 ? null
                                : <View style={styles.images}>
                                    {this._getImagesItem(data.images)}
                                </View>
                            }
                            <Modal visible={imagesVisible} presentationStyle={'fullScreen'}>
                                <TouchableOpacity onPress={() => this._showImages(!imagesVisible)} style={styles.closeModel}>
                                    <EvilIcons name={'close'} size={50} style={{color:'#ffffff'}}/>
                                </TouchableOpacity>
                                <ImageViewer imageUrls={images}/>
                            </Modal>
                            {data.type != 'book'
                                ? null
                                :<View style={styles.book}>
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

                        </View>
                    }
                    {this.state.data !== null
                        ? <View style={styles.comment}>
                        {this.state.data.comments.length > 0
                            ? <Text style={styles.commentTitle}>评论</Text>
                            : <Text style={styles.commentTitle}>暂无评论</Text>
                        }

                        <FlatList
                            keyExtractor={this._keyExtractor}
                            data={this.state.data.comments}
                            renderItem={({item,index}) => <View>
                                <View style={styles.comHeader}>
                                    <View style={styles.author}>
                                        <Image source={{uri:item.author.cover}} style={{width:30,height:30,borderRadius:15}}/>
                                        <Text style={{marginLeft:10,fontSize:12,color:this.props.theme}}>{item.author.call}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this._likeThis(index)} style={styles.star}>
                                        <Text style={styles.comTip}>{item.star}</Text>
                                        <EvilIcons name={'like'} size={24} style={{color:this.props.theme}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={styles.contentText}>{item.content}</Text>
                                    <View style={{marginTop:10}}/>
                                    <Text style={styles.comTip}>{item.meta}</Text>
                                </View>
                            </View>}
                        />
                    </View> : null}
                </ScrollView>
                {showInputView
                    ? <KeyboardAvoidingView behavior={"padding"} style={styles.inputView}>
                        <TextInput
                            autoFocus={true}
                            onChangeText={(text) => this.setState({text:text})}
                            onBlur={() => this._showInput(!showInputView)}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            onPress={() => this._submitComment()}
                            style={styles.submitButton}
                        >
                            {!this.state.subLoading
                                ? <Text style={{color:'white'}}>发 送</Text>
                                :<Spinner
                                    style={styles.spinner}
                                    isVisible={this.state.subLoading}
                                    type={'FadingCircle'}
                                    color={'white'}
                                />
                            }
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                    : null
                }
                {this.state.data !== null ? <View style={styles.bottomView}>
                    <TouchableOpacity onPress={() => this._showInput(!showInputView)} style={styles.button}>
                        <EvilIcons name={'pencil'} size={30}  style={styles.buttonColor}/>
                        <Text style={styles.buttonColor}>{data.commentNumber}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._starComment()} style={styles.button}>
                        <EvilIcons name={'like'} size={30}  style={styles.buttonColor}/>
                        <Text style={styles.buttonColor}>{data.star}</Text>
                    </TouchableOpacity>
                </View> : null}

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
    user: state.user.user,
});



export default connect(mapStateToProps)(CommentDtailPage);

