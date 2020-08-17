import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = props =>{
    return (
        <View style={styles.container} >
            <Icon name="search" style={styles.icon} />
            <TextInput
                placeholder="Search"
                style={styles.input}
                value={props.value}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginVertical: 10,
        backgroundColor: '#F0EEEE',
        height: 50,
        marginHorizontal: 5,
        borderRadius: 5,
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1
    },
    input:{
        flex:1,
        fontSize: 18
    },
    icon:{
        fontSize: 30,
        alignSelf: 'center',
        marginHorizontal: 15,
        color: 'gray'
    }
});

export default SearchBar;