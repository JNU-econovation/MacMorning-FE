import React from 'react';
import styled from 'styled-components/native';
import {Text, View, useWindowDimensions} from 'react-native';
import Header from '../components/header/Header';
import {SafeAreaView} from 'react-native';

function Main(): React.JSX.Element {
  return (
    <SafeAreaView className="bg-white">
      <Header title="이야기 도서관" headerType="default" />
    </SafeAreaView>
  );
}

export default Main;
