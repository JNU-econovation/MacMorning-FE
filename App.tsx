import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import styled from 'styled-components/native';
import {Text, View, useWindowDimensions} from 'react-native';
import Home from './src/pages/home/Home';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Home />
    </GestureHandlerRootView>
  );
}

export default App;
