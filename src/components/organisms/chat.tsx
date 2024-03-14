import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, Alert, BackHandler} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppHeader from './Appheader';
import TabsComponents from './Tabs';
import { GET_CHAT_MESSAGE, SEND_CHAT_MESSAGE } from '../../constants/config';
import axios from 'axios';
import moment from 'moment';

const ChatScreen = ({navigation, route}) => {
  let message = [
    ]
  const [messages, setMessages] = useState(message);
  let [isLoading, setLoading] = useState(true);
  let [isEditable, setEditable] = useState(true);

  let { responseData, chatResponse } = route.params;
  console.log(responseData, "6666666", chatResponse, "DData.......")

  // if(responseData.)


  const formatData = (data: any) => {
    let pushData
    pushData = {
      _id: data.msgId, 
      createdAt: dateChange(data.transactionDateTime), 
      text: data.msgBody, 
      user: {"_id": data.msgType == "IN" ? 1 : 2} 
    }
    console.log(pushData,"--------------------")
    // message.push(pushData);
    console.log(message,"00000000000000000000000000000")
    onSend(pushData)
    pushData = {};
  }

  const dateChange = (data: any) => {

      // Input date string
      var inputDateStr = data;

      // Parse the input date string using moment
      var inputDate = moment(inputDateStr, 'MM/DD/YYYY hh:mm A');
  
      // Format the output date string
      var outputDateStr = moment(inputDate.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));

      console.log(outputDateStr,"77777777777777777777777777777777")
      return outputDateStr;

  }



  const fetchChatData = () => {
    setLoading(true);

    let bodydata = JSON.stringify({
      userID: responseData.userID,  
      dspcode: responseData.dspCode,   
      chatTransID: chatResponse.chatTransId,  
      groupID:chatResponse.groupID
    });

    console.log(bodydata, "bodyData");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: GET_CHAT_MESSAGE,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization" : "Bearer" + " " + responseData.bearerToken,
      },
      data: bodydata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), "***************");
        if (response.data.length > 0) {
          // setMessages(response.data);
          response.data.forEach(element => {
            formatData(element);
          });
          // setData({
          //   ...data,
          // });
          // navigation.navigate("DSPScoreCard");
        } else {
          setMessages([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // setData([]);
        Alert.alert("Error", error, [{ text: "Okay" }]); ///check this logic once again
      });
  };

  useEffect(fetchChatData, []);

  const sendMessage = (fetchedmessages) => {
    setLoading(true);

    console.log(fetchedmessages,"4444444444444444444444444444")

    let bodydata = JSON.stringify({
        senderID:responseData.userID,  
        dspcode:responseData.dspCode,   
        chatTransID: chatResponse.chatTransId,  
        groupID: chatResponse.groupID,
        textBody:fetchedmessages[0].text
    });

    console.log(bodydata, "bodyData"); 

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: SEND_CHAT_MESSAGE,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization" : "Bearer" + " " + responseData.bearerToken,
      },
      data: bodydata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.length > 0) {
          // setMessages(response.data);
          // setData({
          //   ...data,
          // });
          // navigation.navigate("DSPScoreCard");
        } else {
          // setMessages([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // setData([]);
        Alert.alert("Error", error, [{ text: "Okay" }]); ///check this logic once again
      });
  };

  useEffect(() => {
    const backAction = () => {
      // Handle your exit logic here
      // For example, you can navigate to another screen
      navigation.navigate({
        name: "Landing",
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
 

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       color: "#ADD8E6",
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },

  //     },
  //     {
  //       _id: 2,
  //       text: 'Hello world',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  // setMessages([
  //       {
  //         _id: 1,
  //         text: 'Hello developer',
  //         createdAt: new Date(),
  //         color: "#ADD8E6",
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  
  //       },
  //       {
  //         _id: 2,
  //         text: 'Hello world',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 1,
  //           name: 'React Native',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  //       },
  //     ]);

  const onSend = useCallback((messages = []) => {
    console.log(messages, "iiiiiii88888888888888888888888888888888888");
    // sendMessage(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const onSendAPI = useCallback((messages = []) => {
    console.log(messages, "iiiiiii88888888888888888888888888888888888");
    sendMessage(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#0892d0"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0892d0',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <><AppHeader navigation={navigation} responseData={responseData} color="#146C94" />
    {chatResponse.canParticipantChat === "Yes" ? (   <GiftedChat
          messages={messages}
          messagesContainerStyle = {{backgroundColor: "white"}}
          
          onSend={(messages) => onSendAPI(messages)}
          user={{
              _id: 1,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent} />) : ( <GiftedChat
            messages={messages}
            messagesContainerStyle = {{backgroundColor: "white"}}
            
            onSend={(messages) => onSendAPI(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent} />) } 
 
          {/* <TabsComponents/> */}

        
          <View style={{padding: 20}}>

          </View>
    </>
  );
};


export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
});