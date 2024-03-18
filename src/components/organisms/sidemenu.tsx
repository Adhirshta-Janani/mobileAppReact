import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet, Alert } from "react-native";
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
import { openBrowserAsync } from 'expo-web-browser';
import axios from "axios";
import { CHECK_OUT_URL } from "../../constants/config";

const DrawerNav = createDrawerNavigator();

export function SideMenuComponent({ navigation, route }) {
  let { responseData } = route.params;
  let formData ;
  let selectData = [];

  
  const handleCheckOut = async () => {
    
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
          // setData({
          //   ...data,
          //   loader: false,
          //   isError: false,
          // });

          formData = response.data.msg;
    console.log(formData);
    openBrowserAsync(formData)
  }
})

        
  };

    // return () => backHandler.remove();


  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContent}>
        {/* <View style={styles.userInfoSection}>
          <Avatar.Image
            size={100}
            source={require("../../../assets/menu.png")}
          />
          <Title style={styles.title}>
            {responseData.userFirstName} {responseData.userLastName}
          </Title>
        </View> */}
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Home"
            onPress={() =>  navigation.navigate({
              name: "Landing",
              params: { responseData: responseData },
            })
            }
          />
          {responseData.userLoginType == "Driver" ? (
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="seal" color={color} size={size} />
                // <Image />
              )}
              // icon= "../../../assets/DSPScoreCard.png"
              label={responseData.userFirstName + " ScoreCard"}
              onPress={() => {
                navigation.navigate({
                  name: "DSPList",
                  params: { responseData: responseData },
                });
              }}
            />
          ) : null}
          {responseData.userLoginType == "Driver" ? (
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar-check"
                  color={color}
                  size={size}
                />
              )}
              label="Check In"
              // onPress={() => {navigation.navigate('CheckIn')}}
              onPress={() => {
                navigation.navigate({
                  name: "CheckIn",
                  params: { responseData: responseData },
                });
              }}
            />
          ) : null}
          {responseData.userLoginType == "Driver" ? (
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar-arrow-left"
                  color={color}
                  size={size}
                />
              )}
              label="Check Out"
              // onPress={() => {navigation.navigate('CheckOut')}}
              // handleCheckOut
              onPress={() => {
                navigation.navigate({
                  name: "CheckOut",
                  params: { responseData: responseData },
                });
              }}
            />
          ) : null}

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="chat" color={color} size={size} />
            )}
            label="Chat"
            // onPress={() => {navigation.navigate('CheckOut')}}
            onPress={() => {
              navigation.navigate({
                name: "ListingScreen",
                params: { responseData: responseData },
              });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Logout"
            onPress={() => {
              navigation.navigate("Login");}
            }
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    // height: 200,
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
