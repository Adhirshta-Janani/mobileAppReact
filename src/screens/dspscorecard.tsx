import { StatusBar } from 'expo-status-bar';
import {  FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import DSPTableScoreCard from '../../src/components/organisms/Tables';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import Accordions from '../../src/components/organisms/according';
import CardComponent from '../../src/components/atom/cards';
import AppHeader from '../../src/components/organisms/Appheader';
// import SideDrawer from '../../src/components/organisms/Drawer';
import ImageComponent from '../../src/components/atom/image';
import DatepickerComponent from '../../src/components/molecules/datepicker';
import { DrawerContentComponent } from '../components/organisms/Drawer';
import ScrollTabs from '../components/atom/scrolltab';
import TabsComponents from '../components/organisms/Tabs';
import FlatListComponent from '../components/organisms/flatlist';


export default function DSPScoreCard({navigation}) {
  const _colors = {
    active: `#FCD259ff`,
    inactive: `#FCD25900`,
  };
  const _spacing = 10;
  return (
    // <View>
    <FlatListComponent navigation={navigation}/>

  //  </View>
  );
}




// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// const ExpandableList = () => {
//   const [expandedItem, setExpandedItem] = useState(null);

//   // Sample data for the list
//   const data = [
//     { id: '1', title: 'Item 1', details: 'Details about Item 1...' },
//     { id: '2', title: 'Item 2', details: 'Details about Item 2...' },
//     { id: '3', title: 'Item 3', details: 'Details about Item 3...' },
//     // Add more items as needed
//   ];

//   const renderItem = ({ item }) => {
//     const isExpanded = item.id === expandedItem;

//     return (
//       <TouchableOpacity onPress={() => handlePress(item.id)}>
//         <View style={styles.itemContainer}>
//           <Text style={styles.title}>{item.title}</Text>
//           {isExpanded && <Text style={styles.details}>{item.details}</Text>}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const handlePress = (itemId) => {
//     setExpandedItem((prevItem) => (prevItem === itemId ? null : itemId));
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         extraData={expandedItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   itemContainer: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'lightgray',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   details: {
//     marginTop: 5,
//     color: 'gray',
//   },
// });

// export default ExpandableList;
