import * as React from 'react';
import { BottomNavigation, Provider, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const MusicRoute = () =>  <></>

const AlbumsRoute = () =>  <></>

const RecentsRoute = () =>  <></>

const NotificationsRoute = () => <></>

const TabsComponents = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Home', focusedIcon: 'home'},
    { key: 'albums', title: 'Recent', focusedIcon: 'history' },
    { key: 'recents', title: 'User', focusedIcon: 'account' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  return (
    // <Provider theme={{ ...theme, colors: { ...theme.colors, secondaryContainer: "<your-color>" } }}>
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}

      theme={{colors: {secondaryContainer: '#C1DEEB', background: '#FFFFFF'}}}
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