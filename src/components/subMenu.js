import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = props =>{
    return (
        <TouchableOpacity onPress={()=>props.action()}>
            <View style={styles.submenu}>
                <View style={styles.iconContainer}>
                    <Icon name={props.name} style={styles.icon} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.submenuText}>{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    submenu:{
      width: '100%',
      height: 50,
      alignItems: 'center',
      flexDirection: 'row'
    },
    submenuText:{
        fontSize: 20,
        color: 'white',
        fontWeight: '600'
    },
    iconContainer:{
        marginLeft: 20
    },
    textContainer:{
      marginLeft: 30
    },
    icon:{
      fontSize: 25,
      color: 'white'
    }
});

export default SearchBar;