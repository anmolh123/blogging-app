import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const BlogTitleText = props =>{
    return (
        <View style={styles.container}>
            <Text style={{...styles.titleStyle, ...props.style}} >
                {props.children}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginBottom : 15
    },
    titleStyle:{
        fontFamily : 'monospace',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default BlogTitleText;