import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, } from 'react-native';
import "./styles.css";



const button = ({ children, style, onClick }) => {
    return (
      <Button style={style} onClick={onClick}>
        {children}
      </Button>
    );
};

export default button;