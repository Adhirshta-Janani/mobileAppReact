import React, { useEffect, useState } from "react";
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
  FlatList,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { RadioButton, useTheme } from "react-native-paper";
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import DatePicker from "react-native-date-picker";
import AppHeader from "../components/organisms/Appheader";
import axios from "axios";
import { CHECK_IN_RESPONSE, CHECK_IN_URL } from "../constants/config";
// import CheckBox from "react-native-elements/dist/checkbox/CheckBox";
import { SelectList } from 'react-native-dropdown-select-list'
import Loader from "../components/atom/loader";
import { CheckBox } from "@rneui/themed";
import { ScrollView } from "react-native-virtualized-view";
import MyComponent from "../components/organisms/radiobutton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import { CheckBox } from "react-native-elements";
//import Users from "../models/users";

const CheckInScreen = ({ navigation, route }) => {
  const [data, setData] = React.useState({
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    loader: false,
    isError: false,
    errorMsg : "Something went wrong, please try again",
    isResponseMsg: "", 
    isSuccess: false
  });

  // const [inputValue, setinputValue] = useState([]);

  const options = [
    {key:'1', value:'Yes'},
    {key:'2', value:'No'}
]

  let sampleData = []


  const [formData, setFormData] = useState(sampleData);

  let { responseData } = route.params;

  useEffect(() => {
    const backAction = () => {
      // Handle your exit logic here
      // For example, you can navigate to another screen
      navigation.navigate({
        name: "Landing",
        params: { responseData: responseData },
      });
      // backHandler.remove();
      return true; // Prevent default behavior (exit app)
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
  
    return () => backHandler.remove();
  }, []);

  const { colors } = useTheme();

  const getFormData = () => {
    setData({
      ...data,
      loader: true,
      isError: false,
    });

    let bodydata = JSON.stringify({
      dspcode: responseData.dspCode,
      userID: responseData.userID,
    });

    console.log(bodydata);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: CHECK_IN_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization" : "Bearer" + " " + responseData.bearerToken,
      },
      data: bodydata,
    };

    console.log(config)

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.length > 1) {
          setData({
            ...data,
            loader: false,
            isError: false,
          });

          sampleData = response.data;
          setFormData(sampleData)
          console.log(JSON.stringify(response.data));
          console.log(formData, "Test this");
        } else {
          console.log(response.data[0].result)
          setData({
            ...data,
            loader: false,
            isError: true,
            errorMsg: response.data[0].result
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
        Alert.alert("Error", error, [{ text: "Okay" }]); ///check this logic once again
      });
  };

  const checkInHandle = () => {
    setData({
      ...data,
      loader: true,
      isError: false,
    });

     formData.forEach(element => {
      element.dspcode = responseData.dspCode;
      element.userID = responseData.userID;
      element.answer = element.result
     });

    console.log(formData);

    let bodydata = JSON.stringify(formData)

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: CHECK_IN_RESPONSE,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization" : "Bearer" + " " + responseData.bearerToken,
      },
      data: bodydata,
    };

    console.log(config)

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.isSuccess ) {
          setData({
            ...data,
            loader: false,
            isError: false,
            isResponseMsg: 'Response Saved Successfully',
            isSuccess: true
          });
          setTimeout(() => { 
            // navigation.navigate("HomeScreen");
               navigation.navigate( { name: 'Landing',
            params: { responseData : responseData }});
        }, 2000); 
          // navigation.navigate( { name: 'DSPList',
          //   params: { responseData : responseData }});
        } else {
          setData({
            ...data,
            loader: false,
            isError: true,
            errorMsg: response.data.msg,
            isSuccess: false
          });
         
          setFormData([]);
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
        Alert.alert("Error", error, [{ text: "Okay" }]); ///check this logic once again
      });
  };



  const handleCheckIn = (val: string, index: number) => {
    console.log(sampleData);
  };

  const handleValidUser = (val: string, index: number) => {
    console.log(val, index, "check this.....")
    formData[index] = val;
  
    // 1. Make a shallow copy of the items
   
    };


  useEffect(getFormData, []);

  const getInputData = () => {
    return (
      <View>
         {/* <ScrollView> */}
        <FlatList
        removeClippedSubviews={false}
        // keyExtractor={item => item}
          data={formData}
          renderItem={({ item, index: fIndex }) => {
            return (
              <View>
              <Text    style={[
                styles.text_footer,
                {
                  marginTop: 20,
                },
              ]}>{item.question}</Text>
               {item.questionType == 'text' ? (   
                <View style={styles.action}> 
             <TextInput
              placeholder=""
              placeholderTextColor="#666666"
              style={styles.input}
              // value={item.result = "" ? }
              // autoCapitalize="none"
              // onFocus={() => {void(0)}}
              editable = {true}
              // value={[fIndex]}
              onChangeText={(val) => item.result = val }
              // onEndEditing={(e) => handleCheckIn(e.nativeEvent.text, fIndex)}
            />
              </View>)
          : null}

          {item.questionType == 'radio' ? ( 
    //   <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
    //   <CheckBox
    //     style={{ flex: 1 }}
    //     center
    //     title="Yes"
    //     checkedIcon="dot-circle-o"
    //     uncheckedIcon="circle-o"
    //     checked={item.checked == true}
    //     onPress={() =>
    //       {handleCheckIn(item.checked, fIndex)}
    //     }
    //   />
    //   <CheckBox
    //     style={{ flex: 1 }}
    //     center
    //     title="No"
    //     checkedIcon="dot-circle-o"
    //     uncheckedIcon="circle-o"
    //     checked={item.checked == false}
    //     onPress={() =>
    //       {handleCheckIn(item.checked, fIndex)}
    //     }
    //   />
    // </View>
    <SelectList
    boxStyles={styles.input}
    dropdownStyles={styles.selectboxinput}
    // inputStyles={styles.input}
    setSelected={(val) => item.result = val}
    data={options}
    save="value"
  />

      ) : null}
        </View>
            );
          }} //
        />
          {/* </ScrollView> */}
      </View>
    );
  };

  return (
    <>
    {/* <KeyboardAwareScrollView > */}

    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <AppHeader
        navigation={navigation}
        responseData={responseData}
        color="#146c94"
      />
      <View style={styles.header}></View>
      <ScrollView>
      {/* <KeyboardAwareScrollView > */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            shadowColor: "#202020",
            shadowOffset: { width: 2, height: 2 },
            shadowRadius: 10,
            marginBottom: 100,
            marginLeft: 20,
            marginRight: 20,
          },
        ]}
      >
        <View>
          <Image
            source={require("./../../assets/truck.png")}
            style={[
              styles.circle,
              {
                alignSelf: "center",
                width: 100,
                height: 100,
                marginTop: -20,
                marginBottom: -20,
              },
            ]}
          />
          <Text
            style={[
              styles.text_header,
              {
                paddingTop: -20,
                paddingBottom: 30,
              },
            ]}
          >
            Check-In Details{" "}
          </Text>
          {data.loader ? <Loader size={"large"} /> : null}
          {data.isSuccess ? (
              <Text style={styles.apiSuccess}>{data.isResponseMsg}</Text>
            )  : null}
        </View>
        {getInputData()}

        {data.isError ? (
              <Text style={styles.apiError}>{data.errorMsg}</Text>
            ) :  (<View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                checkInHandle();
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
                  Confirm
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>)}
      </View>
      </ScrollView>
      {/* </KeyboardAwareScrollView > */}

      
    </View>

    {/* </KeyboardAwareScrollView> */}
    </>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#146C94",
  },

  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingBottom: 20,
  },
  footer: {
    // flex: 2.5,
    justifyContent: "space-around",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  circle: {
    resizeMode: "contain",
    //marginLeft: -30,
    //bottom: 30,
    width: 200,
    height: 200,
    shadowColor: "#202020",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
  },
  // logo: {
  //   resizeMode: "contain",
  //   marginLeft: 180,
  //   bottom: 50,
  //   width: 200,
  //   height: 44,
  // },
  text_header: {
    color: "black",
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 25,
    // fontFamily: "inria serif",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    // fontFamily: "inria serif",
  },
  apiSuccess: {

    color : "#228B22",
    textAlign: 'center',
    // color: '#000000',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',

  },
  action: {
    // flexDirection: "row",
    marginTop: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
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
    marginTop: 55,
  },
  signIn: {
    width: 150,
    height: 50,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // paddingLeft: 20
    // left: 40,
  },
  apiError: {

    color : "#ff0000",
    textAlign: 'center',
    // color: '#000000',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlignVertical: 'center',
    // alignContent: 'center',

  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "normal",
    // fontFamily: "inria serif",
  },
  selectboxinput: {
    // height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 10,
  },
});

