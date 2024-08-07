import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, BackHandler } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from './../../styles/MessageStyles';
import AppHeader from './Appheader';
import { GET_RECENT_CHAT, RECENT_CHAT_URL } from '../../constants/config';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { Badge } from 'react-native-elements';
// import { Badge } from 'react-native-paper';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../../../assets/User/user-1.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../../../assets/User/user-2.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../../../assets/User/user-6.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../../../assets/User/user-1.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../../../assets/User/user-2.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const MessagesScreen = ({navigation, route}) => {
    let { responseData } = route.params;

    useFocusEffect(
      React.useCallback(() => {
        // alert('Screen was focused'); 
        fetchChatData();
        // Do something when the screen is focused
        return () => {
          // alert('Screen was unfocused');
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };
      }, [])
    );

    // useEffect(() => {
    //   const backAction = () => {
    //     // Handle your exit logic here
    //     // For example, you can navigate to another screen
    //     navigation.navigate({
    //       name: "Landing",
    //       params: { responseData: responseData },
    //     });
    //     // backHandler.remove();
    //     return true; // Prevent default behavior (exit app)
    //   };
    
    //   const backHandler = BackHandler.addEventListener(
    //     'hardwareBackPress',
    //     backAction
    //   );
    
    //   return () => backHandler.remove();
    // }, []);

    console.log(responseData,"check this")

  //   let chatData = [
  //     {
  //         "chatTransId": "0",
  //         "groupID": "2",
  //         "groupName": "HR Team",
  //         "isParticipants": "No",
  //         "canParticipantChat": "Yes",
  //         "isExclusiveToManager": "No",
  //         "isExclusiveToDriver": "Yes",
  //         "isPinned": "False",
  //         "senderUserID": "4",
  //         "senderName": "Aiman B Mohamed - HR Team",
  //         "transactionDateTime": "01/19/2024 11:00 AM",
  //         "readCounter": "0"
  //     },
  //     {
  //         "chatTransId": "0",
  //         "groupID": "1",
  //         "groupName": "Dispatch Team",
  //         "isParticipants": "No",
  //         "canParticipantChat": "Yes",
  //         "isExclusiveToManager": "No",
  //         "isExclusiveToDriver": "Yes",
  //         "isPinned": "False",
  //         "senderUserID": "4",
  //         "senderName": "Aiman B Mohamed - Dispatch Team",
  //         "transactionDateTime": "01/19/2024 10:00 AM",
  //         "readCounter": "0"
  //     }
  // ]

  

    const [recentChat, setrecentChat] = useState([]);

    const fetchChatData = () => {
      console.log(responseData,"Janaaaaaaaa")
     
      
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: GET_RECENT_CHAT + responseData.dspCode + '/' + responseData.userID,
        headers: { 
          'Content-Type': 'application/json', 
          "Authorization" : "Bearer" + " " + responseData.bearerToken,
        },
      };

      console.log(config)
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.length) {
          setrecentChat(response.data);
          console.log(recentChat, "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^.");
        }

      })
      .catch((error) => {
        console.log(error);
      });
    //   let bodydata = JSON.stringify({
    //       userID: responseData.userID,  
    //       dspcode: responseData.dspCode  
    //   });
    //   console.log(bodydata,"#########")
    //   let config = {
    //     method: 'get',
    //     maxBodyLength: Infinity,
    //     url: GET_RECENT_CHAT,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       "Authorization" : "Bearer" + " " + responseData.bearerToken,
    //     },
    //     data: bodydata,
    //   };
    //  console.log(config)
    //   axios
    //     .request(config)
    //     .then((response) => {
    //       console.log(JSON.stringify(response.data));
    //       if (response.data.length) {
           
    //     }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       // setData({
    //       //   ...data,
    //       //   // loader: false,
    //       // });
    //       // setData([]);
    //       Alert.alert("Error", error, [{ text: "Okay" }]); ///check this logic once again
    //     });
    };

    useEffect(fetchChatData, []);

    let [chats, setChats] = useState(Messages)

    // const ReadCounter = () => (
    //   <View style={styles.readCounter}>
    //     <Text style={styles.readCounterText}>Check</Text>
    //   </View>
    // );

    

    return (
        <>
        <AppHeader navigation={navigation} responseData={responseData} color="#146C94" backNavigation={false}/>
      <Container>
        <FlatList 
          data={recentChat}
          keyExtractor={item=>item.chatTransId}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate({ name: 'ChatScreen',
            params: { responseData : responseData, chatResponse : item }})}>
              <UserInfo>
                <UserImgWrapper>
    {/* userImg: require('../../../assets/User/user-1.jpg'), */}
                  <UserImg source= {require('../../../assets/group.jpg')} />

                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.groupName}</UserName>
                    <PostTime>{item.transactionDateTime}</PostTime>
                    {/* {item.readCounter != "0" ? ( <Badge style={{ position: 'absolute', top: -5, right: -5 }}>8</Badge> ) : null} */}
                    {item.readCounter !== '0' && (
                     <Badge value={item.readCounter} status="error" />
                   )}

                    {/* <View>
      <Text style={styles.badgeText}>5</Text>
    </View> */}
                  </UserInfoText>
                  {/* <MessageText>{item.messageText}</MessageText> */}
                </TextSection>
              </UserInfo>

            </Card>
          )}
        />
      </Container>
      </>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
 
  badge: {
    backgroundColor: '	#e10000', // Set badge background color to red
    position: 'absolute',
    top: 3, // Adjust badge position as needed
    right: 3,
    // left: 250, // Adjust badge position as needed
    borderRadius: 50, // Create a circular shape
    width: 20,
    height: 20
  },
  badgeText: {
    color: 'white', // Set badge text color to white for visibility
    fontSize: 20,
    alignContent: 'center', // Adjust badge text size as needed
    // padding: 
    bottom: 3,
    left: 3
  },

});