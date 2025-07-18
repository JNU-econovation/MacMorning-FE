import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import {scale} from 'react-native-size-matters';

const Loading = ({script}: {script?: string}) => {
  return (
    <LoadingContainer>
      <ActivityIndicator size="large" color={COLORS.primary} />
      {script && (
        <CustomText
          font="NPSfont_regular"
          style={{
            textAlign: 'center',
            fontSize: scale(9),
            color: COLORS.text.primary,
          }}>
          {script}
        </CustomText>
      )}
    </LoadingContainer>
  );
};

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  gap: ${scale(10)}px;
  align-items: center;
`;

export default Loading;
