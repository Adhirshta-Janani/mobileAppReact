import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import TabsComponents from './Tabs';
import Accordions from './according';
import Dropdown from './dropdown';
// const DSPTableScoreCard = () => {
//     return (
//         // <ScrollView horizontal>
//         <View style={styles.container}>
//           {/* <Dropdown label={'Select Attribute'} /> */}
//           <View>
//           <DataTable>
//             <DataTable.Header style={styles.head}>
//                     <DataTable.Title>DA Weekly Metrics</DataTable.Title>
//                     <DataTable.Title numeric >40</DataTable.Title>
//                     <DataTable.Title numeric>39</DataTable.Title>
//                     <DataTable.Title numeric>38</DataTable.Title>
//                 </DataTable.Header>
//                 <DataTable.Row style={styles.emptyrow}>
                
//                 </DataTable.Row>
//                 </DataTable>
//           </View>
//           <View>
//             <DataTable>
//             <DataTable.Header style={styles.head}>
//                     <DataTable.Title>Mentor</DataTable.Title>
//                     <DataTable.Title numeric>40</DataTable.Title>
//                     <DataTable.Title numeric>39</DataTable.Title>
//                     <DataTable.Title numeric>38</DataTable.Title>
//                     <DataTable.Title numeric>38</DataTable.Title>
//                     <DataTable.Title numeric>38</DataTable.Title>
//                     <DataTable.Title numeric>38</DataTable.Title>
//                 </DataTable.Header>
//                 <DataTable.Row style={styles.row}>
//                     <DataTable.Cell>Mentor FISCO Score</DataTable.Cell>
//                     <DataTable.Cell> </DataTable.Cell>
//                     <DataTable.Cell numeric style = {{backgroundColor: '#A3C9A8'}}>850</DataTable.Cell>
//                     <DataTable.Cell numeric>850</DataTable.Cell>
//                     <DataTable.Cell numeric>850</DataTable.Cell>
//                     <DataTable.Cell numeric>850</DataTable.Cell>
//                     <DataTable.Cell numeric>850</DataTable.Cell>
//                     <DataTable.Cell numeric>850</DataTable.Cell>
//                 </DataTable.Row>
//                 <DataTable.Row style={styles.row}>
//                     <DataTable.Cell>Acceleration</DataTable.Cell>
//                     <DataTable.Cell> </DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                 </DataTable.Row>
//                 <DataTable.Row style={styles.row}>
//                     <DataTable.Cell>Braking</DataTable.Cell>
//                     <DataTable.Cell> </DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                 </DataTable.Row>
//                 <DataTable.Row style={styles.row}>
//                     <DataTable.Cell>Cornering</DataTable.Cell>
//                     <DataTable.Cell> </DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                     <DataTable.Cell numeric style = {{backgroundColor: '#69C3DE'}}>0</DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                     <DataTable.Cell numeric>0</DataTable.Cell>
//                 </DataTable.Row>
//                 <DataTable.Row style={styles.row}>
//                     <DataTable.Cell>Speeding</DataTable.Cell>
//                     <DataTable.Cell> </DataTable.Cell>
//                     <DataTable.Cell numeric>N/A</DataTable.Cell>
//                     <DataTable.Cell numeric>N/A</DataTable.Cell>
//                     <DataTable.Cell numeric>N/A</DataTable.Cell>
//                     <DataTable.Cell numeric>N/A</DataTable.Cell>
//                     <DataTable.Cell numeric>N/A</DataTable.Cell>
//                 </DataTable.Row>
//                 <DataTable.Row style={styles.row}>
//                     <DataTable.Cell>Distraction</DataTable.Cell>
//                     <DataTable.Cell> </DataTable.Cell>
//                     <DataTable.Cell numeric>18</DataTable.Cell>
//                     <DataTable.Cell numeric>18</DataTable.Cell>
//                     <DataTable.Cell numeric>18</DataTable.Cell>
//                     <DataTable.Cell numeric>18</DataTable.Cell>
//                     <DataTable.Cell numeric>18</DataTable.Cell>
//                 </DataTable.Row>
//                 <DataTable.Row style={styles.row}>
//                     <DataTable.Cell>Seatbelt</DataTable.Cell>
//                     <DataTable.Cell> </DataTable.Cell>
//                     <DataTable.Cell numeric>14</DataTable.Cell>
//                     <DataTable.Cell numeric>14</DataTable.Cell>
//                     <DataTable.Cell numeric>14</DataTable.Cell>
//                     <DataTable.Cell numeric>14</DataTable.Cell>
//                     <DataTable.Cell numeric>14</DataTable.Cell>
//                 </DataTable.Row>
//                 <DataTable.Row style={styles.row}>
//                 </DataTable.Row>
                

//             </DataTable>
//           </View>
//           </View>
//         //   </ScrollView>
        
//     )
// }
// const styles = StyleSheet.create({
//     container: { flex: 1, paddingTop: 100, paddingBottom: 100, paddingHorizontal: 30,backgroundColor: '#F6F1F1' },

//     table: { flex: 1, paddingTop: 100, backgroundColor: '#F6F1F1' },
//     head: { height: 44, backgroundColor: '#C1DEEB' },
//     row: { height: 40, backgroundColor: '#fff', fontWeight: "bold" },
//     emptyrow: { height: 40, backgroundColor: '#F6F1F1' },
//     // coloraverage: {color: 'black', font}
// })
// export default DSPTableScoreCard

const DSPTableScoreCard = () => {
    return (

        <View style={styles.container}>
            {/* <Dropdown label={'Select Attribute'} /> */}
                   <View>
                   {/* <ScrollView> */}
                     <DataTable>
                     <DataTable.Header style={styles.head}>
                             <DataTable.Title>Overall Standing</DataTable.Title>
                             <DataTable.Title numeric> </DataTable.Title>
                         </DataTable.Header>
                         <DataTable.Row style={styles.row}>
                             <DataTable.Cell>Mentor Score</DataTable.Cell>
                             <DataTable.Cell numeric>  </DataTable.Cell>  
                         </DataTable.Row>
                         <DataTable.Row style={styles.row}>
                             <DataTable.Cell>Seat Belt Violations</DataTable.Cell>
                             <DataTable.Cell numeric>Fantastic</DataTable.Cell>
                         </DataTable.Row>
                         <DataTable.Row style={styles.row}>
                             <DataTable.Cell>Speeding Violations</DataTable.Cell>
                             <DataTable.Cell numeric>0</DataTable.Cell>              
                         </DataTable.Row>
                         <DataTable.Row style={styles.row}>
                             <DataTable.Cell>Sign/Signal Violations</DataTable.Cell>
                             <DataTable.Cell numeric style = {{backgroundColor: '#69C3DE'}}>0</DataTable.Cell>
                         </DataTable.Row>
                         <DataTable.Row style={styles.row}>
                             <DataTable.Cell>Distraction Rate</DataTable.Cell>
                             <DataTable.Cell numeric>N/A</DataTable.Cell>
                         </DataTable.Row>
                         <DataTable.Row style={styles.row}>
                             <DataTable.Cell>Following Distance Rate</DataTable.Cell>
                             <DataTable.Cell numeric>18</DataTable.Cell>
                         </DataTable.Row>
                         <DataTable.Row style={styles.row}>
                             <DataTable.Cell>Delivery Completion Rate</DataTable.Cell>
                             <DataTable.Cell numeric>18</DataTable.Cell>
                         </DataTable.Row>
                         <DataTable.Row style={styles.row}>
                             <DataTable.Cell>Customer Delivery Feedback Score</DataTable.Cell>
                             <DataTable.Cell numeric>18</DataTable.Cell>
                         </DataTable.Row>
                         <DataTable.Row style={styles.row}>
                             <DataTable.Cell>Deliveried Not Received</DataTable.Cell>
                             <DataTable.Cell numeric>18</DataTable.Cell>
                         </DataTable.Row>
                         <DataTable.Row style={styles.row}>
                             <DataTable.Cell>Contact Compliance</DataTable.Cell>
                             <DataTable.Cell numeric>18</DataTable.Cell>
                         </DataTable.Row>
                         <DataTable.Row style={styles.row}>
                             <DataTable.Cell>Photo on Delivery Rate</DataTable.Cell>
                             <DataTable.Cell numeric>18</DataTable.Cell>
                         </DataTable.Row>
                         <DataTable.Row style={styles.row}>
                         </DataTable.Row>
                     </DataTable>
                     {/* </ScrollView> */}
                   </View>
                   </View>
 
    )}

    const styles = StyleSheet.create({
    container: {  paddingTop: 50, paddingBottom: 100, paddingHorizontal: 30,backgroundColor: '#F6F1F1' },

    table: { flex: 1, paddingTop: 100, backgroundColor: '#F6F1F1' },
    head: { height: 44, backgroundColor: '#C1DEEB' },
    row: { height: 40, backgroundColor: '#fff', fontWeight: "bold" },
    emptyrow: { height: 40, backgroundColor: '#F6F1F1' },
    // coloraverage: {color: 'black', font}
})

    export default DSPTableScoreCard
