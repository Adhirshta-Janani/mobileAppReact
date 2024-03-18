// import "react-native-gesture-handler";
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import SignInScreen from './src/screens/login';
import CheckInScreen from './src/screens/checkin';
import { View } from 'react-native';
// import DrawerContent from './src/components/organisms/Drawer';
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import DSPScoreCard from "./src/screens/dspscorecard";

// import { DrawerContent } from "@react-navigation/drawer";
import { DrawerContentComponent } from "./src/components/organisms/Drawer";
import AuthoriseScreen from './src/screens/authorise';
import OTPAuthorisation from './src/screens/otp';
import ScrollTabs from './src/components/atom/scrolltab';
import CheckOutScreen from './src/screens/checkout';
import SignUpScreen from './src/screens/signup';
import { StatusBar } from 'expo-status-bar';
import TermsandCondition from './src/screens/termsandcondition';
import FlatListComponent from './src/components/organisms/flatlist';
import ExpandableList from './src/screens/dspscorecard';
import AnimatedList from './src/components/organisms/animatedlist';
import DSPListView from './src/components/organisms/dropdown';
import ChatScreen from './src/components/organisms/chat';
import MessagesScreen from './src/components/organisms/chatlisting';
import ListingScreen from './src/screens/listingscreen';
import DocumentAttachment from './src/components/organisms/document_picker';
import MyComponent from './src/components/organisms/radiobutton';
import HomeScreen from './src/screens/homescreen';
import TabsComponents from './src/components/organisms/Tabs';
import HomeComponent from './src/screens/landingPage';
import { SideMenuComponent } from './src/components/organisms/sidemenu';
// import MyTabs from './src/components/organisms/Tabs';

const Stack = createNativeStackNavigator();

export default function App() {

  

  
  return (
    // // <SafeAreaProvider>
    // // <NavigationContainer>
    // <PaperProvider>
    //   <View>
    //   {/* <SignInScreen /> */}
    //   {/* <SignInScreen /> */}
    //   <Navigation />
    // </View>
    // </PaperProvider>
    // // </NavigationContainer>
    
    <PaperProvider>
      <StatusBar />
          {/* <DrawerContentComponent> */}
      {/* <DrawerContent state={undefined} navigation={undefined} descriptors={undefined}/> */}
    <NavigationContainer>

      {/* <DrawerContentComponent> */}
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen options={{headerShown: false}} name="ScrollTabs" component={ScrollTabs} />
      <Stack.Screen options={{headerShown: false}} name="Authorise" component={AuthoriseScreen} />
      <Stack.Screen options={{headerShown: false}} name="OTP" component={OTPAuthorisation} />
      <Stack.Screen options={{headerShown: false,gestureEnabled: false}} name="Landing" component={HomeComponent} />
      <Stack.Screen options={{headerShown: false,gestureEnabled: false}} name="SideMenu" component={SideMenuComponent} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="Login" component={SignInScreen} />
        <Stack.Screen options={{headerShown: false}} name="Attachment" component={DocumentAttachment} />
        <Stack.Screen options={{headerShown: false,gestureEnabled: false}} name="HomeScreen" component={HomeScreen} />
        {/* <Stack.Screen options={{headerShown: false, gestureEnabled: true}} name="Tabs" component={TabsComponents} /> */}
        <Stack.Screen options={{headerShown: false}} name="Drawer" component={DrawerContentComponent} />
        <Stack.Screen options={{headerShown: false}} name="CheckIn" component={CheckInScreen} />
        <Stack.Screen options={{headerShown: false}} name="CheckOut" component={CheckOutScreen} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="TermsandCondition" component={TermsandCondition} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="FlatList" component={FlatListComponent} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: true}} name="ExpandableList" component={ExpandableList} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: true}} name="AnimatedList" component={AnimatedList} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: true}} name="DSPList" component={DSPListView} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="ChatScreen" component={ChatScreen} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: true}} name="MessageListing" component={MessagesScreen} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: true}} name="ListingScreen" component={ListingScreen} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: true}} name="MyComponent" component={MyComponent} />
        <Stack.Screen options={{headerShown: false, gestureEnabled: true}} name="Tabs" component={TabsComponents} />
        
        
      </Stack.Navigator>
      
      {/* </DrawerContentComponent> */}
    </NavigationContainer>

    {/* <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}> */}
    {/* </View> */}
    </PaperProvider>

    

    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F1F1',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   scroll: {
//      height : 100
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });


