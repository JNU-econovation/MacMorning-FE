import React from 'react';
import Header from '@/components/common/header/Header';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import StoryProgressView from './StoryProgressView';

const StoryProgress = () => {
  return (
    <StoryProgressContainer>
      <Header title="이야기 진행" headerType="progress" />
      <StoryProgressViewContainer>
        <StoryProgressView />
      </StoryProgressViewContainer>
    </StoryProgressContainer>
  );
};

const StoryProgressContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const StoryProgressViewContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${scale(20)}px;
`;

export default StoryProgress;
