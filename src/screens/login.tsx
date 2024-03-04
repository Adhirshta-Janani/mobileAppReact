import React, { useContext, useState } from "react";
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
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "react-native-paper";
import Users from "../models/users";
import axios from "axios";
import { BASE_URL, Login_URL } from "../constants/config";
import Loader from "../components/atom/loader";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import icon from './../assets/images/'

const SignInScreen = ({ navigation, route }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    code: "",
    check_textInputChange: false,
    check_dspcodeChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidCode: true,
    loader: false,
    isError: false,
    errormsg: ""
  });

  // const { login } = useContext(AuthContext);

  //   const { signIn } = React.useContext(AuthContext);

  // let { responseData } = route.params ? route.params : '';

  const textInputChange = (val) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(val)) {
      setData({
        ...data,
        check_textInputChange: false,
        username: val,
        isValidUser: false,
        isError: false
      });
    } else {
      setData({
        ...data,
        check_textInputChange: true,
        // check_textInputChange: false,
        username: val,
        isValidUser: true,
        isError: false
      });
    }
  };

  const handlePasswordChange = (val) => {
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (!val.match(lowerCase)) {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
        isError: false,
        errormsg: "Password should contains lowercase letters!"
      });
    } else if (!val.match(upperCase)) {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
        isError: false,
        errormsg: "Password should contain uppercase letters!"
      });
    } else if (!val.match(numbers)) {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
        isError: false,
        errormsg: "Password should contains numbers also!"
      });
      //  setErrorMessage("Password should contains numbers also!");
    } else if (val.length < 10) {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
        isError: false,
        errormsg: "Password length should be more than 10."
      });
      //  setErrorMessage("Password length should be more than 10.");
    } 
    else {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
        isError: false
      });
    } 
  };

  const handleDSPCodeChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        code: val,
        isValidCode: true,
        check_dspcodeChange: true,
        isError: false
      });
    } else {
      setData({
        ...data,
        code: val,
        isValidCode: false,
        check_dspcodeChange: false,
        isError: false
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidDSPCode = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidCode: true,
        isError: false
      });
    } else {
      setData({
        ...data,
        isValidCode: false,
        isError: false
      });
    }
  };

  const handleValidUser = (val) => {
    // if (val.trim().length >= 4) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(val)) {
      setData({
        ...data,
        isValidUser: false,
        isError: true
      });
    } else {
      setData({
        ...data,
        isValidUser: true,
        isError: false
      });
    }
  };

  const loginHandle = (userName, password) => {

    console.log("Inside Function");
    if (
      data.username.length == 0 ||
      data.password.length == 0 ||
      data.code.length == 0
    ) {
      Alert.alert(
        "Wrong Input!",
        "User ID or password field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    } else {
      console.log("Inside Else");
      login();
    }
  };

  const login = () => {
    setData({
      ...data,
      loader: true,
      isError: false
    });

    let bodydata = JSON.stringify({
      DspCode: data.code,
      password: data.password,
      userName: data.username,
    });

    console.log(bodydata);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: Login_URL,
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
          setData({
            ...data,
            loader: false,
            isError: false
          });
          if(response.data.userLoginType == 'Driver'){
            navigation.navigate( { name: 'HomeScreen',
            params: { responseData : response.data }});
          }
          else{
            navigation.navigate( { name: 'ListingScreen',
            params: { responseData : response.data }});
          }
          setData({
            username: "",
            password: "",
            code: "",
            check_textInputChange: false,
            check_dspcodeChange: false,
            secureTextEntry: true,
            isValidUser: true,
            isValidPassword: true,
            isValidCode: true,
            loader: false,
            isError: false,
            errormsg: ""
          })
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
  };

  return (

   <View>

      <KeyboardAwareScrollView
        // style={{ backgroundColor: '#fffff' }}
        // resetScrollToCoords={{ x: 0, y: 0 }}
        // enableOnAndroid={true}
  enableAutomaticScroll={(Platform.OS === 'ios')}
        // contentContainerStyle={styles.container}
        // scrollEnabled={true}
      >
        <View style={styles.container}>
          <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
          <Image
            source={require("./../assets/images/circle.png")}
            style={styles.circle}
          />
          <Image
            source={require("./../assets/images/Logo.png")}
            style={styles.logo}
          />
          <View style={styles.header}>
            <Text style={styles.text_header}>Login</Text>
          </View>
          <View
            style={[
              styles.footer,
              {
                backgroundColor: "#D9D9D9",
                shadowColor: "#202020",
                shadowOffset: { width: 2, height: 2 },
                shadowRadius: 10,
              },
            ]}
          >
              {data.isError ? (
              <Text style={styles.apiError}> Incorrect Credentials</Text>
            ) : null}
            {data.loader ? <Loader size={"large"} /> : null}
            <Text style={styles.text_footer}>User ID</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Your User ID"
                placeholderTextColor="#666666"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.username}
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              />

              {data.check_textInputChange ? (
                <View>
                  <Feather name="check-circle" color="green" size={20} />
                </View>
              ) : null}
              <FontAwesome name="user-o" size={20} />
            </View>
            {data.isValidUser ? null : (
              <View>
                <Text style={styles.errorMsg}>
                  Please enter a valid email address.
                </Text>
              </View>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}
            >
              Password
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                value={data.password}
                secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {/* {data.isValidPassword ? null : (
              <View>
                <Text style={styles.errorMsg}>
                  {data.errormsg}
                </Text>
              </View>
            )} */}
            {/* <KeyboardAvoidingView> */}
            {/* <ScrollView> */}
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}
            >
              DSP Code
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Your DSP Code"
                placeholderTextColor="#666666"
                value={data.code}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handleDSPCodeChange(val)}
                onEndEditing={(e) => handleValidDSPCode(e.nativeEvent.text)}
              ></TextInput>

              {data.check_dspcodeChange ? (
                <View>
                  <Feather name="check-circle" color="green" size={20} />
                </View>
              ) : null}
              <FontAwesome name="vcard-o" size={20} />
            </View>
            {data.isValidCode ? null : (
              <View>
                <Text style={styles.errorMsg}>
                  DSP Code must be Alphabetic.
                </Text>
              </View>
            )}
            {/* </ScrollView> */}
            {/* </KeyboardAvoidingView> */}
            <TouchableOpacity>
              <Text
                style={{
                  color: "#146C94",
                  marginTop: 30,
                  textAlign: "right",
                  justifyContent: "flex-end",
                  // fontFamily: "inria serif",
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                disabled={
                  data.isValidCode && data.isValidPassword && data.isValidUser
                    ? false
                    : true
                }
                onPress={() => {
                  loginHandle(data.username, data.password);
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
                    Login
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{alignContent:'center', paddingBottom:3, paddingTop: 20, paddingLeft:60, flex:1, flexDirection:'row'}}>
        {/* <Text> Don't have an account?
        </Text> */}
        <Text> </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: "#146C94",
              marginBottom: 60,
              paddingHorizontal: 45
               }}
               onPress={() => {
                navigation.navigate('Authorise')
              }}
          >
            Not a registered user?
          </Text>
        </TouchableOpacity>
        </View>
            {/* </KeyboardAvoidingView> */}
          </View>
        </View>
      </KeyboardAwareScrollView>
   </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    // flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    marginLeft: 190,
    bottom: 50,
    width: 200,
    height: 50,
  },
  text_header: {
    color: "black",
    fontWeight: "normal",
    fontSize: 30,
    // fontFamily: "inria serif",
    paddingBottom: 60,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    // fontFamily: "inria serif",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    // fontFamily: "inria serif",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
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