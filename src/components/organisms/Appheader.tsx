import * as React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { Platform, Image, View, TouchableHighlight } from 'react-native';
import ImageComponent from '../atom/image';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const AppHeader = ({navigation, responseData, color}) => (
    <Appbar.Header style = {{backgroundColor: color, borderColor: "#ffff"}} theme={{ colors: { primary: '#146C94' } }}>
         {/* <ImageComponent /> */}
        {/* <Image source={require("../../../assets/hamburger.png")} /> */}
        {/* <Appbar.BackAction onPress={() => {navigation.goBack()}} /> */}
        
        {/* <Appbar.Action  icon="arrow-left" onPress={() => {navigation.goBack()}} /> */}
       <Appbar.Content  title="" subtitle={'Subtitle'} />
        {/* <Appbar.Action theme={{ colors: { primary: 'blue' } }} icon="magnify" onPress={() => {}} /> */}
        {/* <View onPress={() => {navigation.navigate('Drawer')}}> */}
        <TouchableHighlight onPress={() =>  navigation.navigate( { name: 'Drawer',
          params: { responseData : responseData }}) }>
        <Avatar.Image size={50} source={require("../../../assets/Profile.png")} /> 
</TouchableHighlight>
        {/* </View> */}
        {/* <Avatar.Image size={24} source={require('../assets/avatar.png')} /> */}
        {/* <Appbar.Action icon={require("../../../assets/Profile.png")} onPress={() => {navigation.navigate('Drawer')}} /> */}
    </Appbar.Header>
);

export default AppHeader;