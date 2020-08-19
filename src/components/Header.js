import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback,Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = props =>{

    let rightIcon;
    if(props.rightIcon){
        rightIcon=(
            <View style={styles.rightIconContainer}>
                <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss(); props.rightAction(); }}>
                    <Icon name={props.rightIconName} style={styles.icon} />
                </TouchableWithoutFeedback>
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.header} >
                { !props.showLeftIcon &&
                    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss(); props.action(); }}>
                        <Icon name={props.iconName} style={styles.icon} />
                    </TouchableWithoutFeedback>
                }
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                {rightIcon}
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
        fontSize: 30,
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
    },
    rightIconContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 10
    }
});

export default Header;