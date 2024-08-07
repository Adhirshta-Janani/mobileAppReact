import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { openBrowserAsync } from 'expo-web-browser';
import axios from "axios";
import {StyleSheet, Alert } from "react-native";
// import * as ""




import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <ImageBackground
          source={require('./../../assets/menu-bg.jpg')} 
          style={{padding: 20}}>
          <Image
            source={require('../assets/images/user-profile.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: '',
              marginBottom: 5,
            }}>
            John Doe
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              280 Coins
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          {/* <DrawerItemList {...props} /> */}
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
                name="account-arrow-left"
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
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: '',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: '',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  

export default CustomDrawer;