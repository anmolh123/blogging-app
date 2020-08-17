import { useContext, useEffect } from 'react';
import { Actions } from 'react-native-router-flux';
import { UserLoginContext } from '../context/UserLoginContext';
import AsyncStorage from '@react-native-community/async-storage';

const Logout = () => {
    
    const { setUserId } = useContext(UserLoginContext);

    const logOutHandler = async ()=>{ 
        try{
            await AsyncStorage.setItem('userId','0');
        } catch(error){
            // console.log("Logout Error");
        }    
    };

    useEffect(()=>{
        
        logOutHandler();
        setUserId(null);
        Actions.replace('login');

    },[]);

    return null;
}

export default Logout;
