import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  Alert,
} from "react-native";
import AppHeader from "./Appheader";
import ImageComponent from "../atom/image";
import ScrollTabs from "../atom/scrolltab";
import { DSP_URL, DSP_URL_WEEK } from "../../constants/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import Loader from "../atom/loader";
import ListAccordion from "react-native-paper/lib/typescript/components/List/ListAccordion";
import { Accordion } from "react-native-paper/lib/typescript/components/List/List";
import Accordions from "./according";
const { width, height } = Dimensions.get("screen");
// import ExpandableFlatlist from 'rn-weblineindia-expandable-flatlist';

const DATA = [
  {
    id: 0,
    key: "0",
    name: "Overall Standing",
    value: "",
  },
  {
    id: 1,
    key: "1",
    name: "Mentor Score",
    value: "",
  },
  {
    id: 2,
    key: "2",
    name: "Seat Belt Violations",
    value: "",
  },
  {
    id: 3,
    key: "3",
    name: "Speeding Violations",
    value: "",
  },
  {
    id: 4,
    key: "4",
    name: "Sign/Signal Violations",
    value: "",
  },
  {
    id: 5,
    key: "5",
    name: "Following Distance Rate",
    value: "",
  },
  {
    id: 6,
    key: "6",
    name: "Delivery Completion Rate",
    value: "",
  },
  {
    id: 7,
    key: "7",
    name: "Customer Delivery Feedback Score",
    value: "",
  },
  {
    id: 8,
    key: "8",
    name: "Deliveried Not Received",
    value: "",
  },
  {
    id: 9,
    key: "9",
    name: "Contact Compliance",
    value: "",
  },
  {
    id: 10,
    key: "10",
    name: "Photo on Delivery Rate",
    value: "",
  },
];

const SPACING = 10;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const _colors = {
  active: `#146C94`,
  inactive: `white`,
};
const _spacing = 10;

// const [weekData, ]

export default function AnimatedList({ navigation }) {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  // const [selectedWeek, setWeek] = useState("");
  const [weekResponse, setWeekData] = useState({});
  const [data, setData] = useState(DATA);
  let [isLoading, setLoading] = useState(true);
  let [error, setError] = useState();
  const [index, setIndex] = useState(0);
  const [ shortWeekData, setShortWeek ] = useState([]);
  const [ selectedWeek, setSelectedWeek ] = useState('');

  //expandable logic 
  

  const getContent = () => {
    return (
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                // flexDirection: "row",
                // padding: SPACING, marginBottom: SPACING,
                // backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 12,
                shadowColor: "#000",
                height: 80,
                width: "90%",
                // backgroundColor: '#78CAD2',
                backgroundColor: "#ffff",
                alignSelf: "center",
                borderRadius: 15,
                marginTop: 20,
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                opacity,
                transform: [{ scale }],
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    padding: 20
                    // alignItems: "flex-end"
                  }}
                >
                  <Text style={styles.row}> {item.name} </Text>
                  {textColorHandler(item)}
                  {/* <Text style={styles.row}> {item.name} </Text>
                  {textColorHandler(item)} */}
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    );
  };

  const textColorHandler = (item) => {
    switch (item.value) {
      case "Fantastic Plus":
        return <Text style={styles.fantastic}> {item.value}</Text>;
      case "Great":
        return <Text style={styles.great}> {item.value}</Text>;
      case "Fair":
        return <Text style={styles.fair}> {item.value}</Text>;
      case "Poor":
        return <Text style={styles.poor}> {item.value}</Text>;
      default:
        return <Text style={styles.data}> {item.value}</Text>;
    }
  };

  // const childToParent = (childToParent) => {
  //   setWeek(childToParent);
  //   // console.log(selectedWeek, "selected week from DSP");
  // };

  // const shortweekData = (shortweekData) => {
  //   setWeek(shortweekData);
  //   // console.log(shortweekData, "short week data from DSP");
  //   DATA[0].value = shortweekData[0].overallStanding;
  //   // console.log(DATA);
  // };

  const tabsData = () => {

    let bodydata = JSON.stringify({
      userId: "49",
      DspCode: "LMDL"
      // userName: data.username,
    });
  
  
    // console.log(bodydata);
  
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: DSP_URL_WEEK,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    data: bodydata,
    };
  
    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        if (response.data.length) {
          // responseData = response.data
          // return response.data;
          setShortWeek(response.data); 
          DATA[0].value = response.data[0].overallStanding;
            //  console.log(weekData,"Check this");
          setSelectedWeek(response.data[0].weekNo)
          console.log(selectedWeek);
          // childToParent(selectedWeek);
          setShortWeek(response.data)

          // setData({
          //   ...data,
          // });
          // navigation.navigate("DSPScoreCard");
        } 
      }) 
      .catch((error) => {
        console.log(error);
        // setData({
        //   ...data,
        //   // loader: false,
        // });
        // setData([]);
        Alert.alert("Error", error, [{ text: "Okay" }]);     ///check this logic once again
      });
  };
  
  useEffect(tabsData,
    []); 

  const scrollTabData = () => {
    return (
      <View style={{ justifyContent:'center', alignItems: 'center', paddingTop: 30, paddingHorizontal: 20 }}>
        <FlatList
          style={{ flexGrow: 0 }}
          data={shortWeekData}
          // keyExtractor={(item) => item.weekNo}
          contentContainerStyle={{ paddingLeft: _spacing }}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index: fIndex }) => {
            return (
              <TouchableOpacity   onPress={() => {
                Handler(fIndex, item) ;
              }}>
                <View
                  style={{
                    marginRight: _spacing,
                    padding: _spacing,
                    borderWidth: 2,
                    borderColor: _colors.active,
                    borderRadius: 12,
                    backgroundColor: fIndex === index  ?_colors.active : _colors.inactive ,
                  }}>
                  <Text style={{ color: fIndex === index ? 'white' : 'black', fontWeight: '700' }} >
                    {item.weekNo}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
  
      
    );
  }

  const fetchData = () => {

    let bodydata = JSON.stringify({
      DriverID: "49",
      DspCode: "LMDL",
      weekNo: "44-2023",
      // userName: data.username,
    });

    // console.log(bodydata);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: DSP_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: bodydata,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        if (response.data.length) {
          let text = response.data;
          if (text.endsWith(",")) text = text.slice(0, -1);
          // console.log(JSON.stringify(text));
          // const responseData = JSON.parse(text)
          // responseData = response.data
          // return response.data;
          let responseData = JSON.parse(text);
          setWeekData(responseData);
          // console.log(weekResponse, "Week Data full");
          // console.log(responseData, "Week Data full R");
          setData(
            (DATA[1].value = responseData["Mentor"][0]["Mentor FICO Score"])
          );
          setData(
            (DATA[2].value =
              responseData["DA Weekly Delivery Metrics"][0]["Seatbelt-Off"])
          );
          setData(
            (DATA[3].value =
              responseData["DA Weekly Delivery Metrics"][0]["Speeding Event"])
          );
          setData(
            (DATA[4].value =
              responseData["DA Weekly Delivery Metrics"][0][
                "Sign/Signal violations"
              ])
          );
          setData(
            (DATA[5].value =
              responseData["DA Weekly Delivery Metrics"][0][
                "Following Distance"
              ])
          );
          setData(
            (DATA[6].value =
              responseData["DA Weekly Delivery Metrics"][0][
                "Delivery Completion Rate"
              ])
          );
          setData(
            (DATA[7].value =
              responseData["Customer Feedback (2 Weeks lagging)"][0][
                "CDF Score"
              ])
          );
          setData(
            (DATA[8].value =
              responseData["DA Weekly Delivery Metrics"][0][
                "Delivered Not Received"
              ])
          );
          setData(
            (DATA[9].value =
              responseData["DA Weekly Delivery Metrics"][0][
                "Contact Compliance"
              ])
          );
          setData(
            (DATA[8].value =
              responseData["DA Weekly Delivery Metrics"][0][
                "Photo-On-Delivery"
              ])
          );
          // console.log(data, "!!!!!!!!!");
          setLoading(false);
          // console.log(data,"Hpook Value")
          //      console.log(weekData,"Check this");
          //   setSelectedWeek(response.data[0].weekNo)
          //   console.log(selectedWeek)
          // setData({
          //   ...data,
          // });
          // navigation.navigate("DSPScoreCard");
        }
      })
      .catch((error) => {
        console.log(error);
        // setData({
        //   ...data,
        //   // loader: false,
        // });
        // setData([]);
        Alert.alert("Error", error, [{ text: "Okay" }]); ///check this logic once again
      });
  };

  function Handler (index, item) {
    // console.log(index)
    console.log(selectedWeek, "Before" )
    setIndex(index);
    setSelectedWeek(item.weekNo)
    console.log(item.weekNo, "After")
    console.log(selectedWeek, "After")
    // childToParent(selectedWeek)
    // selectedindex = item.key;
  }
  
  useEffect(fetchData, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );
  }

  // useEffect(weekData, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F1F1" }}>
      <AppHeader navigation={navigation} />
      <ImageComponent />
      {scrollTabData()}
      {/* <ScrollTabs childToParent={childToParent} shortweekData={shortweekData} /> */}
      {getContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 20,
    // backgroundColor: "#ccc",
  },
  table: { flex: 1, paddingTop: 100, backgroundColor: "#F6F1F1" },
  head: { height: 44, backgroundColor: "#C1DEEB" },
  row: { backgroundColor: "#fff", fontWeight: "bold" },
  data: {
    height: 40,
    backgroundColor: "#fff",
    fontWeight: "bold",
    color: "#808080",
    // alignItems: "flex-end",
    // alignContent: "flex-end"
  },
  fantastic: {
    height: 40,
    color: "#0096FF",
    fontWeight: "bold",
    alignItems: "flex-end",
  },
  fair: {
    height: 40,
    color: "#FFC300",
    fontWeight: "bold",
    alignItems: "flex-end",
  },
  great: {
    height: 40,
    color: "#93C572",
    fontWeight: "bold",
    alignItems: "flex-end",
  },
  poor: {
    height: 40,
    color: "#FF0000",
    fontWeight: "bold",
    alignItems: "flex-end",
  },
  // details: {''}
  emptyrow: { height: 40, backgroundColor: "#F6F1F1" },
});
