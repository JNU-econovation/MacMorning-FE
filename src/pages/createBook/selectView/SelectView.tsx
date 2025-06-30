import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';

const SelectView = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return <SelectViewContainer>{children}</SelectViewContainer>;
};

const SelectViewContainer = styled.View`
  margin: 0 ${scale(30)}px;
  justify-content: center;
  align-items: center;
  padding: 0 ${scale(30)}px;
  height: 50%;
  background-color: ${COLORS.background.white};
  border-radius: ${scale(20)}px;
  shadow-color: #000;
  shadow-offset: 0px ${scale(2)}px;
  shadow-opacity: 0.1;
  shadow-radius: ${scale(3)}px;
  elevation: 5;
`;

export default SelectView;
