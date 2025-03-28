import React from 'react';
import styled from 'styled-components/native';
import {
  SafeAreaView,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Header from '../components/common/header/Header';
import {colors} from '../constants/colors';

function Main(): React.JSX.Element {
  return (
    <MainContainer className="bg-white">
      <Header title="이야기 도서관" headerType="default" />
      <ScrollView>
        <View className="bg-red-500">
          <Text>Hello</Text>
        </View>
      </ScrollView>
    </MainContainer>
  );
}

const MainContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export default Main;
