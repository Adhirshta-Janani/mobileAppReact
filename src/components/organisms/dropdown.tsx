// import React, { FC, useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-paper';

// interface Props {
//   label: string;
// }

// const Dropdown: FC<Props> = ({ label }) => {
//   const [visible, setVisible] = useState(false);

//   const toggleDropdown = () => {
//     setVisible(!visible);
//   };

//   const renderDropdown = () => {
//     if (visible) {
//       return (
//           <Text style={styles.dropdown}>
//             This is where the dropdown will be rendered.
//           </Text>
//       );
//     }
//   };

//   return (
//     <TouchableOpacity
//       style={styles.button}
//       onPress={toggleDropdown}
//     >
//       {renderDropdown()}
//       <Text style={styles.buttonText}>{label}</Text>
//       {/* <Icon type='font-awesome' name='chevron-down'/> */}
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#efefef',
//     height: 50,
//     width: '90%',
//     paddingHorizontal: 10,
//     zIndex: 1,
//   },
//   buttonText: {
//     flex: 1,
//     textAlign: 'center',
//   },
//   dropdown: {
//     position: 'absolute',
//     backgroundColor: '#fff',
//     top: 50,
//   },
// });

// export default Dropdown;

// FileName: App.js

import React, { useEffect, useState } from "react";
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
import AppHeader from "./Appheader";
import ImageComponent from "../atom/image";
import ScrollTabs from "../atom/scrolltab";
import axios from "axios";
import { DSP_URL, DSP_URL_WEEK } from "../../constants/config";
import Loader from "../atom/loader";
import { ScrollView } from "react-native-virtualized-view";
import TabsComponents from "./Tabs";
// import TabsComponents from "./Tabs";

const DATA = [
  {
    id: 0,
    key: "0",
    name: "Overall Standing",
    value: "",
    content: {},
    performance: "",
  },
  {
    id: 1,
    key: "1",
    name: "Mentor Score",
    value: "",
    content: {},
    performance: "",
  },
  {
    id: 2,
    key: "2",
    name: "Seat Belt Violations",
    value: "",
    content: {},
    performance: "",
  },
  {
    id: 3,
    key: "3",
    name: "Speeding Violations",
    value: "",
    content: {},
    performance: "",
  },
  {
    id: 4,
    key: "4",
    name: "Sign/Signal Violations",
    value: "",
    content: {},
    performance: "",
  },
  {
    id: 5,
    key: "5",
    name: "Following Distance Rate",
    value: "",
    content: {},
    performance: "",
  },
  {
    id: 6,
    key: "6",
    name: "Delivery Completion Rate",
    value: "",
    content: {},
    performance: "",
  },
  {
    id: 7,
    key: "7",
    name: "Customer Delivery Feedback Score",
    value: "",
    content: {},
    performance: "",
  },
  {
    id: 8,
    key: "8",
    name: "Delivered Not Received",
    value: "",
    content: {},
    performance: "",
  },
  {
    id: 9,
    key: "9",
    name: "Contact Compliance",
    value: "",
    content: {},
    performance: "",
  },
  {
    id: 10,
    key: "10",
    name: "Photo on Delivery Rate",
    value: "",
    content: {},
    performance: "",
  },
];

const SPACING = 10;
let mentor_con = true;
let CDF_con = true;
let POD_con = true;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const _colors = {
  active: `#146C94`,
  inactive: `white`,
};
const _spacing = 10;

// const ExpandableListItem = ({ item }) => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   let _style = styles.hyperLinkrow;

//   const textColorHandler = (value) => {
//     switch (value) {
//       case "Fantastic Plus":
//         return <Text style={styles.fantastic}> {value}</Text>;
//       case "Fantastic":
//         return <Text style={styles.fantastic}> {value}</Text>;
//       case "Great":
//         return <Text style={styles.great}> {value}</Text>;
//       case "Fair":
//         return <Text style={styles.fair}> {value}</Text>;
//       case "Poor":
//         return <Text style={styles.poor}> {value}</Text>;
//       default:
//         return <Text style={styles.data}> {value}</Text>;
//     }
//   };

//   const indicators = (value) => {
//     switch (value) {
//       case "DOWN-GREEN":
//         return <Image
//         style={{ height: 30, width: 30 }}
//         source={require("./../../../assets/down_arrow.png")}
//       />
//       case "UP-RED":
//         return <Image
//         style={{ height: 30, width: 30 }}
//         source={require("./../../../assets/decrease-up.png")}
//       />
//       case "DOWN-RED":
//         return <Image
//         style={{ height: 30, width: 30 }}
//         source={require("./../../../assets/decrease.png")}
//       />
//       case "NEUTRAL-BLUE":
//         return <Image
//         style={{ height: 25, width: 30 }}
//         source={require("./../../../assets/neutral.png")}
//       />
//       case "UP-GREEN":
//         return  <Image
//             style={{ height: 30, width: 30 }}
//             source={require("./../../../assets/up_arrow.png")}

//           />
//     }
//   };

//   const getExpandableContent = (item) => {
//     return (
//       <View
//         style={{
//           flex: 1,
//         }}
//       >
//         {item.key == "1" ? (
//           <View style={{ flex: 1 }}>
//             {item.content["Acceleration"] ? ( <><Text style={styles.row}> Acceleration </Text>
//             {textColorHandler(item.content["Acceleration"])} </> ) : null}
//             {item.content["Braking"] ? (<><Text style={styles.row}> Braking </Text>
//             {textColorHandler(item.content["Braking"])}</>) : null }
//             {item.content["Cornering"] ? (<><Text style={styles.row}> Cornering </Text>
//             {textColorHandler(item.content["Cornering"])}</>) : null }
//             {item.content["speeding"] ? (<><Text style={styles.row}> Speeding </Text>
//             {textColorHandler(item.content["speeding"])}</>) : null }
//             {item.content["Distraction"] ? (<><Text style={styles.row}> Distraction </Text>
//             {textColorHandler(item.content["Distraction"])}</>) : null }
//             {item.content["Seatbelt"] ? (<><Text style={styles.row}> Seatbelt </Text>
//             {textColorHandler(item.content["Seatbelt"])}</>) : null }
//             {item.content["trainingAssigned"] ? (<><Text style={styles.row}> Training Assigned </Text>
//             {textColorHandler(item.content["trainingAssigned"])}</>) : null }
//             {item.content["trainingCompleted"] ? (<><Text style={styles.row}> Training Completed </Text>
//             {textColorHandler(item.content["trainingCompleted"])}</>) : null }
//           </View>
//         ) : null}
//         {item.key == "7" ? (
//           <View>
//              {item.content["Rank"] ? (<><Text style={styles.row}> Rank </Text>
//             {textColorHandler(item.content["Rank"])}</>) : null }
//             {item.content["CDFTier"] ? (<><Text style={styles.row}> CDFTier </Text>
//             {textColorHandler(item.content["CDFTier"])}</>) : null }
//             {item.content["cdfScore"] ? (<><Text style={styles.row}> CDF Score </Text>
//             {textColorHandler(item.content["cdfScore"])}</>) : null }
//             {item.content["deliverywasGreat"]  ? (<><Text style={styles.row}> Delivery was Great </Text>
//             {textColorHandler(item.content["deliverywasGreat"])}</>) : null }
//             {item.content["deliverywasnotsoGreat"]  ? (<><Text style={styles.row}> Delivery was not so Great </Text>
//             {textColorHandler(item.content["deliverywasnotsoGreat"])}</>) : null }
//             {item.content["respectfulofProperty"] ? (<><Text style={styles.row}> Respectful of Property </Text>
//             {textColorHandler(item.content["respectfulofProperty"])}</>) : null }
//             {item.content["followedInstructions"] ? (<><Text style={styles.row}> Followed Instructions </Text>
//             {textColorHandler(item.content["followedInstructions"])}</>) : null }
//             {item.content["friendly"]  ? (<><Text style={styles.row}> Friendly </Text>
//             {textColorHandler(item.content["friendly"])}</>) : null }
//             {item.content["WentAboveandBeyond"]  ? (<><Text style={styles.row}> Went Above and Beyond </Text>
//             {textColorHandler(item.content["WentAboveandBeyond"])}</>) : null }
//             {item.content["deliveredwithCare"] ? (<><Text style={styles.row}> Delivered with Care </Text>
//             {textColorHandler(item.content["deliveredwithCare"])}</>) : null }
//             {item.content["ThankmyDriver"] ? (<><Text style={styles.row}> Thank my Driver </Text>
//             {textColorHandler(item.content["ThankmyDriver"])}</>) : null }
//             {item.content["mishandledPackage"] ? (<><Text style={styles.row}> Mishandled Package </Text>
//             {textColorHandler(item.content["mishandledPackage"])}</>) : null }
//             {item.content["DriverUnprofessional"] ? (<><Text style={styles.row}> Driver Unprofessional </Text>
//             {textColorHandler(item.content["DriverUnprofessional"])}</>) : null }
//             {item.content["NotDeliveredtoPreferredLocation"]  ? (<><Text style={styles.row}> Not Delivered to Preferred Location </Text>
//             {textColorHandler(item.content["NotDeliveredtoPreferredLocation"])}</>) : null }
//             {item.content["itemDamaged"]  ? (<><Text style={styles.row}> Items Damaged </Text>
//             {textColorHandler(item.content["itemDamaged"])}</>) : null }
//             {item.content["DeliveredtoWrongAddress"] ? (<><Text style={styles.row}> Delivered to Wrong Address </Text>
//             {textColorHandler(item.content["DeliveredtoWrongAddress"])}</>) : null }
//             {item.content["NeverReceivedDelivery"] ? (<><Text style={styles.row}> Never Received Delivery </Text>
//             {textColorHandler(item.content["NeverReceivedDelivery"])}</>) : null }
//           </View>
//         ) : null}
//         {item.key == "10" ? (
//           <View>
//              {item.content["Bypass"]  ? (<><Text style={styles.row}> Bypass </Text>
//             {textColorHandler(item.content["Bypass"])}</>) : null }
//             {item.content["blurryPhoto"] ? (<><Text style={styles.row}> Blurry </Text>
//             {textColorHandler(item.content["blurryPhoto"])}</>) : null }
//             {item.content["humanInThePicture"] ? (<><Text style={styles.row}> Human In The Picture </Text>
//             {textColorHandler(item.content["humanInThePicture"])}</>) : null }
//             {item.content["packageInCar"] ? (<><Text style={styles.row}> Package In Car </Text>
//             {textColorHandler(item.content["packageInCar"])}</>) : null }
//             {item.content["packageInHand"] ? (<><Text style={styles.row}> Package In Hand </Text>
//             {textColorHandler(item.content["packageInHand"])}</>) : null }
//             {item.content["packageNotClearlyVisibleConcealment"] ? (<><Text style={styles.row}> Package Not Clearly Visible </Text>
//             {textColorHandler(item.content["packageNotClearlyVisibleConcealment"])}</>) : null }
//             {item.content["packageTooClose"] ? (<><Text style={styles.row}> Package Too Close </Text>
//             {textColorHandler(item.content["packageTooClose"])}</>) : null }
//             {item.content["photoTooDark"] ? (<><Text style={styles.row}> Photo Too Dark </Text>
//             {textColorHandler(item.content["photoTooDark"])}</>) : null }
//             {item.content["other"] ? (<><Text style={styles.row}> Other </Text>
//             {textColorHandler(item.content["other"])}</>) : null }
//             {item.content["TotalRejects"] ? (<><Text style={styles.row}> Total Rejects </Text>
//             {textColorHandler(item.content["TotalRejects"])}</>) : null }
//           </View>
//         ) : null}

//       </View>
//     );
//   };

//   return (
//     <View style={styles.itemContainer}>
//       <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             // rowGap: 10
//             // padding: 20
//             // alignItems: "center"
//           }}
//         >
//           {item.id == 1 && item.content.length > 0 || item.id == 7 && item.content.length > 0 || item.id == 10 && item.content.length > 0 ? (
//             <Text style={_style}> {item.name} </Text>
//           ) : (
//             <Text style={styles.row}> {item.name} </Text>
//           )}
//           {/* <Text style = {styles.row}> {item.name} </Text> */}
//           {textColorHandler(item.value)}
//           {indicators(item.performance)}
//             {/* {item.value == "Fantastic" ? (
//              <Image
//              style={{ height: 30, width: 30 }}
//              source={require("./../../../assets/up_arrow.png")}
//            />
//           ) : null } */}
//           {/* <Text style={styles.row}> {item.name} </Text>
//                   {textColorHandler(item)} */}
//         </View>
//       </TouchableOpacity>
//       {/* {getExpandableContent(item)}   */}
//       {expanded && getExpandableContent(item)}
//     </View>
//   );
// };

// const ExpandableList = ({ data }) => {
//   const renderItem = ({ item }) => <ExpandableListItem item={item} />;

//   return (
//     <Animated.FlatList
//       data={DATA}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id.toString()}
//     />
//   );
// };

const DSPListView = ({ navigation, route }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const [weekResponse, setWeekData] = useState({});
  const [data, setData] = useState(DATA);
  let [isLoading, setLoading] = useState(true);
  let [mentor_content, setMentorContent] = useState(mentor_con);
  let [CDF_content, setCDFContent] = useState(CDF_con);
  let [PD_content, setPDContent] = useState(POD_con);
  let [error, setError] = useState();
  const [index, setIndex] = useState(0);
  const [shortWeekData, setShortWeek] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState("");

  let { responseData } = route.params;

  const ExpandableListItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    let _style = styles.hyperLinkrow;

    const textColorHandler = (value) => {
      switch (value) {
        case "Fantastic Plus":
          return <Text style={styles.fantastic}> {value}</Text>;
        case "Fantastic":
          return <Text style={styles.fantastic}> {value}</Text>;
        case "Great":
          return <Text style={styles.great}> {value}</Text>;
        case "Fair":
          return <Text style={styles.fair}> {value}</Text>;
        case "Poor":
          return <Text style={styles.poor}> {value}</Text>;
        default:
          return <Text style={styles.data}> {value}</Text>;
      }
    };

    const indicators = (value) => {
      switch (value) {
        case "DOWN-GREEN":
          return (
            <Image
              style={{ height: 30, width: 30 }}
              source={require("./../../../assets/down_arrow.png")}
            />
          );
        case "UP-RED":
          return (
            <Image
              style={{ height: 30, width: 30 }}
              source={require("./../../../assets/decrease-up.png")}
            />
          );
        case "DOWN-RED":
          return (
            <Image
              style={{ height: 30, width: 30 }}
              source={require("./../../../assets/decrease.png")}
            />
          );
        case "NEUTRAL-BLUE":
          return (
            <Image
              style={{ height: 25, width: 30 }}
              source={require("./../../../assets/neutral.png")}
            />
          );
        case "UP-GREEN":
          return (
            <Image
              style={{ height: 30, width: 30 }}
              source={require("./../../../assets/up_arrow.png")}
            />
          );
      }
    };

    const getExpandableContent = (item) => {
      return (
        <View
          style={{
            flex: 1,
          }}
        >
          {item.key == "1" ? (
            <View style={{ flex: 1 }}>
              {item.content["Acceleration"] ? (
                <>
                  <Text style={styles.row}> Acceleration </Text>
                  {textColorHandler(item.content["Acceleration"])}{" "}
                </>
              ) : null}
              {item.content["Braking"] ? (
                <>
                  <Text style={styles.row}> Braking </Text>
                  {textColorHandler(item.content["Braking"])}
                </>
              ) : null}
              {item.content["Cornering"] ? (
                <>
                  <Text style={styles.row}> Cornering </Text>
                  {textColorHandler(item.content["Cornering"])}
                </>
              ) : null}
              {item.content["speeding"] ? (
                <>
                  <Text style={styles.row}> Speeding </Text>
                  {textColorHandler(item.content["speeding"])}
                </>
              ) : null}
              {item.content["Distraction"] ? (
                <>
                  <Text style={styles.row}> Distraction </Text>
                  {textColorHandler(item.content["Distraction"])}
                </>
              ) : null}
              {item.content["Seatbelt"] ? (
                <>
                  <Text style={styles.row}> Seatbelt </Text>
                  {textColorHandler(item.content["Seatbelt"])}
                </>
              ) : null}
              {item.content["trainingAssigned"] ? (
                <>
                  <Text style={styles.row}> Training Assigned </Text>
                  {textColorHandler(item.content["trainingAssigned"])}
                </>
              ) : null}
              {item.content["trainingCompleted"] ? (
                <>
                  <Text style={styles.row}> Training Completed </Text>
                  {textColorHandler(item.content["trainingCompleted"])}
                </>
              ) : null}
            </View>
          ) : null}
          {item.key == "7" ? (
            <View>
              {item.content["Rank"] ? (
                <>
                  <Text style={styles.row}> Rank </Text>
                  {textColorHandler(item.content["Rank"])}
                </>
              ) : null}
              {item.content["CDFTier"] ? (
                <>
                  <Text style={styles.row}> CDFTier </Text>
                  {textColorHandler(item.content["CDFTier"])}
                </>
              ) : null}
              {item.content["cdfScore"] ? (
                <>
                  <Text style={styles.row}> CDF Score </Text>
                  {textColorHandler(item.content["cdfScore"])}
                </>
              ) : null}
              {item.content["deliverywasGreat"] ? (
                <>
                  <Text style={styles.row}> Delivery was Great </Text>
                  {textColorHandler(item.content["deliverywasGreat"])}
                </>
              ) : null}
              {item.content["deliverywasnotsoGreat"] ? (
                <>
                  <Text style={styles.row}> Delivery was not so Great </Text>
                  {textColorHandler(item.content["deliverywasnotsoGreat"])}
                </>
              ) : null}
              {item.content["respectfulofProperty"] ? (
                <>
                  <Text style={styles.row}> Respectful of Property </Text>
                  {textColorHandler(item.content["respectfulofProperty"])}
                </>
              ) : null}
              {item.content["followedInstructions"] ? (
                <>
                  <Text style={styles.row}> Followed Instructions </Text>
                  {textColorHandler(item.content["followedInstructions"])}
                </>
              ) : null}
              {item.content["friendly"] ? (
                <>
                  <Text style={styles.row}> Friendly </Text>
                  {textColorHandler(item.content["friendly"])}
                </>
              ) : null}
              {item.content["WentAboveandBeyond"] ? (
                <>
                  <Text style={styles.row}> Went Above and Beyond </Text>
                  {textColorHandler(item.content["WentAboveandBeyond"])}
                </>
              ) : null}
              {item.content["deliveredwithCare"] ? (
                <>
                  <Text style={styles.row}> Delivered with Care </Text>
                  {textColorHandler(item.content["deliveredwithCare"])}
                </>
              ) : null}
              {item.content["ThankmyDriver"] ? (
                <>
                  <Text style={styles.row}> Thank my Driver </Text>
                  {textColorHandler(item.content["ThankmyDriver"])}
                </>
              ) : null}
              {item.content["mishandledPackage"] ? (
                <>
                  <Text style={styles.row}> Mishandled Package </Text>
                  {textColorHandler(item.content["mishandledPackage"])}
                </>
              ) : null}
              {item.content["DriverUnprofessional"] ? (
                <>
                  <Text style={styles.row}> Driver Unprofessional </Text>
                  {textColorHandler(item.content["DriverUnprofessional"])}
                </>
              ) : null}
              {item.content["NotDeliveredtoPreferredLocation"] ? (
                <>
                  <Text style={styles.row}>
                    {" "}
                    Not Delivered to Preferred Location{" "}
                  </Text>
                  {textColorHandler(
                    item.content["NotDeliveredtoPreferredLocation"]
                  )}
                </>
              ) : null}
              {item.content["itemDamaged"] ? (
                <>
                  <Text style={styles.row}> Items Damaged </Text>
                  {textColorHandler(item.content["itemDamaged"])}
                </>
              ) : null}
              {item.content["DeliveredtoWrongAddress"] ? (
                <>
                  <Text style={styles.row}> Delivered to Wrong Address </Text>
                  {textColorHandler(item.content["DeliveredtoWrongAddress"])}
                </>
              ) : null}
              {item.content["NeverReceivedDelivery"] ? (
                <>
                  <Text style={styles.row}> Never Received Delivery </Text>
                  {textColorHandler(item.content["NeverReceivedDelivery"])}
                </>
              ) : null}
            </View>
          ) : null}
          {item.key == "10" ? (
            <View>
              {item.content["Bypass"] ? (
                <>
                  <Text style={styles.row}> Bypass </Text>
                  {textColorHandler(item.content["Bypass"])}
                </>
              ) : null}
              {item.content["blurryPhoto"] ? (
                <>
                  <Text style={styles.row}> Blurry </Text>
                  {textColorHandler(item.content["blurryPhoto"])}
                </>
              ) : null}
              {item.content["humanInThePicture"] ? (
                <>
                  <Text style={styles.row}> Human In The Picture </Text>
                  {textColorHandler(item.content["humanInThePicture"])}
                </>
              ) : null}
              {item.content["packageInCar"] ? (
                <>
                  <Text style={styles.row}> Package In Car </Text>
                  {textColorHandler(item.content["packageInCar"])}
                </>
              ) : null}
              {item.content["packageInHand"] ? (
                <>
                  <Text style={styles.row}> Package In Hand </Text>
                  {textColorHandler(item.content["packageInHand"])}
                </>
              ) : null}
              {item.content["packageNotClearlyVisibleConcealment"] ? (
                <>
                  <Text style={styles.row}> Package Not Clearly Visible </Text>
                  {textColorHandler(
                    item.content["packageNotClearlyVisibleConcealment"]
                  )}
                </>
              ) : null}
              {item.content["packageTooClose"] ? (
                <>
                  <Text style={styles.row}> Package Too Close </Text>
                  {textColorHandler(item.content["packageTooClose"])}
                </>
              ) : null}
              {item.content["photoTooDark"] ? (
                <>
                  <Text style={styles.row}> Photo Too Dark </Text>
                  {textColorHandler(item.content["photoTooDark"])}
                </>
              ) : null}
              {item.content["other"] ? (
                <>
                  <Text style={styles.row}> Other </Text>
                  {textColorHandler(item.content["other"])}
                </>
              ) : null}
              {item.content["TotalRejects"] ? (
                <>
                  <Text style={styles.row}> Total Rejects </Text>
                  {textColorHandler(item.content["TotalRejects"])}
                </>
              ) : null}
            </View>
          ) : null}
        </View>
      );
    };

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              // rowGap: 10
              // padding: 20
              // alignItems: "center"
            }}
          >
            {(item.id == 1 && mentor_content) ||
            (item.id == 7 && CDF_content) ||
            (item.id == 10 && PD_content) ? (
              <Text style={_style}> {item.name} </Text>
            ) : (
              <Text style={styles.row}> {item.name} </Text>
            )}
            {/* <Text style = {styles.row}> {item.name} </Text> */}
            {textColorHandler(item.value)}
            {indicators(item.performance)}
            {/* {item.value == "Fantastic" ? (
               <Image
               style={{ height: 30, width: 30 }}
               source={require("./../../../assets/up_arrow.png")}
             />
            ) : null } */}
            {/* <Text style={styles.row}> {item.name} </Text>
                    {textColorHandler(item)} */}
          </View>
        </TouchableOpacity>
        {/* {getExpandableContent(item)}   */}
        {expanded && getExpandableContent(item)}
      </View>
    );
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
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const ExpandableList = ({ data }) => {
    const renderItem = ({ item }) => <ExpandableListItem item={item} />;

    return (
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        // renderItem={renderItem}
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
            <Animated.View>
              <ExpandableListItem item={item} />
            </Animated.View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  const fetchData = (weekData) => {
    let bodydata = JSON.stringify({
      // DriverID: "49",
      DriverID: responseData.userID,
      DspCode: responseData.dspCode,
      // DspCode: "LMDL",
      weekNo: weekData,
      weekCounter: "1",
      // userName: data.username,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: DSP_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer" + " " + responseData.bearerToken,
      },
      data: bodydata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.length) {
          let text = response.data;
          if (text.endsWith(",")) text = text.slice(0, -1);
          // console.log(JSON.stringify(text));
          // const responseData = JSON.parse(text)
          // responseData = response.data
          // return response.data;
          let responseData = JSON.parse(text);
          setWeekData(responseData);
          if (responseData["DAWeeklyDeliveryMetrics"].length) {
            // console.log(weekResponse, "Week Data full");
            console.log(responseData, "Week Data full R");
            setData(
              (DATA[0].value =
                responseData["DAWeeklyDeliveryMetrics"][0]["overallTier"])
            );
            setData(
              (DATA[0].performance =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "overallTiercompare"
                ])
            );

            setData(
              (DATA[1].value = responseData["Mentor"][0]["MentorFICOScore"])
            );
            setData(
              (DATA[1].performance =
                responseData["Mentor"][0]["MentorFICOScoreCompare"])
            );
            setData(
              (DATA[2].value =
                responseData["DAWeeklyDeliveryMetrics"][0]["seatbeltOffRate"])
            );
            setData(
              (DATA[2].performance =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "SeatbeltOffCompare"
                ])
            );
            setData((DATA[1].content = responseData["Mentor"][0]));
            setData(
              (DATA[3].value =
                responseData["DAWeeklyDeliveryMetrics"][0]["speedingEvent"])
            );
            setData(
              (DATA[3].performance =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "SpeedingEventcompare"
                ])
            );
            setData(
              (DATA[4].value =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "signSignalViolations"
                ])
            );
            setData(
              (DATA[4].performance =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "signSignalViolationsRatecompare"
                ])
            );
            setData(
              (DATA[5].value =
                responseData["DAWeeklyDeliveryMetrics"][0]["followingDistance"])
            );
            setData(
              (DATA[5].performance =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "followingDistanceRatecompare"
                ])
            );
            setData(
              (DATA[6].value =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "DeliveryCompletionRate"
                ])
            );
            setData(
              (DATA[6].performance =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "DeliveryCompletionRatecompare"
                ])
            );
            setData(
              (DATA[7].value = responseData["CustomerFeedback"][0]["cdfScore"])
            );
            setData(
              (DATA[7].performance =
                responseData["CustomerFeedback"][0]["cdfScoreCompare"])
            );
            setData((DATA[7].content = responseData["CustomerFeedback"][0]));
            setData(
              (DATA[8].value =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "DeliveredNotReceived"
                ])
            );
            setData(
              (DATA[8].performance =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "DeliveredNotReceivedcompare"
                ])
            );
            setData(
              (DATA[9].value =
                responseData["DAWeeklyDeliveryMetrics"][0]["ContactCompliance"])
            );
            setData(
              (DATA[9].performance =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "ContactCompliancecompare"
                ])
            );
            setData(
              (DATA[10].value =
                responseData["DAWeeklyDeliveryMetrics"][0]["PhotoOnDelivery"])
            );
            setData(
              (DATA[10].performance =
                responseData["DAWeeklyDeliveryMetrics"][0][
                  "PhotoOnDeliverycompare"
                ])
            );
            setData((DATA[10].content = responseData["PODQuality"][0]));
            console.log(DATA[1].content["Acceleration"], "!!!!!!!!!");

            if (
              DATA[1].content["Acceleration"] == "" &&
              DATA[1].content["Braking"] == "" &&
              DATA[1].content["Cornering"] == "" &&
              DATA[1].content["speeding"] == "" &&
              DATA[1].content["Distraction"] == "" &&
              DATA[1].content["Seatbelt"] == "" &&
              DATA[1].content["trainingAssigned"] == "" &&
              DATA[1].content["trainingCompleted"] == ""
            ) {
              setMentorContent(false);
            }

            if (
              DATA[7].content["Rank"] == "" &&
              DATA[7].content["CDFTier"] == "" &&
              DATA[7].content["deliverywasGreat"] == "" &&
              DATA[7].content["respectfulofProperty"] == "" &&
              DATA[7].content["followedInstructions"] == "" &&
              DATA[7].content["friendly"] == "" &&
              DATA[7].content["WentAboveandBeyond"] == "" &&
              DATA[7].content["deliveredwithCare"] == "" &&
              DATA[7].content["ThankmyDriver"] == "" &&
              DATA[7].content["mishandledPackage"] == "" &&
              DATA[7].content["DriverUnprofessional"] == "" &&
              DATA[7].content["NotDeliveredtoPreferredLocation"] == "" &&
              DATA[7].content["itemDamaged"] == "" &&
              DATA[7].content["DeliveredtoWrongAddress"] == "" &&
              DATA[7].content["NeverReceivedDelivery"]
            ) {
              setCDFContent(false);
            }

            if (
              DATA[10].content["Bypass"] == "" &&
              DATA[10].content["blurryPhoto"] == "" &&
              DATA[10].content["humanInThePicture"] == "" &&
              DATA[10].content["packageInCar"] == "" &&
              DATA[10].content["packageInHand"] == "" &&
              DATA[10].content["packageNotClearlyVisibleConcealment"] == "" &&
              DATA[10].content["packageTooClose"] == "" &&
              DATA[10].content["photoTooDark"] == "" &&
              DATA[10].content["other"] == "" &&
              DATA[10].content["TotalRejects"] == ""
            ) {
              setPDContent(false);
            }

            setLoading(false);
            // console.log(data,"Hpook Value")
            //      console.log(weekData,"Check this");
            //   setSelectedWeek(response.data[0].weekNo)
            //   console.log(selectedWeek)
            // setData({
            //   ...data,
            // });
            // navigation.navigate("DSPScoreCard");
          } else {
            return <Text>No Data Found</Text>;
          }
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

  // useEffect(fetchData, []);

  function Handler(index, item) {
    console.log(item, "#########");
    console.log(selectedWeek, "Before");
    setIndex(index);
    setSelectedWeek(item.weekNo);
    console.log(item.weekNo, "After");
    console.log(selectedWeek, "After");
    setLoading(true);
    fetchData(item.weekNo);
    // childToParent(selectedWeek)
    // selectedindex = item.key;
  }

  const scrollTabData = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 30,
          paddingHorizontal: 20,
        }}
      >
        <FlatList
          style={{ flexGrow: 0 }}
          data={shortWeekData}
          // keyExtractor={(item) => item.weekNo}
          // contentContainerStyle={{ paddingLeft: _spacing }}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index: fIndex }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Handler(fIndex, item);
                }}
              >
                <View
                  style={{
                    marginRight: _spacing,
                    padding: _spacing,
                    borderWidth: 2,
                    borderColor: _colors.active,
                    borderRadius: 12,
                    backgroundColor:
                      fIndex === index ? _colors.active : _colors.inactive,
                  }}
                >
                  <Text
                    style={{
                      color: fIndex === index ? "white" : "black",
                      fontWeight: "700",
                    }}
                  >
                    {item.weekNo}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //       <Loader size={"large"} />
  //     </View>
  //   );
  // }

  const tabsData = () => {
    setLoading(true);

    let bodydata = JSON.stringify({
      userId: responseData.userID,
      DspCode: responseData.dspCode,
      // userId: "49",
      // DspCode: "LMDL",
      weekCounter: "6",

      // userName: data.username,
    });

    console.log(bodydata, "bodyData");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: DSP_URL_WEEK,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer" + " " + responseData.bearerToken,
      },
      data: bodydata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.length) {
          // responseData = response.data
          // return response.data;
          setShortWeek(response.data);
          //  console.log(weekData,"Check this");
          setSelectedWeek(response.data[0].weekNo);
          // let selectedWeek =
          // console.log(selectedWeek);
          // childToParent(selectedWeek);
          setShortWeek(response.data);
          fetchData(response.data[0].weekNo);

          // setData({
          //   ...data,
          // });
          // navigation.navigate("DSPScoreCard");
        } else {
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

  useEffect(tabsData, []);

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        responseData={responseData}
        color="white"
        backNavigation={false}
      />
      <ImageComponent />
      {scrollTabData()}
      {isLoading ? <Loader size={"small"} /> : null}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {isLoading ? null : (
          <View style={{ padding: 20, marginTop: 10 }}>
            <ExpandableList data={DATA} />
          </View>
        )}
      </ScrollView>
      {/* <TabsComponents /> */}
      {/* <ScrollTabs childToParent={undefined} shortweekData={undefined} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1F1",
    // padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green",
    textAlign: "center",
  },
  subheader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
  },
  itemTouchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemContent: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  row: { backgroundColor: "#fff", fontWeight: "bold" },
  hyperLinkrow: {
    backgroundColor: "#fff",
    fontWeight: "bold",
    color: "#04AEC4",
    textDecorationLine: "underline",
    // justifyContent: "space-between",
  },
  data: {
    height: 40,
    backgroundColor: "#fff",
    fontWeight: "bold",
    color: "#808080",
    marginLeft: "auto",
    textAlign: "justify",
    // alignItems: "flex-end",
    // alignContent: "flex-end"
  },
  fantastic: {
    height: 40,
    color: "#0096FF",
    fontWeight: "bold",
    // left: 100
    // alignItems: "center",
    textAlign: "justify",
    marginLeft: "auto",
  },
  fair: {
    height: 40,
    color: "#FFC300",
    fontWeight: "bold",
    alignItems: "flex-end",
    marginLeft: "auto",
  },
  great: {
    height: 40,
    color: "#93C572",
    fontWeight: "bold",
    alignItems: "flex-end",
    marginLeft: "auto",
  },
  poor: {
    height: 40,
    color: "#FF0000",
    fontWeight: "bold",
    alignItems: "flex-end",
    marginLeft: "auto",
  },
});

export default DSPListView;
