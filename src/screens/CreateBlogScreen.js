import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Text,TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import { connect } from 'react-redux';
import * as blogActions from '../store/actions/blogActions';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';

const CreateBlog = props =>{

    const [ title, setTitle ]= useState('');
    const [ body, setBody ]= useState('');
    const { isEdit, item } = props;
    const screenTitle = useRef("Create Blog");

    useEffect(()=>{
        // console.log('params',isEdit, item);
        if(isEdit){
            setTitle(item.title);
            setBody(item.body);
            screenTitle.current="Edit Blog"
            // console.log(item.id);
        }
    },[]);

    const titleHandler = useCallback(input =>{
        setTitle(input);
    },[]);

    const bodyHandler = useCallback( input => {
        setBody(input);
    },[]);

    const addBlogHandler = useCallback(()=>{

        const addBlogJson = {
            blog : {
                userId : 1,
                id : Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
                title : title,
                body: body
            }
        }
        Keyboard.dismiss();
        props.addBlog(addBlogJson);
        Actions.homeBlog();

    },[title,body]);

    const updateBlogHandler = useCallback(()=>{

        const blogJson =  {
            ...item,
            title : title,
            body: body
        }

        Keyboard.dismiss();
        props.updateBlog(item.id,blogJson);
        Actions.pop();
        Actions.pop();

    },[title,body]);


    let buttonContent = (
        <CustomButton onPress={addBlogHandler}>
            Create
        </CustomButton>
    );

    if(isEdit){
        buttonContent = (
            <CustomButton onPress={updateBlogHandler}>
                Update
            </CustomButton>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.screen}>
            <Header iconName="arrow-left" title={screenTitle.current} action={Actions.pop}/>
                <Card style={styles.card}>
                    <View style={styles.Inputcontainer}>
                        <Text style={styles.textStyle}>Title</Text>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={title}
                            style={styles.textAreaStyle}
                            onChangeText={titleHandler}
                            placeholder={'Blog Title'}
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Body</Text>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable
                                maxLength={250}
                                multiline
                                numberOfLines = {12}
                                textAlignVertical="top"
                                value={body}
                                style={styles.textAreaStyle}
                                onChangeText={bodyHandler}
                                placeholder="Content of the Blog"
                            />
                        </View>
                    </View>
                    <View style={styles.ButtonContainer}>
                        {buttonContent}
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    header:{
        alignSelf: 'flex-start'
    },
    card:{
        flex: 1,
        borderRadius: 0
    },
    Inputcontainer:{
        marginVertical: 25
    },
    ButtonContainer:{
        paddingTop: 30,
        alignItems: 'flex-start',
        flex: 1,
        justifyContent: 'flex-end'
    },
    textStyle:{
        fontSize: 25,
        paddingBottom: 10,
        fontFamily: 'OpenSans-Regular'
    },
    textAreaContainer:{
        borderColor: 'grey',
        borderWidth: 2
    },
    textAreaStyle:{
        fontSize: 18
    }
});

const mapDispatchToProps = dispatch =>{
    return {
        addBlog : blogActions.addBlog(dispatch),
        updateBlog : blogActions.updateBlog(dispatch)
    }
}

export default connect(null,mapDispatchToProps)(CreateBlog);