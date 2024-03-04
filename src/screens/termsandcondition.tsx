import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
 
import DatePicker from 'react-native-date-picker'
//import Users from "../models/users";

const TermsandCondition = () => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const textInputChange = (val: string) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val: string) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val: string) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

//   const loginHandle = (userName: string, password: string) => {
//     const foundUser = Users.filter((item) => {
//       return userName == item.username && password == item.password;
//     });

//     if (data.username.length == 0 || data.password.length == 0) {
//       Alert.alert(
//         "Wrong Input!",
//         "User ID or password field cannot be empty.",
//         [{ text: "Okay" }]
//       );
//       return;
//     }

//     if (foundUser.length == 0) {
//       Alert.alert("Invalid User!", "User ID or password is incorrect.", [
//         { text: "Okay" },
//       ]);
//       return;
//     }
//     signIn(foundUser);
//   };

  return (
    
      // <KeyboardAwareScrollView >
      
      <View style={styles.container}>
      <StatusBar backgroundColor="#146C94" barStyle="light-content" />
      
      <View style={styles.header}>

        

      

         <View>
        
        <Text style={[styles.text_header,
        {
          paddingTop:-20,
        paddingBottom: 30,
        }]}>Terms and Conditions </Text>
      </View>
        
      </View>
     
      <View
        style={[
          styles.footer,
          {
            backgroundColor: "#D9D9D9",
            justifyContent:'center',
            marginTop:20,
            //marginLeft:20,
            //marginRight:20,
          },
        ]}
      >
     
        <Text style={styles.text_footer}>Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [business name]’s relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.</Text>
        <Text style={styles.text_footer}> The term ‘[business name]’ or ‘us’ or ‘we’ refers to the owner of the website whose registered office is [address]. Our company registration number is [company registration number and place of registration]. The term ‘you’ refers to the user or viewer of our website. </Text>
        <Text style={styles.text_footer}> The content of the pages of this website is for your general information and use only. It is subject to change without notice.</Text>
        

       
        

        
        

      
       
         
       
        
            
        
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
            //   loginHandle(data.username, data.password);
            }}
          >
            <LinearGradient
              colors={["#082B3B", "#082B3B"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Accept
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        
       

          </View>
    </View>
    
    // </KeyboardAwareScrollView>
 
  );
};

export default TermsandCondition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#146C94', 
    
  },
  

  header: {
    //flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop:90,
    paddingHorizontal: 20,
    //paddingBottom: 20,   
    
  },
  footer: {
    flex: 10,
    backgroundColor:"#146C94",
    justifyContent:'space-around',    
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30, 
    marginTop:20, 
  },
  
  text_header: {
    color: "white",
    textAlign:"center",
    fontWeight: "normal",
    fontSize: 25,
   // fontFamily: "inria serif",
    
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    //fontFamily: "inria serif",
  },
  
  button: {
    flex: 1,
    alignItems: "center",
    marginBottom:15,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "normal",
    //fontFamily: "inria serif",
  },
});

function signIn(
  foundUser: {
    id: number;
    email: string;
    username: string;
    password: string;
    userToken: string;
  }[]
) {
  throw new Error("Function not implemented.");
}