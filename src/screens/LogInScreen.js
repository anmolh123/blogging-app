import React, { useState, useCallback, useContext, useEffect, useRef } from 'react';
import { 
    View, 
    StyleSheet, 
    Text,
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert 
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import { Actions } from 'react-native-router-flux';
import { UserLoginContext } from '../context/UserLoginContext';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header';

const LogInScreen = props =>{

    const [ userName, setUserName ]= useState('');
    const [ password, setPassword ]= useState('');
    const { setUserId } = useContext(UserLoginContext);
    const users = useRef({});
    const userId = useRef(null);

    const initialize = useCallback(async ()=>{ 
        try{
            const usersJson = await AsyncStorage.getItem('users');
            userId.current = parseInt(await AsyncStorage.getItem('userId'));
            if(usersJson){
                users.current = JSON.parse(usersJson);
                // console.log(users.current,userId.current);
            }
            if(userId.current){
                setUserId(userId);
                Actions.replace('homeBlog');
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
        await AsyncStorage.setItem('userId',userId);
        // console.log("userId set ",userId);
    }

    const loginHandler = useCallback(()=>{
        Keyboard.dismiss()
        // console.log('login',users.current,userId.current);
        // console.log(userName);
        // console.log(password);
       
        const usersList = Object.keys(users.current);
        usersList.map( id =>{
            if(users.current[id].userName === userName 
                && users.current[id].password === password)
            {
                // console.log('Login SuccessFul');
                setUserId(id);
                setStore(id);
                userId.current = id;
                Actions.replace('homeBlog');
            }
        })
        // console.log(userId.current);
        if(userId.current){
            return;
        }
        setPassword('');
        setUserName('');
        Alert.alert(
            'Login Failed',
            'Try again with valid userName and Password',
            [{ text:'OK', style:'cancel' }]
        )

    },[userName,password]);

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.screenContainer}>
            <Header showLeftIcon={false} title="Login"/>
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
                        <CustomButton
                            onPress={loginHandler}
                        >
                            Log In
                        </CustomButton>
                        <CustomButton 
                            style={styles.signUpButton}
                            onPress={()=> Actions.signup()}
                        >
                            Sign Up
                        </CustomButton>
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
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between",
        paddingTop: 30
    },
    signUpButton:{
        backgroundColor : 'gray'
    },
    textStyle:{
        fontSize: 20,
        fontFamily: 'serif'
    }
});

export default LogInScreen;