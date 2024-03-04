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
  ScrollView,
  BackHandler,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import DropDownPicker from "react-native-dropdown-picker";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import { RadioButton, useTheme } from "react-native-paper";
// import { CheckBox } from "react-native-elements";
import { CheckBox } from "@rneui/themed";
import AppHeader from "../components/organisms/Appheader";
import DocumentAttachment from "../components/organisms/document_picker";
import {
  CHECK_IN_CHECK_OUT_RESPONSE,
  CHECK_OUT_URL,
  DISPATCHER_URL,
} from "../constants/config";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import Loader from "../components/atom/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { openBrowserAsync } from 'expo-web-browser';
// import { ScrollView } from "react-native-virtualized-view";
// import { SelectList } from "react-native-dropdown-select-list";

const CheckOutScreen = ({ navigation, route }) => {
  let frontImage;
  let backImage;
  let rightImage;
  let leftImage;
  const [data, setData] = React.useState({
    dispatcherId: "",
    dispatchId: "",
    DispatchDate: "",
    dvic_pre_trip: false,
    dvic_pre_trip_reason: "",
    dvic_post_trip: false,
    dvic_post_trip_reason: "",
    //check with Suraj
    dispatcher_approved: false,
    report_break_on_ADP: false,
    report_break_on_ADP_reason: "",
    break_start_time: "",
    break_end_time: "",
    ////////////////////////////////
    gas: false,
    gas_reason: "",
    rts_package: "",
    rts_package_reason: "",
    meal_break: true,
    meal_break_reason: "",
    battery_pack: true,
    battery_pack_reason: "",
    flash_light: false,
    flash_light_reason: "",
    issue_report: "",
    workplace_injury: false,
    workplace_injury_reason: "",
    stc_rts_package_return_Approved: "",
    stc_rts_package_return_Approved_reason: "",
    vanfronImage: "",
    vanBackImage: "",
    vanLeftImage: "",
    vanRightImage: "",
    loader: false,
    isError: false,
    errorMsg: "",
  });

  let selectData = [];
  // let formData ;
  let formData ;

  const options = [
    { key: "1", value: "Yes" },
    { key: "2", value: "No" },
  ];

  // const [formDatas, setFormData] = React.useState(formData);
  const [dispatcherOption, setDispatcher] = React.useState(selectData);

  const { colors } = useTheme();

  let { responseData } = route.params;

  useEffect(() => {
    const backAction = () => {
      // Handle your exit logic here
      // For example, you can navigate to another screen
      navigation.navigate({
        name: "HomeScreen",
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

  const textInputChange = (val: string, id: string) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        // username: val,
        // check_textInputChange: true,
        // isValidUser: true,
      });
    } else {
      setData({
        ...data,
        // username: val,
        // check_textInputChange: false,
        // isValidUser: false,
      });
    }
  };

  const [yesChecked, setYesChecked] = React.useState(false);
  const [nochecked, setNoChecked] = React.useState(false);

  const handleValidUser = (val: string, id: string) => {
    var numbers = /[0-9]/g;
    if (val.match(numbers) || val == "") {
      setData({
        ...data,
        rts_package: val,
        isError: false,
        errorMsg: "",
      });
    } else {
      setData({
        ...data,
        rts_package: "",
        isError: true,
        errorMsg: "Only Numbers Allowed",
      });
    }
  };

  // const handleChecked = (id: string) => {
  //   var numbers = /[0-9]/g;
  //   if (val.match(numbers) || val == "") {
  //     setData({
  //       ...data,
  //       rts_package: val,
  //       isError: false,
  //       errorMsg: "",
  //     });
  //   } else {
  //     setData({
  //       ...data,
  //       rts_package: "",
  //       isError: true,
  //       errorMsg: "Only Numbers Allowed",
  //     });
  //   }
  // };

  // const getAddtionalData = () => {
  //   setData({
  //     ...data,
  //     loader: true,
  //     isError: false,
  //   });

  //   let bodydata = JSON.stringify({
  //     dspcode: responseData.dspCode,
  //     userID: responseData.userID,
  //   });

  //   console.log(bodydata);

  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: CHECK_OUT_URL,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: "Bearer" + " " + responseData.bearerToken,
  //     },
  //     data: bodydata,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       if (
  //         response.data[0].result != "Dispatch sheet not availble for today." &&
  //         response.data[0].result != "No route allocated today." &&
  //         response.data[0].result != "You have already checked out."
  //       ) {
  //         setData({
  //           ...data,
  //           loader: false,
  //           isError: false,
  //         });

  //         formData = response.data;
  //         setFormData(formData);
  //         console.log(JSON.stringify(response.data));
  //         console.log(formDatas, "Test this");
  //       } else {
  //         setData({
  //           ...data,
  //           loader: false,
  //           isError: true,
  //         });
  //         // Alert.alert("Wrong Input!", "Incorrect Credentials", [
  //         //   { text: "Okay" },
  //         // ]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setData({
  //         ...data,
  //         loader: false,
  //       });
  //       Alert.alert("Error", error, [{ text: "Okay" }]); ///check this logic once again
  //     });
  // };

  const getAddtionalData = () => {
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
      url: CHECK_OUT_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer" + " " + responseData.bearerToken,
      },
      data: bodydata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.isSuccess) {
          setData({
            ...data,
            loader: false,
            isError: false,
          });

          formData = response.data.msg;
          // setFormData(formData);
          console.log(JSON.stringify(response.data));
          console.log(formData, "Test this");
        } else {
          setData({
            ...data,
            loader: false,
            isError: true,
            errorMsg: response.data.msg
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

  const checkoutRedirect = async () => {
    try {
      const result = await fetch(formData, {
        // method: "GET",
      });
      const data = await result.json();
      // setProfileData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };


  const handleCheckOut = async () => {
    // setData({
    //   ...data,
    //   loader: true,
    //   isError: false,
    // });

    // let bodydata = JSON.stringify({
    //   driverID: responseData.userID,
    //   dispatcherId: data.dispatcherId,
    //   dispatchId: formDatas[0].dispatchID,
    //   DispatchDate: formDatas[0].dispatchDate,
    //   stc_dvic_post_trip: data.dvic_post_trip ? "yes" : "no",
    //   stc_dvic_post_trip_reason: data.dvic_post_trip_reason,
    //   stc_dvic_pre_trip: data.dvic_pre_trip ? "yes" : "no",
    //   stc_dvic_pre_trip_reason: data.dvic_pre_trip_reason,
    //   stc_gas_up: data.gas ? "yes" : "no",
    //   stc_gas_up_reason: data.gas_reason,
    //   stc_rts_package_number: data.rts_package,
    //   stc_rts_package_number_reason: data.rts_package_reason,
    //   stc_meal_time: data.break_start_time + "-" + data.break_end_time,
    //   stc_meal_time_reason: data.meal_break_reason,
    //   stc_battery_pack: data.battery_pack ? "yes" : "no",
    //   stc_battery_pack_reason: data.battery_pack_reason,
    //   stc_flash_light: data.flash_light ? "yes" : "no",
    //   stc_flash_light_reason: data.flash_light_reason,
    //   stc_issue: data.issue_report,
    //   stc_issue_reason: "",
    //   stc_workplace_injury: data.workplace_injury ? "yes" : "no",
    //   stc_workplace_injury_reason: data.workplace_injury_reason,
    //   dspCode: responseData.dspCode,
    //   stc_rts_package_return_Approved: data.dispatcher_approved ? "yes" : "no",
    //   stc_rts_package_return_Approved_reason: data.rts_package_reason,
    //   report_break_on_ADP: data.report_break_on_ADP ? "yes" : "no",
    //   report_break_on_ADP_reason: data.report_break_on_ADP_reason,
    //   break_start_time: data.break_start_time,
    //   break_end_time: data.break_end_time,
    //   dispatcher_approved: data.dispatcher_approved ? "yes" : "no",
    //   CheckOutquestionsAns: formDatas,
    //   vanfronImage: frontImage,
    //   vanBackImage: backImage,
    //   vanLeftImage: leftImage,
    //   vanRightImage: rightImage,
    // });

    // console.log(bodydata);

    // let config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: CHECK_IN_CHECK_OUT_RESPONSE,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: "Bearer" + " " + responseData.bearerToken,
    //   },
    //   data: bodydata,
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //     if (
    //       response.data.isSuccess &&
    //       response.data.msg != "You have already checked out."
    //     ) {
    //       setData({
    //         ...data,
    //         loader: false,
    //         isError: false,
    //       });

    //       navigation.navigate({
    //         name: "DSPList",
    //         params: { responseData: responseData },
    //       });
    //     } else {
    //       setData({
    //         ...data,
    //         loader: false,
    //         isError: true,
    //         errorMsg: response.data.msg,
    //       });
    //       // Alert.alert("Wrong Input!", "Incorrect Credentials", [
    //       //   { text: "Okay" },
    //       // ]);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setData({
    //       ...data,
    //       loader: false,
    //     });
    //     Alert.alert("Error", error, [{ text: "Okay" }]); ///check this logic once again
    //   });
    let bodydata = JSON.stringify({
      dspcode: responseData.dspCode,
      userID: responseData.userID,
    });

    console.log(bodydata);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: CHECK_OUT_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer" + " " + responseData.bearerToken,
      },
      data: bodydata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.isSuccess) {
          setData({
            ...data,
            loader: false,
            isError: false,
          });

          formData = response.data.msg;
    console.log(formData);
    openBrowserAsync(formData)
  }
})

        
  };

  const dispatcherData = () => {
    setData({
      ...data,
      loader: true,
      isError: false,
    });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: DISPATCHER_URL + responseData.dspCode,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer" + " " + responseData.bearerToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.length) {
          setData({
            ...data,
            loader: false,
            isError: false,
          });
          let dispatcherData;
          response.data.forEach((element) => {
            dispatcherData = {
              key: element.dispatcherID,
              value: element.dispatcherName,
            };
            selectData.push(dispatcherData);
          });

          // selectData = response.data;
          setDispatcher(selectData);
          console.log(JSON.stringify(response.data));
          console.log(selectData, "Test this");
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
        Alert.alert("Error", error, [{ text: "Okay" }]); ///check this logic once again
      });
  };

  const getSelectBox = () => {
    return (
      <SelectList
        boxStyles={styles.input}
        dropdownStyles={styles.selectboxinput}
        // inputStyles={styles.input}
        setSelected={(val) => setData({ ...data, dispatcherId: val })}
        data={dispatcherOption}
        save="key"
      />
    );
  };



  useEffect(getAddtionalData, []);
  // useEffect(dispatcherData, []);

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        responseData={responseData}
        color="#146C94"
      />
      <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
      <View style={styles.header}></View>
      <ScrollView>
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
                  marginTop: -45,
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
              Check-Out Details{" "}
            </Text>
          </View>
          {data.loader ? <Loader size={"large"} /> : null}
          {data.isError && data.errorMsg != "Only Numbers Allowed" ? (
            <Text style={styles.apiError}>{data.errorMsg}</Text>
          ) : (
            <>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {
                    handleCheckOut();
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
                      Checkout
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
            // <>
            // <Text style={styles.text_footer}>
            //   Did you complete DVIC PRE Trip?
            // </Text>
            // <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="Yes"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.dvic_pre_trip == true}
            //     onPress={() =>
            //       setData({ ...data, dvic_pre_trip: !data.dvic_pre_trip })
            //     }
            //   />
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="No"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.dvic_pre_trip == false}
            //     onPress={() =>
            //       setData({ ...data, dvic_pre_trip: !data.dvic_pre_trip })
            //     }
            //   />
            // </View>
            // {!data.dvic_pre_trip ? (
            //   <>
            //     <Text
            //       style={[
            //         styles.text_footer,
            //         {
            //           marginTop: 5,
            //         },
            //       ]}
            //     >
            //       Why?
            //     </Text>
            //     <View style={styles.action}>
            //       <TextInput
            //         placeholder=""
            //         placeholderTextColor="#666666"
            //         style={styles.input}
            //         autoCapitalize="none"
            //         onChangeText={(val) =>
            //           setData({ ...data, dvic_pre_trip_reason: val })
            //         }
            //         // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //       />
            //     </View>
            //   </>
            // ) : null}
            // <Text style={styles.text_footer}>
            //   Did you complete DVIC POST Trip?
            // </Text>
            // <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="Yes"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.dvic_post_trip == true}
            //     onPress={() =>
            //       setData({ ...data, dvic_post_trip: !data.dvic_post_trip })
            //     }
            //   />
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="No"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.dvic_post_trip == false}
            //     onPress={() =>
            //       setData({ ...data, dvic_post_trip: !data.dvic_post_trip })
            //     }
            //   />
            // </View>
            // {!data.dvic_post_trip ? (
            //   <>
            //     <Text
            //       style={[
            //         styles.text_footer,
            //         {
            //           marginTop: 5,
            //         },
            //       ]}
            //     >
            //       Why?
            //     </Text>
            //     <View style={styles.action}>
            //       <TextInput
            //         placeholder=""
            //         placeholderTextColor="#666666"
            //         style={styles.input}
            //         autoCapitalize="none"
            //         onChangeText={(val) =>
            //           setData({ ...data, dvic_post_trip_reason: val })
            //         }
            //         // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //       />
            //     </View>
            //   </>
            // ) : null}
            // <Text style={styles.text_footer}>Did you Gas up your van today?</Text>
            // <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="Yes"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.gas == true}
            //     onPress={() => setData({ ...data, gas: !data.gas })}
            //   />
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="No"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.gas == false}
            //     onPress={() => setData({ ...data, gas: !data.gas })}
            //   />
            // </View>
            // {!data.gas ? (
            //   <>
            //     <Text
            //       style={[
            //         styles.text_footer,
            //         {
            //           marginTop: 5,
            //         },
            //       ]}
            //     >
            //       Why?
            //     </Text>
            //     <View style={styles.action}>
            //       <TextInput
            //         placeholder=""
            //         placeholderTextColor="#666666"
            //         style={styles.input}
            //         autoCapitalize="none"
            //         onChangeText={(val) => setData({ ...data, gas_reason: val })}
            //         // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //       />
            //     </View>
            //   </>
            // ) : null}
            // <Text
            //   style={[
            //     styles.text_footer,
            //     {
            //       marginTop: 5,
            //     },
            //   ]}
            // >
            //   How many packages did you RTS Today?
            // </Text>
            // <View style={styles.action}>
            //   <TextInput
            //     placeholder=""
            //     value={data.rts_package}
            //     placeholderTextColor="#666666"
            //     style={styles.input}
            //     autoCapitalize="none"
            //     onChangeText={(val) => handleValidUser(val, "")}
            //     // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //   />
            //   {data.isError ? (
            //     <View>
            //       <Text style={styles.errorMsg}>{data.errorMsg}</Text>
            //     </View>
            //   ) : null}
            // </View>
            // {data.rts_package === "0" || data.rts_package === "" ? null : (
            //   <>
            //     <Text style={styles.text_footer}>
            //       Was the return approved by Dispatcher?
            //     </Text>
            //     {/* { data.rts_package = 0 ?() :null} */}
            //     <View
            //       style={{ flexDirection: "row", justifyContent: "flex-start" }}
            //     >
            //       <CheckBox
            //         style={{ flex: 1 }}
            //         center
            //         title="Yes"
            //         checkedIcon="dot-circle-o"
            //         uncheckedIcon="circle-o"
            //         checked={data.dispatcher_approved == true}
            //         onPress={() =>
            //           setData({
            //             ...data,
            //             dispatcher_approved: !data.dispatcher_approved,
            //           })
            //         }
            //       />
            //       <CheckBox
            //         style={{ flex: 1 }}
            //         center
            //         title="No"
            //         checkedIcon="dot-circle-o"
            //         uncheckedIcon="circle-o"
            //         checked={data.dispatcher_approved == false}
            //         onPress={() =>
            //           setData({
            //             ...data,
            //             dispatcher_approved: !data.dispatcher_approved,
            //           })
            //         }
            //       />
            //     </View>
            //     {data.dispatcher_approved ? (
            //       <>
            //         <Text
            //           style={[
            //             styles.text_footer,
            //             {
            //               marginTop: 5,
            //             },
            //           ]}
            //         >
            //           Select Dispatcher
            //         </Text>
            //         {/* <View style={styles.action}>
            //       <TextInput
            //         placeholder=""
            //         placeholderTextColor="#666666"
            //         style={styles.input}
            //         autoCapitalize="none"
            //         onChangeText={(val) =>
            //           setData({ ...data, dispatcherId: val })
            //         }
            //         // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //       />
            //     </View> */}
            //         <View style={styles.action}>{getSelectBox()}</View>
            //       </>
            //     ) : (
            //       <>
            //         <Text
            //           style={[
            //             styles.text_footer,
            //             {
            //               marginTop: 5,
            //             },
            //           ]}
            //         >
            //           Why?
            //         </Text>
            //         <View style={styles.action}>
            //           <TextInput
            //             placeholder=""
            //             placeholderTextColor="#666666"
            //             style={styles.input}
            //             autoCapitalize="none"
            //             onChangeText={(val) =>
            //               setData({ ...data, rts_package_reason: val })
            //             }
            //             // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //           />
            //         </View>
            //       </>
            //     )}
            //   </>
            // )}
            // <Text style={styles.text_footer}>
            //   Meal break time. Did you take a meal break?
            // </Text>
            // <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="Yes"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.meal_break == true}
            //     onPress={() => setData({ ...data, meal_break: !data.meal_break })}
            //   />
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="No"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.meal_break == false}
            //     onPress={() => setData({ ...data, meal_break: !data.meal_break })}
            //   />
            // </View>
            // {!data.meal_break ? (
            //   <>
            //     <Text
            //       style={[
            //         styles.text_footer,
            //         {
            //           marginTop: 5,
            //         },
            //       ]}
            //     >
            //       Why?
            //     </Text>
            //     <View style={styles.action}>
            //       <TextInput
            //         placeholder=""
            //         placeholderTextColor="#666666"
            //         style={styles.input}
            //         autoCapitalize="none"
            //         onChangeText={(val) =>
            //           setData({ ...data, meal_break_reason: val })
            //         }
            //         // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //       />
            //     </View>
            //   </>
            // ) : (
            //   <>
            //     <Text style={styles.text_footer}>
            //       Did you report the break on ADP?
            //     </Text>
            //     <View
            //       style={{ flexDirection: "row", justifyContent: "flex-start" }}
            //     >
            //       <CheckBox
            //         style={{ flex: 1 }}
            //         center
            //         title="Yes"
            //         checkedIcon="dot-circle-o"
            //         uncheckedIcon="circle-o"
            //         checked={data.report_break_on_ADP == true}
            //         onPress={() =>
            //           setData({
            //             ...data,
            //             report_break_on_ADP: !data.report_break_on_ADP,
            //           })
            //         }
            //       />
            //       <CheckBox
            //         style={{ flex: 1 }}
            //         center
            //         title="No"
            //         checkedIcon="dot-circle-o"
            //         uncheckedIcon="circle-o"
            //         checked={data.report_break_on_ADP == false}
            //         onPress={() =>
            //           setData({
            //             ...data,
            //             report_break_on_ADP: !data.report_break_on_ADP,
            //           })
            //         }
            //       />
            //     </View>
            //     {!data.report_break_on_ADP ? (
            //       <>
            //         <Text
            //           style={[
            //             styles.text_footer,
            //             {
            //               marginTop: 5,
            //             },
            //           ]}
            //         >
            //           Why?
            //         </Text>
            //         <View style={styles.action}>
            //           <TextInput
            //             placeholder=""
            //             placeholderTextColor="#666666"
            //             style={styles.input}
            //             autoCapitalize="none"
            //             onChangeText={(val) =>
            //               setData({ ...data, report_break_on_ADP_reason: val })
            //             }
            //             // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //           />
            //         </View>
            //         <Text
            //           style={[
            //             styles.text_footer,
            //             {
            //               marginTop: 5,
            //             },
            //           ]}
            //         >
            //           Break Start Time
            //         </Text>
            //         <View style={styles.action}>
            //           <TextInput
            //             placeholder=""
            //             placeholderTextColor="#666666"
            //             style={styles.input}
            //             autoCapitalize="none"
            //             onChangeText={(val) =>
            //               setData({ ...data, break_start_time: val })
            //             }
            //             // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //           />
            //         </View>
            //         <Text
            //           style={[
            //             styles.text_footer,
            //             {
            //               marginTop: 5,
            //             },
            //           ]}
            //         >
            //           Break End Time
            //         </Text>
            //         <View style={styles.action}>
            //           <TextInput
            //             placeholder=""
            //             placeholderTextColor="#666666"
            //             style={styles.input}
            //             autoCapitalize="none"
            //             onChangeText={(val) =>
            //               setData({ ...data, break_end_time: val })
            //             }
            //             // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //           />
            //         </View>
            //       </>
            //     ) : null}
            //   </>
            // )}
            // <Text style={styles.text_footer}>Battery Pack?</Text>
            // <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="Yes"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.battery_pack == true}
            //     onPress={() =>
            //       setData({ ...data, battery_pack: !data.battery_pack })
            //     }
            //   />
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="No"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.battery_pack == false}
            //     onPress={() =>
            //       setData({ ...data, battery_pack: !data.battery_pack })
            //     }
            //   />
            // </View>
            // {!data.battery_pack ? (
            //   <>
            //     <Text
            //       style={[
            //         styles.text_footer,
            //         {
            //           marginTop: 5,
            //         },
            //       ]}
            //     >
            //       Why?
            //     </Text>
            //     <View style={styles.action}>
            //       <TextInput
            //         placeholder=""
            //         placeholderTextColor="#666666"
            //         style={styles.input}
            //         autoCapitalize="none"
            //         onChangeText={(val) =>
            //           setData({ ...data, battery_pack_reason: val })
            //         }
            //         // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //       />
            //     </View>
            //   </>
            // ) : null}
            // <Text style={styles.text_footer}>Flash Light?</Text>
            // <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="Yes"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.flash_light == true}
            //     onPress={() =>
            //       setData({ ...data, flash_light: !data.flash_light })
            //     }
            //   />
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="No"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.flash_light == false}
            //     onPress={() =>
            //       setData({ ...data, flash_light: !data.flash_light })
            //     }
            //   />
            // </View>
            // {!data.flash_light ? (
            //   <>
            //     <Text
            //       style={[
            //         styles.text_footer,
            //         {
            //           marginTop: 5,
            //         },
            //       ]}
            //     >
            //       Why?
            //     </Text>
            //     <View style={styles.action}>
            //       <TextInput
            //         placeholder=""
            //         placeholderTextColor="#666666"
            //         style={styles.input}
            //         autoCapitalize="none"
            //         onChangeText={(val) =>
            //           setData({ ...data, flash_light_reason: val })
            //         }
            //         // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //       />
            //     </View>
            //   </>
            // ) : null}
            // <Text
            //   style={[
            //     styles.text_footer,
            //     {
            //       marginTop: 5,
            //     },
            //   ]}
            // >
            //   Do you need to report any issue on the route today(Phone, Van,
            //   Incident or any other details that can help us make your delivery
            //   experience better)?
            // </Text>
            // <View style={styles.action}>
            //   <TextInput
            //     placeholder=""
            //     placeholderTextColor="#666666"
            //     style={styles.input}
            //     autoCapitalize="none"
            //     onChangeText={(val) => setData({ ...data, issue_report: val })}
            //     // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //   />
            // </View>
            // <Text style={styles.text_footer}>
            //   Did any Workplace Injury/ Incident happen today?
            // </Text>
            // <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="Yes"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.workplace_injury == true}
            //     onPress={() =>
            //       setData({ ...data, workplace_injury: !data.workplace_injury })
            //     }
            //   />
            //   <CheckBox
            //     style={{ flex: 1 }}
            //     center
            //     title="No"
            //     checkedIcon="dot-circle-o"
            //     uncheckedIcon="circle-o"
            //     checked={data.workplace_injury == false}
            //     onPress={() =>
            //       setData({ ...data, workplace_injury: !data.workplace_injury })
            //     }
            //   />
            // </View>
            // {data.workplace_injury ? (
            //   <>
            //     <Text
            //       style={[
            //         styles.text_footer,
            //         {
            //           marginTop: 5,
            //         },
            //       ]}
            //     >
            //       Injury / Incident Description
            //     </Text>
            //     <View style={styles.action}>
            //       <TextInput
            //         placeholder=""
            //         placeholderTextColor="#666666"
            //         style={styles.input}
            //         autoCapitalize="none"
            //         onChangeText={(val) =>
            //           setData({ ...data, workplace_injury_reason: val })
            //         }
            //         // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            //       />
            //     </View>
            //   </>
            // ) : null}
            // {getAddtionalFormData()}
            // <DocumentAttachment imageText={"Van Front Image"} />
            // <DocumentAttachment imageText={"Van Back Image"} />
            // <DocumentAttachment imageText={"Van Right Image"} />
            // <DocumentAttachment imageText={"Van Left Image"} />
            // <View style={styles.button}>
            //   <TouchableOpacity
            //     style={styles.signIn}
            //     onPress={() => {
            //       checkoutHandle();
            //     }}
            //   >
            //     <LinearGradient
            //       colors={["#146C94", "#082B3B"]}
            //       style={styles.signIn}
            //     >
            //       <Text
            //         style={[
            //           styles.textSign,
            //           {
            //             color: "#fff",
            //           },
            //         ]}
            //       >
            //         Confirm
            //       </Text>
            //     </LinearGradient>
            //   </TouchableOpacity>
            // </View>
            // </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckOutScreen;

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
    //paddingBottom: 20,
  },
  footer: {
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
  //   marginLeft: 200,
  //   // marginBottom:0,
  //   bottom: 25,
  //   width: 200,
  //   height: 44,
  // },
  text_header: {
    color: "black",
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 25,
    // marginBottom:0,
    // fontFamily: "inria serif",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    paddingLeft: 5,
    // fontFamily: "inria serif",
  },
  action: {
    // flexDirection: "row",
    marginTop: 5,
    paddingBottom: 20,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
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
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  apiError: {
    color: "#ff0000",
    textAlign: "center",
    // color: '#000000',
    // alignSelf: "center",
    // justifyContent: "center",
    // alignItems: "center",
    // textAlignVertical: "center",
    // alignContent: "center",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 10,
  },
  selectboxinput: {
    // height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "normal",
    // fontFamily: "inria serif",
  },
  label: {
    // margin: 8,
  },
});
