import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet, Alert, ImageBackground, Image } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { openBrowserAsync } from "expo-web-browser";
import axios from "axios";
import { ACCOUNT_DEACTIVATE, CHECK_OUT_URL } from "../../constants/config";
// import { BackHandler, Alert } from 'react-native-back-handler';
// import asset from '../../../assets/'

const DrawerNav = createDrawerNavigator();

export function DrawerContentComponent({ navigation, route }) {
  let { responseData } = route.params;
  console.log(responseData, "Janani");
  let formData;
  let selectData = [];

  const deleteHandle = async () => {

    Alert.alert(
      "Delete",
      "Are you sure you want to delete your account?",
      [
        { text: "Yes", onPress: () => apiCall() }, 
        { text: "No" },
      ],
      { cancelable: false }
    );
    // let bodydata = {
    //     "DspCode": responseData.dspCode ,
    //     "userID": responseData.userID
    // }

  };


  const apiCall = async () => {
    
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url:
        ACCOUNT_DEACTIVATE +
        "?DspCode=" +
        responseData.dspCode +
        "&userID=" +
        responseData.userID,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer" + " " + responseData.bearerToken,
      },
      // data: bodydata,
    };

    console.log(config);

    axios.request(config).then((response) => {
      console.log(JSON.stringify(response.data));
      if (response.data.isSuccess) {
       
        Alert.alert(
          "",
          "Account Deleted Successfully",
        
        );

        navigation.navigate("Login")

        // navigation.navigate('Login')
        // setData({
        //   ...data,
        //   loader: false,
        //   isError: false,
        // });

        // formData = response.data.msg;
        console.log(formData);
      } else {
      }
    });
  }
  // return () => backHandler.remove();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: "white" }}
      >
        <ImageBackground
          source={require("../../../assets/menu-bg.jpg")}
          style={{ padding: 20 }}
        >
          <Image
            source={require("../../../assets/Profile.png")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontFamily: "",
              marginBottom: 5,
            }}
          >
            <Title style={styles.title}>
              {responseData.userFirstName} {responseData.userLastName}
            </Title>
          </Text>
          <View style={{ flexDirection: "row" }}>
            {/* <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>

            </Text> */}
            {/* <FontAwesome5 name="coins" size={14} color="#fff" /> */}
          </View>
        </ImageBackground>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              )}
              label="Home"
              onPress={() =>
                navigation.navigate({
                  name: "Tabs",
                  params: { responseData: responseData },
                })
              }
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-arrow-left"
                  color={color}
                  size={size}
                />
              )}
              label="Logout"
              onPress={() => {
                Alert.alert(
                  "Logout",
                  "Are you sure you want to log out?",
                  [
                    {
                      text: "Yes",
                      onPress: () => navigation.navigate("Login"),
                    },
                    { text: "No" },
                  ],
                  { cancelable: false }
                );
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-cancel"
                  color={color}
                  size={size}
                />
              )}
              label="Account Deletion"
              onPress={() => {
                deleteHandle();
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    // height: 200,
    // width: 50,

    padding: 10,
  },
  userInfoSection: {
    paddingLeft: 30,
    backgroundColor: "#146C94",
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    color: "white",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
