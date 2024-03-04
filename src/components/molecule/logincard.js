import { View, Text } from 'react-native';
import React from 'react';
import textbox from '../atom/textbox';
import checkbox from '../atom/checkbox';
import button from '../atom/button';
import "./styles.css";



const logincard = () => {
    
    const handleClick = () => {
        console.log('Button was clicked!');
    };
    
  return (

    <View>
        <View style={styles.inputView}>
            <textbox             
                style={styles.inputText} 
                placeholder="User ID"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}/>
        </View>

        <View style={styles.inputView}>
            <textbox style={styles.inputText}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                placeholderTextColor="#003f5c"/>
        </View>
        <View>
            <button onClick={handleClick} style={''}>
                Login
            </button>
        </View>
        <View>
            <checkbox label='Remember Me'/>
        </View>
    </View>
    
  )
};

export default logincard;