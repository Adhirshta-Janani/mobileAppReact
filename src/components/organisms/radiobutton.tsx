import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';

const RadioButtonListItem = ({ item, selectedOption, onSelect }) => {
  const handleSelect = () => {
    onSelect(item.id);
  };

  return (
    <TouchableOpacity onPress={handleSelect}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
        <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
          {selectedOption === item.id && (
            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: 'black' }} />
          )}
        </View>
        <Text style={{ marginLeft: 10 }}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MyComponent = () => {
  const [items, setItems] = useState([
    { id: 1, label: 'Yes' },
    { id: 2, label: 'No' },
    // Add more items as needed
  ]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (itemId) => {
    setSelectedOption(itemId);
  };

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <RadioButtonListItem item={item} selectedOption={selectedOption} onSelect={handleSelect} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default MyComponent;
