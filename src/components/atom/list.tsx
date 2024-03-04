import React, { useState } from 'react';
import { StyleSheet, View, ViewToken, Text, Alert } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { DSP_URL_WEEK } from '../../constants/config';
import axios from 'axios';

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: {
    id: number;
    name: string;
    value: string;
  };
};


    const ListItem: React.FC<ListItemProps> = React.memo(
  ({ item, viewableItems }) => {
      const [expandedItem, setExpandedItem] = useState(null);
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter((item) => item.isViewable)
          .find((viewableItem) => viewableItem.item.id === item.id)
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      };
    }, []);


  // let responseData = [];
  const isExpanded = true;
  
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
          console.log(JSON.stringify(response.data));
          if (response.data.isSuccess == true) {
            // responseData = response.data
            console.log(JSON.stringify(response.data));
            // return response.data;
            // setData(response.data);
            // setData({
            //   ...data,
            // });
            // navigation.navigate("DSPScoreCard");
          } else {
            // setData({
            //   ...data,
            //   // loader: false,
            //   // isError: true,
            // });
            // setData([]);
            Alert.alert("Wrong Input!", "Incorrect Credentials", [
              { text: "Okay" },
            ]);
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
    
    React.useEffect(fetchData,
      []); 
    

    return (
      <Animated.View
        style={[
          {
            height: 80,
            width: '90%',
            // backgroundColor: '#78CAD2',
            backgroundColor : '#ffff',
            alignSelf: 'center',
            borderRadius: 15,
            marginTop: 20,
          },
          rStyle,
        ]}
      >
<View>
        <View style = {{flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
        {/* {
                        data.map(item => {
                            return (<Text>{item.id}</Text>);
                        })
                    } */}
            <Text style= {styles.row}> {item.name} </Text>
            {/* <Text style={styles.row}>{item.title}</Text> */}
            {/* <Text style={styles.row}> Data</Text> */}
            <Text style= {styles.data}> {item.value}</Text>
        </View>
        {/* <View style = {styles.data}>
        {isExpanded && <Text style={styles.row}>{item.name}</Text>} */}
        {/* </View> */}
        </View>
        </Animated.View>
        
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  table: { flex: 1, paddingTop: 100, backgroundColor: '#F6F1F1' },
    head: { height: 44, backgroundColor: '#C1DEEB' },
    row: {  backgroundColor: '#fff', fontWeight: "bold" },
    data: { height: 40, backgroundColor: '#fff', fontWeight: "bold", alignItems: 'flex-end' },
    // details: {''}
    emptyrow: { height: 40, backgroundColor: '#F6F1F1' },
});

export { ListItem };