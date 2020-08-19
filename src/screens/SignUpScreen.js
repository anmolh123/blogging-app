import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
    View, 
    StyleSheet, 
    Text,
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert 
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Card from '../components/Card';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';

const SignUpScreen = props =>{

    const [ userName, setUserName ]= useState('');
    const [ password, setPassword ]= useState('');
    const users = useRef({});

    const initialize = useCallback(async ()=>{      
        try{
            const usersJson = await AsyncStorage.getItem('users');
            if(usersJson){
                users.current = JSON.parse(usersJson);
                // console.log('users',usersJson);
            }
        } catch(error){
            // console.log("Store Initialization Error");
        }    
    },[]);

    useEffect(()=>{
        initialize();  
    },[]);

    const userNameHandler = useCallback(input =>{
        setUserName(input.replace(/[^a-zA-Z0-9]+$/g,''));
    },[]);

    const passwordHandler = useCallback( input => {
        setPassword(input);
    },[]);

    const setStore = async (userId)=>{
            const userDetailObj = { userName: userName, password: password };
            await AsyncStorage.setItem('users',JSON.stringify({...users.current, [userId]: userDetailObj }));
            // console.log("userDetail",userDetailObj);
    }

    const signUpHandler = useCallback(()=>{
        // console.log("user pass ",userName,password);
        Keyboard.dismiss();
        if(userName===''&&password==''){
            Alert.alert(
                'Invalid Inputs',
                'Enter Valid userName and Password',
                [{ text:'OK', style:'cancel' }]
            )
            return;
        }

        try {
            const usersList = Object.keys(users.current);
            usersList.map( userId =>{
                // console.log(users.current[userId]);
                if(users.current[userId].userName === userName){
                    Alert.alert(
                        'UserName Exits',
                        'Enter different UserName',
                        [{ text:'OK', style:'cancel' }]
                    )
                    setPassword('');
                    setUserName('');
                    throw new Error;
                }
            })
            setStore(usersList.length+1);  
            Actions.replace('login');
         } catch (error) {
        //    console.log("Store setUp Error");
         }

    },[userName,password]);

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.screenContainer}>
                <Header iconName="arrow-left" title='Sign Up' action={Actions.pop}/>
                <View style={styles.screen} >
                    <Card style={styles.card}>
                        <View style={styles.Inputcontainer}>
                            <Text style={styles.textStyle}>User Name</Text>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={userName}
                                onChangeText={userNameHandler}
                            />
                        </View>
                        <View>
                            <Text style={styles.textStyle}>Password</Text>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                value={password}
                                onChangeText={passwordHandler}
                            />
                        </View>
                        <View style={styles.ButtonContainer}>
                            <CustomButton onPress={signUpHandler}>Sign Up</CustomButton>
                        </View>
                    </Card>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    screenContainer:{
        flex: 1
    },
    screen:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card:{
        width:"80%"
    },
    Inputcontainer:{
        marginVertical: 25
    },
    ButtonContainer:{
        paddingTop: 30,
        alignItems: 'flex-start'
    },
    signUpButton:{
        backgroundColor : 'gray'
    },
    textStyle:{
        fontSize: 20,
        fontFamily: 'serif'
    }
});

export default SignUpScreen;