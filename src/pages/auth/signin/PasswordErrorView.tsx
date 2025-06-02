import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';

const PasswordErrorView = () => {
  return (
    <PasswordErrorViewContainer>
      <CustomText>비밀번호가 일치하지 않습니다.</CustomText>
    </PasswordErrorViewContainer>
  );
};

const PasswordErrorViewContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default PasswordErrorView;
