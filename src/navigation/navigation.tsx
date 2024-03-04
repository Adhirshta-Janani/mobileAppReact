import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './../screens/login';
// import HomeScreen from '../screens/HomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import DSPScoreCard from '../screens/dspscorecard';
// import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  // const {} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DSP SCoreCard">
        {/* {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.access_token ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <> */}
            <Stack.Screen
              name="Login"
              component={SignInScreen}
              // options={{headerShown: false}}
            />
            <Stack.Screen
              name="DSP SCoreCard"
              component={DSPScoreCard}
              // options={{headerShown: false}}
            />
          {/* </> */} 
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;