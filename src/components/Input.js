import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => { 

    const [ color, setColor ] = useState('grey');
    const onFocus = ()=>{
        setColor('green');
    }

    const onBlur = ()=>{
        setColor('grey');
    }

    return(
        <TextInput
            onFocus={onFocus}
            onBlur={onBlur}
            {...props} 
            style={{...styles.input, borderBottomColor: color , ...props.style}}
        />
    )
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomWidth: 2,
        marginVertical: 10,
        padding: 5
    }
});

export default Input;

