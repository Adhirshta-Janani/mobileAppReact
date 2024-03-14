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
  const MusicRoute = () =>  <HomeComponent navigation={navigation} responseData={route}/>

const AlbumsRoute = () =>  <DSPListView navigation={navigation} route={route}/>

const RecentsRoute = () =>  <CheckInScreen navigation={navigation} route={route}/>

const ChatRoute = () =>  <MessagesScreen navigation={navigation} route={route}/>

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

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
    chat: ChatRoute
  });

  return (
    // <Provider theme={{ ...theme, colors: { ...theme.colors, secondaryContainer: "<your-color>" } }}>
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    
      theme={{colors: {secondaryContainer: '#146C94', background: '#FFFFFF'}}}
    />
    // </Provider>
  );
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