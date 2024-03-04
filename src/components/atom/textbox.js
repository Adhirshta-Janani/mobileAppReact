import React, { useState }  from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import "./styles.css";

const textbox = () => {
  const [state, setState] = useState({email:'',password:'',});
  
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
     //TextInput
        //style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
        //placeholder="useless placeholder"
        //keyboardType="numeric"
    </SafeAreaView>
  );
};

export default textbox;