import * as React from 'react';
import { Image, View } from 'react-native';
import MessagesScreen from '../components/organisms/chatlisting';
import AppHeader from '../components/organisms/Appheader';
// import { Heading } from '../../../assets/scorecard'

const ListingScreen = ({navigation, route}) => (
    // <View>
        /* <AppHeader navigation={undefined} responseData={undefined} color={undefined}/> */
    <MessagesScreen navigation={navigation} route = {route}/>
    // </View>

);

export default ListingScreen ;