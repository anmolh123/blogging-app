import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const BlogBodyText = props =>{
    return (
        <View>
            <Text style={{...styles.bodyStyle, ...props.style}} >
                {props.children}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    bodyStyle:{
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        fontWeight:'200'
    }
});

export default BlogBodyText;