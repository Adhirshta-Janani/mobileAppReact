import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loader = ({size}) => (
  <ActivityIndicator size={size} animating={true} color={MD2Colors.blue700} />
);

export default Loader;