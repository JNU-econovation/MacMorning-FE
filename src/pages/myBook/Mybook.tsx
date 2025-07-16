import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Mybook(): React.JSX.Element {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('ShareBook', { props: { bookId: 39 } })}
        style={{ 
          backgroundColor: 'blue', 
          padding: 20, 
          borderRadius: 10 
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          ShareBook 테스트
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Mybook;