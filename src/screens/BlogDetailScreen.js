import React, { useEffect } from 'react';
import { 
    View, 
    StyleSheet,
    Image
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

const BlogDetailScreen = props =>{
    const { id, title, body } = props.item;

    useEffect(()=>{
        if(!props.comments[id]){
            props.loadComments(id);
        }
    },[]);
    
    const deleteHandler = ()=>{
        props.deleteBlog(id);
        Actions.pop();
    }

    return (
        <View style={styles.screen}>
            <Header iconName="arrow-left" title="Details" action={Actions.pop}/>
            <Card style={styles.container}>
                <Image 
                        source={require('../assets/pictures/success.png')} 
                        style={styles.image}
                        resizeMode='cover'
                />
                <View style={styles.titleContainer}>
                    <BlogTitleText style={styles.titleStyle}>{title}</BlogTitleText>
                </View>
                <View>
                    <BlogBodyText style={styles.bodyStyle}>{body}</BlogBodyText>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton 
                        style={styles.buttonStyle}
                        onPress={()=>Actions.createBlog({ isEdit: true, item: props.item })}
                    >
                        Update
                    </CustomButton>
                    <CustomButton 
                        style={styles.deletebuttonStyle}
                        onPress={deleteHandler}
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
    },
    image:{
        width: '100%',
        height: '30%',
        borderRadius: 25
    },
    titleContainer:{
        marginTop: 25,
        alignItems:'center'
    },
    titleStyle:{
        fontSize: 24
    },
    bodyStyle:{
        fontSize: 16
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    buttonStyle:{
        paddingHorizontal: 45,
    },
    deletebuttonStyle:{
        paddingHorizontal: 45,
        backgroundColor: Colors.accent
    }
});

const mapStateToProps = state => {
    return {
        comments : state.comments
    }
};


const mapDispatchToProps = dispatch => {
    return {
        deleteBlog : blogActions.deleteBlog(dispatch),
        loadComments : blogActions.loadComments(dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BlogDetailScreen);