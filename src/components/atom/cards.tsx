// import * as React from 'react';
// import { Avatar, Card, IconButton } from 'react-native-paper';

// const CardComponent = () => (
//   <Card.Title
//     title="Card Title"
//     subtitle="Card Subtitle"
//     left={(props : object) => <Avatar.Icon {...props} icon="folder" />}
//     right={(props : object) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
//   />
// );

// export default CardComponent;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style, }}>{props.children}
            
      </View>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  }
});
export default Card;
