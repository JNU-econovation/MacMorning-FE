import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView, Text, View, ScrollView} from 'react-native';
import Header from '../../components/common/header/Header';
import {colors} from '../../constants/colors';
import BottomSheet from '../../components/common/bottomSheet/CustomBottomSheet';
import BottomBar from '../../components/common/bottomBar/BottomBar';
import HomeBackground from './HomeBackground';

function Home(): React.JSX.Element {
  return (
    <MainContainer>
      <BottomSheet BackgroundComponent={HomeBackground} />
      <BottomBar />
    </MainContainer>
  );
}

const MainContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

export default Home;
