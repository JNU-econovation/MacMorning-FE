import React from 'react';
import {TextInput, View, StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';

type Props = {
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

const CharacterSelectInput = ({value, onChange, style}: Props) => {
  return (
    <CharacterSelectInputContainer style={style}>
      <CharacterSelectInputInput value={value} onChangeText={onChange} />
    </CharacterSelectInputContainer>
  );
};

const CharacterSelectInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CharacterSelectInputInput = styled.TextInput`
  width: 100%;
  height: 100%;
  border-radius: ${scale(10)}px;
  border-width: 1px;
  border-color: ${COLORS.background.lightGray};
  padding: ${scale(5)}px;
`;

export default CharacterSelectInput;
