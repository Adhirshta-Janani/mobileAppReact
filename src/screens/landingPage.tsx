import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import ScreenWrapper from './screenWrapper';
import AppHeader from '../components/organisms/Appheader';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  Animated,
  BackHandler,
  // ScrollView,
} from "react-native";
import { CHECK_IN_URL, GET_DASHBOARD_DETAILS } from '../constants/config';
import axios from 'axios';
import { ScrollView } from 'react-native-virtualized-view';
// import { Icon } from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge } from 'react-native-paper';
// import { colors } from '../theme';

const items = [
  {
    id: 1,
    place: '',
    image: require('../../assets/analytics.jpg'),
    navigate: 'DSPList',
    place1: '',
    color: '',
  },
  {
    id: 2,
    image: require('../../assets/56.jpg'),
    chat: 7,
    navigate: 'CheckIn',
    color: '',
  },
  {
    id: 3,
    place: '',
    image: require('../../assets/46.png'),
    navigate: 'CheckOut',
    color: '',
  },
  {
    id: 4,
    place: '',
    place2: '',
    country: 'England',
    image: require('../../assets/chat.jpg'),
    navigate: 'ListingScreen',
    color: '',
  }
];const SPACING = 10;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const _colors = {
  active: `#146C94`,
  inactive: `white`,
};
const _spacing = 10;

export default function HomeComponent({navigation, route}) {
    let { responseData } = route.params;

    let sampleData = {"lastestweekNo":"","checkInStatus":"","checkInMsg":"","checkOutStatus":"","checkOutMsg":"","unReadChatCount":""}


    const [dashboardData, setDashboardData] = useState(sampleData);

    const [data, setData] = React.useState({
        loader: false,
        isError: false,
        errorMsg : "Something went wrong, please try again",
        isResponseMsg: "", 
        isSuccess: false
      });

    
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
    

      const getData = () => {
        setData({
          ...data,
          loader: true,
          isError: false,
        });
    
        let bodydata = JSON.stringify({
          dspcode: responseData.dspCode,
          userID: responseData.userID,
        });
    
        console.log(bodydata);
    
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: GET_DASHBOARD_DETAILS + responseData.dspCode + '/' + responseData.userID,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Authorization" : "Bearer" + " " + responseData.bearerToken,
          },
        //   data: bodydata,
        };
    
        console.log(config)
    
        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.data) {
              setData({
                ...data,
                loader: false,
                isError: false,
              });
    
              sampleData = response.data;
              // response.data.checkInStatus = 'Complete'
              if(response.data.checkInStatus === 'NA') items[1].color = 'black'
              if(response.data.checkOutStatus === 'NA') items[2].color = 'black'

              if(response.data.checkInStatus === 'Pending') items[1].color = 'red'
              if(response.data.checkOutStatus === 'Pending') items[2].color = 'red'

              if(response.data.checkInStatus === 'Complete') items[1].color = 'green'
              if(response.data.checkOutStatus === 'Complete') items[2].color = 'green'
              items[1].place = "Your current CheckIn status is ";
              items[2].place = "Your current CheckOut status is ";
              items[0].place = "Current week ";
              items[0].place1 = "  DSP scorecard data is available now";
              items[3].place = "Check out the latest unread ";
              items[3].place2 = " chat notifications"
              setDashboardData(sampleData)
              console.log(JSON.stringify(response.data));
              console.log(dashboardData, "Test this");
            } else {
              console.log(response.data[0].result)
              setData({
                ...data,
                loader: false,
                isError: true,
                errorMsg: response.data[0].result
              });
              // Alert.alert("Wrong Input!", "Incorrect Credentials", [
              //   { text: "Okay" },
              // ]);
            }
          })
          .catch((error) => {
            console.log(error);
            setData({
              ...data,
              loader: false,
            });
            Alert.alert("Error", error, [{ text: "Okay" }]); ///check this logic once again
          });
      };

      useEffect(getData, []);


  return (
    <>
        <AppHeader navigation={navigation} responseData={responseData} color="#146c94"/>
    {/* <ScreenWrapper> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 24, shadowColor: 'black', shadowOpacity: 0.3 }}>Welcome Aiman</Text>
        {/* <TouchableOpacity style={{ padding: 8, paddingHorizontal: 12, backgroundColor: 'white', borderWidth: 1, borderColor: 'text-gray-600', borderRadius: 20 }}> */}
          {/* <Text style={{ color: 'text-gray-600' }}>Logout</Text> */}
        {/* </TouchableOpacity> */}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  borderRadius: 20, marginHorizontal: 16, marginBottom: 16, backgroundColor:"#146c94" }}>
        <Image source={require('../../assets/12.png')} style={{ width: 200, height: 200 }} />
      </View>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={[{ color: 'black' }, { fontWeight: 'bold', fontSize: 20 }]}>Recent Trips</Text>
      <TouchableOpacity style={{ padding: 8, paddingHorizontal: 12, backgroundColor: 'white', borderWidth: 1, borderColor: '#d3d3d3', borderRadius: 999 }}>
        <Text style={{ color: 'black' }}>Add Trip</Text>
      </TouchableOpacity>
    </View> */}
      <ScrollView>
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Notifications</Text>
          {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="comment-o" size={27} color="black" />
        <Badge>3</Badge> */}
        {/* <Text style={{ color: 'red', marginLeft: 5 }}>{items[0].chat}</Text> */}
      {/* </TouchableOpacity> */}
        </View>
        <FlatList
          data={items}
        //   numColumns={2}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        //   columnWrapperStyle={{
        //     justifyContent: 'space-between'
        //   }}
          style={{ marginTop: 8 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style = {styles.card} onPress={() =>  navigation.navigate( { name: item.navigate,
              params: { responseData : responseData }})}>
                <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            // rowGap: 10
            // padding: 20
            // alignItems: "center"
          }}>
               <View style= {{flex: 4}}>
                <Image source= {item.image} style={{ width: 110, height: 110, marginBottom: 4, borderRadius: 80 }} />
                </View>
                  {/* <Text style={{ color: 'text-gray-600', fontSize: 12 }}>{item.country}</Text> */}
                  <View style= {{flex: 8}}>
                    {item.id == 1 ? (  <Text style={{ color: 'black', fontWeight: 'bold', alignItems: "center", padding: 30 }}>{item.place} <Text style={{ color: '#324AB2', fontWeight: 'bold', alignItems: "center", padding: 30 }}>{dashboardData.lastestweekNo} </Text> {item.place1}</Text>) : null} 
                    {item.id == 2  ? (  <Text style={{ color: 'black', fontWeight: 'bold', alignItems: "center", padding: 30 }}>{item.place}<Text style={{ color: item.color, fontWeight: 'bold', alignItems: "center", padding: 30 }}>{dashboardData.checkInStatus} </Text></Text>) : null}
                    {item.id == 3 ? (  <Text style={{ color: 'black', fontWeight: 'bold', alignItems: "center", padding: 30 }}>{item.place}<Text style={{ color: item.color, fontWeight: 'bold', alignItems: "center", padding: 30 }}>{dashboardData.checkOutStatus} </Text></Text>) : null}
                    {/* {item.id == 1 ? (  <Text style={{ color: 'black', fontWeight: 'bold', alignItems: "center", padding: 30 }}>{item.place} <>{dashboardData.lastestweekNo} {item.place1}</> </Text>) : null}  */}
                    {item.id == 4 ? (  <Text style={{ color: 'black', fontWeight: 'bold', alignItems: "center", padding: 30 }}>{item.place} <Text style ={{ color: 'red', fontWeight: 'bold', alignItems: "center", padding: 30 }} >{dashboardData.unReadChatCount} </Text> {item.place2} </Text>) : null} 
                 
                   {/* <Text style={{ color: 'text-gray-600', fontWeight: 'bold', alignItems: "center", padding: 10 }}>{item.place}</Text> */}
                   </View>
                   {/* <Image source={require('../../assets/45.jpg')} style={{ width: '100%', height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} /> */}
  {/* <View style={{ padding: 10 }}>
    <Text style={{ color: 'text-gray-600', fontWeight: 'bold' }}>{item.place}</Text>
  </View> */}
                </View>     
                
              </TouchableOpacity>
            );
          }}
        />
      </View>
      </ScrollView>
    {/* </ScreenWrapper> */}
    </>
  )
}

const styles = StyleSheet.create({
    card : 
    {backgroundColor: 'white', padding: 12
    , borderRadius: 20, marginBottom: 8, shadowColor: 'black', shadowOpacity: 0.2 }
})
