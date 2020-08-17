import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback,Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = props =>{
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.header} >
                <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss(); props.action(); }}>
                    <Icon name={props.iconName} style={styles.icon} />
                </TouchableWithoutFeedback>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 60,
        backgroundColor: '#9932CC',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon:{
        fontSize: 40,
        marginLeft: 10,
        color: 'white'
    },
    titleContainer:{
        marginLeft: 40
    },
    title:{
        fontSize: 25,
        fontFamily: 'OpenSans-Bold',
        color: 'white'
    }
});

export default Header;