/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Header from './src/components/common/Header';
import {Text, useWindowDimensions, View} from 'react-native';

function App(): React.JSX.Element {
  const {width, height} = useWindowDimensions();
  return (
    <View className="bg-white p-4" style={{width, height}}>
      <Header title="MacMorning" headerType="default" />
    </View>
  );
}

export default App;
