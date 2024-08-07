import * as React from 'react';
import { BottomNavigation, Provider, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import HomeScreen from '../../screens/homescreen';
import DSPListView from './dropdown';
import CheckInScreen from '../../screens/checkin';
import CheckOutScreen from '../../screens/checkout';
import MessagesScreen from './chatlisting';
import HomeComponent from '../../screens/landingPage';



const TabsComponents = ({navigation, route}) => {
  const MusicRoute = () =>  <HomeComponent navigation={navigation} route={route}/>

const AlbumsRoute = () =>  <DSPListView navigation={navigation} route={route}/>

const RecentsRoute = () =>  <CheckInScreen navigation={navigation} route={route}/>

const ChatRoute = () =>  <MessagesScreen navigation={navigation} route={route}/>

const [dataLoaded, setDataLoaded] = React.useState(false);

const NotificationsRoute = () => <CheckOutScreen navigation={navigation} route={route}/>
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Home', focusedIcon: 'home'},
    { key: 'albums', title: 'Metrics', focusedIcon: 'seal' },
    { key: 'recents', title: 'Check In', focusedIcon: 'calendar-check-outline' },
    { key: 'notifications', title: 'Check Out', focusedIcon: 'history' },
    { key: 'chat', title: 'Chat', focusedIcon: 'chat-alert', unfocusedIcon: 'chat' },
  ]);

//  const renderScene = ({ route }) => {
//     switch (route.key) {
//       case 'music':
//         return MusicRoute;
//       case 'albums':
//         return AlbumsRoute;
//     }
//   }

let renderScene ;

if(route.userLoginType == "Driver" && route.checkoutShow == "NoShow"){

  renderScene = 
  BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    // recents: RecentsRoute,
    notifications: NotificationsRoute,
    chat: ChatRoute
  });

}

else if(route.userLoginType == "Driver" && route.checkoutShow != "NoShow"){

  renderScene = 
  BottomNavigation.SceneMap({
    music: MusicRoute,
    chat: ChatRoute
  });

}

else if(route.userLoginType != "Driver"){

  renderScene = 
  BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
    chat: ChatRoute
  });

}



  return (
    // <Provider theme={{ ...theme, colors: { ...theme.colors, secondaryContainer: "<your-color>" } }}>
    // <BottomNavigation
    //   navigationState={{ index, routes }}
    //   onIndexChange={setIndex}
    //   renderScene={renderScene}
    
    //   theme={{colors: {secondaryContainer: '#146C94', background: '#FFFFFF'}}}
    // />

  //   <BottomNavigation
  //   navigationState={{ index, routes }}
  //   onIndexChange={setIndex}
  //   renderScene={renderScene}
  //   theme={{
  //     colors: {
  //       secondaryContainer:  '#146C94', // Change icon color based on dataLoaded state
  //       background: 'white',
  //     },
  //   }}
  // />
  //   // </Provider>
  // );

  <Provider
  theme={{
    colors: { secondaryContainer: '#FFFFFF', background: '#FFFFFF' }, // Adjust theme as needed
  }}
>
  <BottomNavigation
    navigationState={{ index, routes }}
    onIndexChange={setIndex}
    renderScene={renderScene}
    barStyle={{ backgroundColor: '#146C94' }} // Set tab bar background color
    activeColor="#146C94" // Set active tab icon AND text color to white
    inactiveColor="#fff" // Set inactive tab icon color (light gray)
  />
</Provider>
  )
};

export default TabsComponents;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F1F1',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import CheckInScreen from '../../screens/checkin';
// import ListingScreen from '../../screens/listingscreen';

// const Tab = createBottomTabNavigator();

// const TabsComponents = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Check-In" component={CheckInScreen}  />
//       {/* <Tab.Screen name="CheckOut" component={CheckOut} /> */}
//       <Tab.Screen name="Chat" component={ListingScreen} />
//     </Tab.Navigator>
//   );
// };

// export default TabsComponents;