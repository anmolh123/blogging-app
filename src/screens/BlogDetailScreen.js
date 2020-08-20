import React, { useEffect, useState } from 'react';
import { 
    View, 
    StyleSheet,
    Image,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    Modal,
    TouchableHighlight,
    Alert
} from 'react-native';
import BlogTitleText from '../components/BlogTitleText';
import BlogBodyText from '../components/BlogBodyText';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as blogActions from '../store/actions/blogActions';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import imagesArray from '../assets/pictures/images';

const BlogDetailScreen = props =>{
    const { id, title, body, imageSrc, userId } = props.item;
    const [ comments, setComments] = useState([]);
    const [ showComment, setShowComment ] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);

    useEffect(()=>{
        if(!props.comments[id]){
            props.loadComments(id);
        }
        if(!props.users[userId]){
            props.loadUserDetail(userId);
        }
    },[]);

    useEffect(()=>{
        if(props.comments[id]){
            setComments(props.comments[id]);
        }
    },[props.comments[id]]);
    
    const deleteHandler = ()=>{
        props.deleteBlog(id);
        Actions.pop();
    }

    const deleteConfirmation = ()=>{
        Alert.alert(
            'Confirmation',
            'You Sure you want to delete ?',
            [ {text: 'OK', onPress: ()=>deleteHandler(), style: 'default'}, { text:'Cancel', style:'cancel' }]
        )
    }

    const showCommentHandler = ()=>{
        setShowComment( current => !current );
    }

    let iconContent = (
        <Icon name="caret-up" style={styles.icon} />
    );

    if(showComment){
        iconContent = (
            <Icon name="caret-down" style={styles.icon} />
        );
    }
    
    let commentLoadContent = (
        <TouchableWithoutFeedback onPress={showCommentHandler}>
            <View style={styles.commentLoadConatiner}>
            <View>
                <Text style={styles.commentLoadText}>Comments({comments.length})</Text>
            </View>
            <View style={styles.iconContainer}>
                {iconContent}
            </View>
        </View>
        </TouchableWithoutFeedback>
    );

    let userDetailModal;

    if(props.users[userId]){
        userDetailModal = (
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalTextContainer}>
                    <View>
                        <Text style={styles.modalBoldText}>Name: </Text>
                    </View>
                    <View>
                        <Text style={styles.modalText}>{props.users[userId].name}</Text>
                    </View>
                </View>
                <View style={styles.modalTextContainer}>
                    <View>
                        <Text style={styles.modalBoldText}>Email: </Text>
                    </View>
                    <View>
                        <Text style={styles.modalText}>{props.users[userId].email}</Text>
                    </View>
                </View>
                <View style={styles.modalTextContainer}>
                    <View>
                        <Text style={styles.modalBoldText}>Phone: </Text>
                    </View>
                    <View>
                        <Text style={styles.modalText}>{props.users[userId].phone}</Text>
                    </View>
                </View>
                <View style={styles.modalTextContainer}>
                    <View>
                        <Text style={styles.modalBoldText}>Website: </Text>
                    </View>
                    <View>
                        <Text style={styles.modalText}>{props.users[userId].website}</Text>
                    </View>
                </View>
    
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => {
                    setModalVisible( curVal => !curVal);
                  }}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        );
    }

    return (
        <View style={styles.screen}>
            <Header 
                iconName="arrow-left" 
                title="Details" 
                action={Actions.pop} 
                rightIcon={true}
                rightIconName="info-circle"
                rightAction={()=> setModalVisible( curVal => !curVal )}
            />
            <Card style={styles.container}>
                {userDetailModal}
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <Image 
                            source={imagesArray[imageSrc]} 
                            style={styles.image}
                            resizeMode='cover'
                    />
                    <View style={styles.titleContainer}>
                        <BlogTitleText style={styles.titleStyle}>{title}</BlogTitleText>
                    </View>
                    <View style={styles.bodyContainer}>
                        <BlogBodyText style={styles.bodyStyle}>{body}</BlogBodyText>
                    </View>
                    { commentLoadContent }
                    { showComment && comments.map( item => (
                        <View style={styles.commentContainer} key={item.id}>
                            <View style={styles.commentBody}>
                                <Text style={styles.commentBodytext}>{item.body}</Text>
                            </View>
                            <View style={styles.postedByContainer}>
                                <View>
                                    <Text style={styles.postedByTextStyle}>{item.name}</Text>
                                </View>
                                <View>
                                    <Text style={styles.postedByTextStyle}>{item.email}</Text>
                                </View>
                            </View>
                        </View>
                    ))}

                </ScrollView>
                <View style={styles.buttonContainer}>
                    <CustomButton 
                        style={styles.buttonStyle}
                        onPress={()=>Actions.createBlog({ isEdit: true, item: props.item })}
                    >
                        Update
                    </CustomButton>
                    <CustomButton 
                        style={styles.deletebuttonStyle}
                        onPress={deleteConfirmation}
                    >Delete
                    </CustomButton>
                </View>
            </Card>     
        </View>
    )
}
const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    container:{
        flex:1,
        paddingBottom: 8,
        borderRadius: 0
    },
    scrollContainer:{
        flexGrow: 1
    },
    image:{
        width: '100%',
        height: 200
    },
    titleContainer:{
        marginTop: 25,
        alignItems:'center'
    },
    titleStyle:{
        fontSize: 24
    },
    bodyContainer:{
        marginBottom: 20
    },
    bodyStyle:{
        fontSize: 18
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    buttonStyle:{
        paddingHorizontal: 45,
    },
    deletebuttonStyle:{
        paddingHorizontal: 45,
        backgroundColor: Colors.accent
    },
    commentLoadConatiner:{
        marginVertical: 20,
        flexDirection: 'row',
        alignContent: 'center',
        borderTopColor: '#F0EEEE',
        borderTopWidth: 1
    },
    commentLoadText:{
        fontSize: 18,
        fontFamily: 'monospace'
    },
    commentContainer:{
        padding: 20,
        borderWidth: 2,
        borderColor: '#F0EEEE',
        paddingHorizontal: 35,
        marginVertical: 5
    },
    commentBodytext:{
        fontSize: 16,
        fontFamily: 'Lato-Medium'
    },
    postedByContainer:{
        alignItems: 'flex-end',
        marginTop: 10,
        borderTopColor: '#F0EEEE',
        borderTopWidth: 1
    },
    postedByTextStyle:{
        fontSize: 16,
        fontFamily: 'Lato-Italic'
    },
    icon:{
        fontSize: 30,
        color: 'black'
    },
    iconContainer:{
        marginLeft: 5
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView:{
        backgroundColor: 'white',
        padding: 35,
        borderColor: '#F0EEEE',
        elevation: 8,
        shadowColor: '#F0EEEE',
        borderRadius: 10
    },
    modalTextContainer: {
        flexDirection: 'row'
    },
    modalText: {
        marginBottom: 15,
        fontSize: 20,
        fontFamily: 'monospace'
    },
    modalBoldText:{
        fontSize: 20,
        fontFamily: 'Lato-Heavy'
    },
    button: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});

const mapStateToProps = state => {
    return {
        comments : state.comments,
        users : state.users
    }
};


const mapDispatchToProps = dispatch => {
    return {
        deleteBlog : blogActions.deleteBlog(dispatch),
        loadComments : blogActions.loadComments(dispatch),
        loadUserDetail : blogActions.loadUserDetail(dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BlogDetailScreen);