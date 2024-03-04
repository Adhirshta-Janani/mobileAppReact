import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Platform  } from 'react-native';
import DateTimePicker  from '@react-native-community/datetimepicker';
// import {ImageCalender } from './../../../assets/'

export default function DatepickerComponent() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const [text, setText] = useState('Empty'); 

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = 'Hours:' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    setText(fDate + '\n' + fTime )
    // console.log(fDate + '(' + fTime + ')')
    
   }

   const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
   }

   return (
    <View>
      {/* <Text style = {{fontWeight: 'bold', fontSize: 20}}>{text}</Text>
      <View style= {{margin:20}}>
        <Button title='DatePicker' onPress = {() => showMode('date')}/>
      </View>
      <View style= {{margin:20}}>
        <Button title='TimePicker' onPress = {() => showMode('time')}/>
      </View> */}
        <DateTimePicker
        testID = 'dateTimePicker'
        value = {date}
        // mode ={mode}
        is24Hour = {true}
        display = 'default'
        onChange= {onChange}
         />
    </View>
   )
  }
