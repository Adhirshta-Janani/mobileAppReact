import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, Alert, BackHandler, FlatList, ActivityIndicator} from 'react-native';
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

    let array = [0];
  const [messages, setMessages] = useState(message);
  let [isLoading, setLoading] = useState(true);
  let [isEditable, setEditable] = useState(true);
  let [chatID, setChatID] = useState("0");
  let chatTransID = "0";
  let [firstTimeChatData, setFirstTimeChatData] = useState(true) ;

  const [currentPage, setCurrentPage] = useState(1);
// const [isLoading, setIsLoading] = useState(true);
const [isLoadingMore, setIsLoadingMore] = useState(false);
const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
const [isFetchingMessages, setIsFetchingMessages] = useState(false);

  let { responseData, chatResponse } = route.params;
  // console.log(responseData, "6666666", chatResponse, "DData.......")

  // if(responseData.)


  const formatData = (data: any) => {
    let pushData
    pushData = {
      _id: data.msgId, 
      createdAt: dateChange(data.transactionDateTime), 
      text: data.msgBody, 
      user: {"_id": data.msgType == "IN" ? 1 : 2} 
    }
    // console.log(pushData,"--------------------")
    // message.push(pushData);
    // console.log(message,"00000000000000000000000000000")
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

      // console.log(outputDateStr,"77777777777777777777777777777777")
      return outputDateStr;

  }



  const fetchChatData = () => {
    if (isLoadingMore || isAllDataLoaded || isFetchingMessages) return;
    setIsFetchingMessages(true);
    setLoading(true);
     
    // try{
    let bodydata = JSON.stringify({
      userID: responseData.userID,  
      dspcode: responseData.dspCode,   
      chatTransID: chatResponse.chatTransId,  
      groupID:chatResponse.groupID,
      pageSize:"20",
      pageNumber: currentPage.toString(),
    });

    console.log(bodydata, "Janani bodyData");

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
        if (response.data.length > 0 && response.data[0].isChatAvailable  ) {
          // formatData =
          response.data.forEach(element => {
            formatData(element);
          });

          setFirstTimeChatData(false);
          chatTransID = chatResponse.chatTransId;
          setChatID(chatResponse.chatTransId);

          // const formattedMessages = response.data.map(formatData);
          // setMessages(response.data);
          // setMessages((prevMessages) => [...prevMessages, ...formattedMessages]);
        setCurrentPage(currentPage + 1);
        setIsFetchingMessages(false);
          // setChatID()
          // setData({
          //   ...data,
          // });
          // navigation.navigate("DSPScoreCard");
        } else {
          setIsFetchingMessages(false);
          setIsAllDataLoaded(true);
          // setMessages([]);
          setFirstTimeChatData(true);
          chatTransID = chatResponse.chatTransId;
          setChatID(chatResponse.chatTransId);
          setLoading(false);
        }
        setIsLoadingMore(false);
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
        console.error('Error fetching chat data:', error);
      setIsLoadingMore(false);
        // setData([]);
        Alert.alert("Error", error, [{ text: "Okay" }]); ///check this logic once again
      });
  };

  const handleLoadEarlier = async () => {
    await fetchChatData(); // Fetch more messages based on updated currentPage
  };

 

  useEffect(fetchChatData, []);

  const sendMessage = (fetchedmessages) => {
    setLoading(true);

    // console.log(fetchedmessages,"4444444444444444444444444444")

    let bodydata = JSON.stringify({
        senderID:responseData.userID,  
        dspcode:responseData.dspCode,   
        chatTransID:  chatTransID,  
        groupID: chatResponse.groupID,
        textBody:fetchedmessages[0].text
    });

    // console.log(bodydata, "bodyData"); 

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
        console.log(JSON.stringify(response.data), "Janani");
        if (response.data.isSuccess) {
          // if(chatID == '0'){
            chatTransID = response.data.id;
            setChatID(response.data.id)
            console.log(chatID,"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&S")
          // }
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
        // console.log(error);
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
        name: "ListingScreen",
        // params: { responseData: responseData }, name: "MessageListing",
        params: { responseData: responseData, chatResponse: chatResponse },
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
 

 

  const onSend = useCallback((messages = []) => {
    // console.log(messages, "iiiiiii88888888888888888888888888888888888");
    // sendMessage(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const onClear = useCallback((messages = []) => {
    // console.log(messages, "iiiiiii88888888888888888888888888888888888");
    // sendMessage(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const onSendAPI = useCallback((messages = []) => {
    // console.log(messages, "iiiiiii88888888888888888888888888888888888");
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

  // const renderFooter = () => {
  //   if (isLoadingMore) {
  //     return <ActivityIndicator style={styles.loading} />;
  //   } else if (isAllDataLoaded) {
  //     return <Text style={styles.noMoreText}>No more data to load</Text>;
  //   }
  //   return null;
  // };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <><AppHeader navigation={navigation} responseData={responseData} color="#146C94" backNavigation={true} />
        {chatResponse.canParticipantChat === "Yes" ? (
        <GiftedChat
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
        scrollToBottomComponent={scrollToBottomComponent}
        listViewProps={{
          scrollEventThrottle: 400,
          onScroll: ({ nativeEvent }) => {
            const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
            const paddingToTop = 80; // Adjust padding as needed
            const isCloseToTop = contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
            if (isCloseToTop && !isLoadingMore) {
              handleLoadEarlier();
            }
          }
        }} 
        />  ):  <GiftedChat
        messages={messages}
        messagesContainerStyle = {{backgroundColor: "white"}}
        
        // onSend={(messages) => onSendAPI(messages)}
        user={{
            _id: 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={() => null}
        // renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        /> }
       {/* )}

/> */}
      
  

        
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


