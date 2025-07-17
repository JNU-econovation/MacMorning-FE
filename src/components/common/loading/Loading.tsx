import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';

const Loading = () => {
  return (
    <LoadingContainer>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Loading;
