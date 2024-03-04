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
    useEffect(() => {
      const backAction = () => {
        // Handle your exit logic here
        // For example, you can navigate to another screen
        navigation.navigate({
          name: "HomeScreen",
          params: { responseData: responseData },
        });
        // backHandler.remove();
        return true; // Prevent default behavior (exit app)
      };
    
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
    
      return () => backHandler.remove();
    }, []);

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
      console.log(responseData,"..........")
     
      
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
          console.log(recentChat);
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

    // function getRecentChat(){
    //     let bodydata = JSON.stringify({
    
    //         senderID:responseData.userID, 
    //         dspcode:responseData.dspCode
    //     }); 

    //     console.log(bodydata);
    
    //     let config = {
    //       method: "post",
    //       maxBodyLength: Infinity,
    //       url: RECENT_CHAT_URL,
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //       },
    //       data: bodydata,
    //     };

    //     axios
    //     .request(config)
    //     .then((response) => {
    //       console.log(JSON.stringify(response.data));
    //       if (response.data.isSuccess == true) {
    //         setOtp(otp = response.data.otp);
    //       //  responseData = response.data;
    //        response.data.authoriseCode = responseData.authoriseCode ;
    //           responseData = response.data;
    //           console.log(JSON.stringify(responseData));
    //       } else {
    //         setData({
    //           ...data,
    //           loader: false,
    //           isError: true,
    //         });
    //         // Alert.alert("Wrong Input!", "Incorrect Credentials", [
    //         //   { text: "Okay" },
    //         // ]);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       setData({
    //         ...data,
    //         loader: false,
    //       });
    //       Alert.alert("Error", error, [{ text: "Okay" }]);     ///check this logic once again
    //     });
    // }

    // useEffect(getRecentChat, []);
    return (
        <>
        <AppHeader navigation={navigation} responseData={responseData} color="#146C94"/>
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
                  <UserImg source= {require('../../../assets/User/user-1.jpg')} />

                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.groupName}</UserName>
                    <PostTime>{item.transactionDateTime}</PostTime>
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
});