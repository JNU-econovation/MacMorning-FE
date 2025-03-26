import React from 'react';
import styled from 'styled-components/native';
import {Text, View, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native';
import Main from './src/pages/Main';
function App(): React.JSX.Element {
  return (
    <SafeAreaView className="bg-white">
      <Main />
    </SafeAreaView>
  );
}

export default App;
