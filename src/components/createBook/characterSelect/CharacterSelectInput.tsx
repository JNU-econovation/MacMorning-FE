import React from 'react';
import {TextInput, View} from 'react-native';
import CustomText from '@/utils/CustomText';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const CharacterSelectInput = ({label, value, onChange}: Props) => {
  return (
    <CharacterSelectInputContainer>
      <CustomText>{label}</CustomText>
      <CharacterSelectInputInput value={value} onChangeText={onChange} />
    </CharacterSelectInputContainer>
  );
};

const CharacterSelectInputContainer = styled.View`
  width: 20%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CharacterSelectInputInput = styled.TextInput`
  width: ${scale(100)}px;
  height: ${scale(20)}px;
  background-color: ${COLORS.background.lightGray};
  border-radius: ${scale(10)}px;
  padding: ${scale(1)}px;
`;

export default CharacterSelectInput;
