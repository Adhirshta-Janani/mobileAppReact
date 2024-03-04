import { Entypo, Feather } from '@expo/vector-icons';
import * as React from 'react';
import { Alert, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { DSP_URL_WEEK } from '../../constants/config';
import axios from 'axios';
import { useEffect, useState } from 'react';

const { width, height } = Dimensions.get('screen');
// let selectedindex = 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba';


let data = [
  {
    key: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    job: 'Week 1',
  },
  {
    key: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    job: 'Week 2',
  },
  {
    key: '58694a0f-3da1-471f-bd96-145571e29d75',
    job: 'Week 3',
  },
  {
    key: '58694a0f-3da1-471f-bd96-145571e29d78',
    job: 'Week 4',
  },
  {
    key: '58694a0f-3da1-471f-bd96-145571e29d71',
    job: 'Week 5',
  },
  {
    key: '58694a0f-3da1-471f-bd96-145571e29d767',
    job: 'Week 6',
  },
];


const _colors = {
  active: `#146C94`,
  inactive: `white`,
};
const _spacing = 10;


export default function ScrollTabs({childToParent, shortweekData}) {


  const [index, setIndex] = useState(0);
  const [ weekData, setWeek ] = React.useState([]);
  const [ selectedWeek, setSelectedWeek ] = React.useState('');

  const fetchData = () => {

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
          setWeek(response.data); 
             console.log(weekData,"Check this");
          setSelectedWeek(response.data[0].weekNo)
          console.log(selectedWeek);
          childToParent(selectedWeek);
          shortweekData(response.data)

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
  
  useEffect(fetchData,
    []); 
  

  function Handler (index, item) {
    console.log(index)
    setIndex(index);
    setSelectedWeek(weekData[index].weekNo)
    // console.log(selectedWeek, "check this.....")
    childToParent(selectedWeek)
    // selectedindex = item.key;
  }
  
  return (
    <View style={{ justifyContent:'center', alignItems: 'center', paddingTop: 30, paddingHorizontal: 20 }}>
      <FlatList
        style={{ flexGrow: 0 }}
        data={weekData}
        // keyExtractor={(item) => item.weekNo}
        contentContainerStyle={{ paddingLeft: _spacing }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity   onPress={() => {
              Handler(fIndex, item), setSelectedWeek(item.weekNo) ;
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