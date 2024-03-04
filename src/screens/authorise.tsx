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
import axios from "axios";
import { BASE_URL, Login_URL, VERIFYUSER_URL } from "../constants/config";
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
 
import DatePicker from 'react-native-date-picker'
import Loader from "../components/atom/loader";
//import Users from "../models/users";

const AuthoriseScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    code: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    loader: false,
    isError: false
  });

  const { colors } = useTheme();

  const textInputChange = (val: string) => {
    if (val.trim().length >= 10) {
      setData({
        ...data,
        code: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        code: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  // const handlePasswordChange = (val: string) => {
  //   if (val.trim().length >= 8) {
  //     setData({
  //       ...data,
  //       password: val,
  //       isValidPassword: true,
  //     });
  //   } else {
  //     setData({
  //       ...data,
  //       password: val,
  //       isValidPassword: false,
  //     });
  //   }
  // };

  const authoriseHandle = () => {

    setData({
        ...data,
        loader: true,
        isError: false
      });

     let bodydata = JSON.stringify({
        UserToken: data.code
      });
  
      console.log(bodydata);
  
      let config = {
        method: "post",
        // maxBodyLength: Infinity,
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
          console.log(bodydata);
          if (response.data.isSuccess == true) {
            setData({
              ...data,
              loader: false,
              isError: false
            });
            response.data.authoriseCode = data.code ;
            navigation.navigate( { name: 'OTP',
              params: { responseData : response.data }});
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

//   const login = () => {
//     setData({
//       ...data,
//       loader: true,
//       isError: false
//     });

//     let bodydata = JSON.stringify({
//       DspCode: data.code,
//       password: data.password,
//       userName: data.username,
//     });

//     console.log(bodydata);

//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: Login_URL,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       data: bodydata,
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         if (response.data.isSuccess == true) {
//           setData({
//             ...data,
//             loader: false,
//             isError: false
//           });
//           navigation.navigate("DSPScoreCard");
//         } else {
//           setData({
//             ...data,
//             loader: false,
//             isError: true,
//           });
//           // Alert.alert("Wrong Input!", "Incorrect Credentials", [
//           //   { text: "Okay" },
//           // ]);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         setData({
//           ...data,
//           loader: false,
//         });
//         Alert.alert("Error", error, [{ text: "Okay" }]);     ///check this logic once again
//       });
//   };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val: string) => {
    if (val.trim().length >= 16) {
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

 

  return (
    
      // <KeyboardAwareScrollView >
      
      <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
      <Image
        source={require("./../assets/images/circle.png")}
        style={styles.circle}
      />
      <View style={styles.header}>

        

       <Image
            source={require("./../assets/images/Logo.png")}
            style={styles.logo}
          />

         <View>
        
        <Text style={[styles.text_header,
        {
          paddingTop:-20,
        paddingBottom: 30,
        }]}>Authorisation code </Text>
      </View>
        
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
           {data.isError ? (
              <Text style={styles.apiError}> Incorrect Credentials</Text>
            ) : null}
        {data.loader ? <Loader size={undefined} /> : null}
        <Text style={styles.text_footer}></Text>
        <View style={[styles.action,
        {
          alignItems:'center',
        }]}>
          <TextInput
            placeholder="Enter the code"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          
          {data.check_textInputChange ? (
            <View>
              <Feather name="check-circle" color="green" size={20} />
            </View>
          ) : null}
        </View>
        {/* {data.isValidUser ? null : (
          <View>
            <Text style={styles.errorMsg}>
            Code must be minimum 10 characters long. 
            </Text>
          </View>
        )}  */}
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              authoriseHandle();
            }}
          >
            <LinearGradient
              colors={["#146C94", "#082B3B"]}
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
                Next
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        
        <TouchableOpacity>
          <Text
            style={{
              color: "#146C94",
              marginTop: 90,
              textAlign: "center",
              justifyContent: "flex-end",
            //   fontFamily: "inria serif",
            }}
            onPress={() => {
              navigation.navigate('Login')
            }}
          >
            Already logged in?
          </Text>
        </TouchableOpacity>

          </View>
            
        
        </View>
    </View>
    
    // </KeyboardAwareScrollView>
 
  );
};

export default AuthoriseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    
  },
  

  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop:90,
    paddingHorizontal: 20,
    //paddingBottom: 20,   
    
  },

  apiError: {

    color : "#ff0000",
    textAlign: 'center',
    // color: '#000000',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',

  },
  footer: {
    flex: 5,
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
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    // fontFamily: "inria serif",
  },
  action: {
    flex:0.5,
    //flexDirection: "row",
    justifyContent:'space-around',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    //paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    // fontFamily: "inria serif",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 60,
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
    // fontFamily: "inria serif",
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

