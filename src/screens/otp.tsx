import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Linking,
  } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";
import { BASE_URL, Login_URL, VERIFYUSER_URL } from "../constants/config";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 
'react-native-confirmation-code-field';
import axios from "axios";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import Users from "../models/users";

const CELL_COUNT = 4;

const OTPAuthorisation = ({navigation,route}) => {

    const [data, setData] = React.useState({
    code: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    loader: false,
    isError: false
  });


  let { responseData } = route.params;
  // const { authoriseCode } = route.authoriseCode;
  const [value, setValue] = useState('');
  let [otp, setOtp] = useState(responseData.otp);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  
  });


  const verifyHandle = () => {
    setData({
      ...data,
      loader: true,
      isError: false
    });
      console.log(JSON.stringify(responseData));
      if(otp == value){
        console.log(value, "check this", responseData.otp);
        // navigation.navigate( { name: 'SignUp'});
        navigation.navigate( { name: 'SignUp',
        params: { responseData : responseData }});
      }
      else{
        setData({
          ...data,
          loader: true,
          isError: true
        });
      }
      // console.log(value, "check this outside", responseData.otp);
     }
    
    //  const resendOtp = () => {
    //   console.log(JSON.stringify(responseData));
    //   if(responseData.otp == value){
    //     console.log(value, "check this", responseData.otp);
    //     navigation.navigate( { name: 'DSPScoreCard'});
    //   }
    //   // console.log(value, "check this outside", responseData.otp);
    //  }
    
     const resendOtp = () => {
    
      setData({
          ...data,
          loader: true,
          isError: false
        });
    
       let bodydata = JSON.stringify({
          UserToken: responseData.authoriseCode
        });
    
        console.log(bodydata);
    
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: VERIFYUSER_URL,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: bodydata,
        };
    
        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.data.isSuccess == true) {
              setOtp(otp = response.data.otp);
            //  responseData = response.data;
             response.data.authoriseCode = responseData.authoriseCode ;
                responseData = response.data;
                console.log(JSON.stringify(responseData));
            } else {
              setData({
                ...data,
                loader: false,
                isError: true,
              });
              // Alert.alert("Wrong Input!", "Incorrect Credentials", [
              //   { text: "Okay" },
              // ]);
            }
          })
          .catch((error) => {
            console.log(error);
            setData({
              ...data,
              loader: false,
            });
            Alert.alert("Error", error, [{ text: "Okay" }]);     ///check this logic once again
          });
    
    }

  return (
    
      //<KeyboardAwareScrollView >
      
      <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
      <Image
        source={require("./../assets/images/circle.png")}
        style={styles.circle}
      />
      <View style={styles.header}>
          <Image
             source={require("./../../assets/white_logo.png")}
            style={styles.logo}
        />  
      </View>
      
      <View style={[styles.header,
      {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-start",
        marginTop:-70,
        marginBottom:30,
        paddingHorizontal: 40,
      }]
    }>
        
        <Text style={[styles.text_header,
        {
          fontSize:18,
          color:'#fff',
          fontWeight:'bold',
        }]}>Your Code :  {responseData.authoriseCode}</Text>
      </View>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: "#D9D9D9",
            justifyContent:'center',
            shadowColor: "#202020",
            shadowOffset: { width: 2, height: 2 },
            shadowRadius: 10,
            marginBottom:150,
            marginLeft:20,
            marginRight:20,
          },
        ]}
      >
       <View>
        
        <Text style={[styles.text_header,
        {
          paddingTop:-20,
        paddingBottom: 10,
        }]}>OTP</Text>
      </View>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />  
      
      
          <Text
            style={{
              color: "#146C94",
              marginTop: 50,
              textAlign: "center",
              justifyContent: "flex-end",
              // fontFamily: "inria serif",
            }}
            onPress={() => {
              // loginHandle(data.username, data.password);
              resendOtp();
            }}
          >
            Resend OTP
          </Text>
          {data.isError ? (
               <Text
               style={{
                 color: "red",
                 marginTop: 20,
                 marginBottom:-20,
                 textAlign: "center",
                 justifyContent: "flex-end",
                 // fontFamily: "inria serif",
               }}
               
             >
               Invalid OTP, click 'Resend OTP'
             </Text>
            ) : null}
   
      
      <View style={styles.button}>
          <TouchableOpacity
            // style={styles.signIn}
            onPress={() => {
              verifyHandle();
            }}
          >
            <LinearGradient
              colors={["#146C94", "#082B3B"]}
              style={styles.buttonStyle}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "#fff",
                  },
                ]}
              >
               Verify
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        
        

        </View>
            
        
        </View>
    </View>
    
    //</KeyboardAwareScrollView>
 
  );
};

export default OTPAuthorisation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#146C94', 
    
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#146C94',
    borderBottomWidth: 2,
  },
  

  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop:90,
    paddingHorizontal: 20,
    //paddingBottom: 20,   
    
  },
  footer: {
    flex: 9,
    backgroundColor:"#146C94",
    justifyContent:'space-around',    
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,  
  },
  circle: {
    
    resizeMode: "contain",
    marginLeft: -30,
    bottom: 30,
    width: 150,
    height: 150,
    shadowColor: "#202020",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
  },
  logo: {
    resizeMode: "contain",
    flex:1,    
    marginLeft: 180,
    marginTop:-100,
    bottom: 50,
    width: 200,
    height: 44,
  },
  text_header: {
    color: "black",
    textAlign:"center",
    fontWeight: "normal",
    fontSize: 25,
    // fontFamily: "inria serif",
    
  },
  
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
  buttonStyle: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "normal",
    // fontFamily: "inria serif",
  },
});










