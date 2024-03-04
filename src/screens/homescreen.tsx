import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  StatusBar,
  Alert,
  BackHandler
} from "react-native";
// import Logo from "./assets/Logo.png";
import Card from "./../components/atom/cards";
import {LinearGradient} from 'expo-linear-gradient';
import AppHeader from "../components/organisms/Appheader";
import { useNavigation } from "@react-navigation/native";
// import { Card } from "react-native-paper";

const HomeScreen = ({ navigation, route }) => {

    let { responseData } = route.params;

  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  // const navigations = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = navigations.addListener('beforeRemove', (e) => {
  //     // Prevent default behavior of back button press
  //     e.preventDefault();
      
  //     // Handle the back button press here
  //     // For example:
  //     console.log('Back button pressed!',  navigations.isFocused());0
  
  //     // Add event listener for hardware back button press
    
  //     // Navigate to a different screen, or perform any other action
      
  //     // Return false to indicate that the back button press is not handled by the navigation system
  //     return false;
  //   });

  //   // Clean up the listener when the component is unmounted
  //   return unsubscribe;
  // }, [navigations]);

  useEffect(() => {
    const backAction = () => {
      // Handle your exit logic here
      // For example, you can navigate to another screen
      // navigation.navigate('');
      BackHandler.exitApp();
      // backHandler.remove();
      return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  
    return (
        <>
        <AppHeader navigation={navigation} responseData={responseData} color= "#146C94"/>
      <View style={styles.container}>
      
      <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
        <View style={[styles.middleContainer1,
        {
        //   paddingRight:150,
        },
        ]}>
          <Text style={styles.h1}>Hi {responseData.userFirstName}</Text>
        </View>
        
      
        <View style={[styles.middleContainer2,
        {
          bottom:60,
        },
        ]}>
        

        <Card style={styles.card}>
            
            <Text style={styles.content}> Your Performance </Text>
                    
        </Card> 

         <View style={[styles.middleContainer2,
         {
           flexDirection: "row" ,
          justifyContent: 'space-evenly' 
         },
         ]}>
    
          <View style={styles.middleContainer2}>
          
      
            <Card style={styles.card1}>
            {/* <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{padding: 15, alignItems: 'center'}}> */}
              <Text style={styles.content}> You have already checked In </Text>
            {/* </LinearGradient>         */}
            </Card>
            
          </View> 
          

          <View style={styles.middleContainer2}>
            <Card style={styles.card1}>
            
              <Text style={styles.content}> Your shift ends in 05:00:00 hrs </Text>

            </Card>
          </View> 

        </View>
       
      </View>
    
  </View>
  </>
    );
  }

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    width: '100%',
  },
  h1: {
    color: '#000000',
    fontSize: 40,
  },
  content:{
    color:"#ffffff", 
    fontSize:20,
    textAlign:'auto',
  },

image: {
  width: 300,
  height: 200,
  justifyContent: 'center',
  resizeMode:'contain',
},
// icon:{
//   width: 100,
//   height: 100,
//   justifyContent: 'center',
//   resizeMode:'contain',
// },

// buttonContainer: {
//   backgroundColor: '#f2f2f2',
//   borderRadius: 5,
//   padding: 8,
//   margin: 8,
// },

topContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
middleContainer1: {
  flex: 1,
  justifyContent: 'center',
//   alignItems: 'left',

},
middleContainer2: {
  flex: 3,
  justifyContent: 'flex-start',
  alignItems: 'center',
},
// bottomContainer: {
//   flex:3,
//   justifyContent: 'flex-end',
//   width: '90%',
//   margin: 20,
//   padding: 10,
// },
card: {
    height: 200,
    width: 350,
    backgroundColor: '#146C94',
    justifyContent: 'center', //Centered vertically
    // alignItems: 'center', // Centered horizontally
  },
  card1: {
    height: 250,
    width: 150,
    backgroundColor: '#146C94',
    justifyContent: 'center', //Centered vertically
    // alignItems: 'center', // Centered horizontally
  },
});
