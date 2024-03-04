import React, {useState} from 'react';
import {CheckBox, Text, StyleSheet, View} from 'react-native';
import "./styles.css";

const checkbox = ({label}) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.checkboxContainer}>
        <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
        />
        
      </View>
  );
};

export default checkbox;