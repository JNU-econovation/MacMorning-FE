import React from 'react';
import styled from 'styled-components/native';
import BottomSheet from '../../components/common/bottomSheet/CustomBottomSheet';
import BottomBar from '../../components/common/bottomBar/BottomBar';
import HomeBackground from './HomeBackground';
import HomeView from './HomeView';

function Home(): React.JSX.Element {
  return (
    <MainContainer>
      <BottomSheet
        BackgroundComponent={HomeBackground}
        ViewComponent={HomeView}
      />
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
