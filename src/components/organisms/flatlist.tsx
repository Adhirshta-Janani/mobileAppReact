import { Alert, FlatList, StyleSheet, View, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { ListItem } from './../atom/list';
import React, { useEffect, useRef, useState } from 'react';
import AppHeader from './Appheader';
import ImageComponent from '../atom/image';
import ScrollTabs from '../atom/scrolltab';
import { DSP_URL_WEEK } from '../../constants/config';
import axios from 'axios';





// const data = new Array(12).fill(0).map((_, index) => ({ id: index, name: 'Overall Standing', }));
// [{id: 0}, {id: 1}, {id: 2}, ..., {id: 49}]
const data = [
{
    id: 0,
    name: 'Overall Standing',
    value : '2'
},
{
    id: 1,
    name: 'Mentor Score',
    value : '2' 
},
{
    id: 2,
    name: 'Seat Belt Violations',
    value : '2' 
},
{
    id: 3,
    name: 'Speeding Violations',
    value : '2' 
},
{
    id: 4,
    name: 'Sign/Signal Violations',
    value : '2' 
},
{
    id: 5,
    name: 'Following Distance Rate',
    value : '2' 
},
{
    id: 6,
    name: 'Delivery Completion Rate',
    value : '2' 
},
{
    id: 7,
    name: 'Customer Delivery Feedback Score',
    value : '2' 
},
{
    id: 8,
    name: 'Deliveried Not Received',
    value : '2' 
},
{
    id: 9,
    name: 'Contact Compliance',
    value : '2' 
},
{
    id: 10,
    name: 'Photo on Delivery Rate',
    value : '2' 
}

]

export default function FlatListComponent({navigation}) {
  const [responsedata, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const viewableItems = useSharedValue<ViewToken[]>([]);
  const onViewableItemsChanged = (info) => {
    // console.log(axiosData);
  };
  
  // 2. create a reference to the function (above)
  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged },
  ]);
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />
      <ImageComponent/>
      <ScrollTabs />
      <FlatList
        data={data}
        contentContainerStyle={{ paddingTop: 40 }}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={({ item }) => {
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccccc',
  },
});