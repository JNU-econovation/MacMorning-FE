import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';

const ImageButton = ({text, onPress}: {text: string; onPress: () => void}) => {
  return (
    <ImageButtonContainer onPress={onPress}>
      <ImageButtonText>{text}</ImageButtonText>
    </ImageButtonContainer>
  );
};

const ImageButtonContainer = styled.TouchableOpacity`
  width: ${scale(150)}px;
  height: ${scale(100)}px;
  background-color: ${COLORS.background.lightGray};
  border-radius: ${scale(10)}px;
  border: 2px solid ${COLORS.text.secondary};
  justify-content: center;
  align-items: center;
  opacity: 0.5;
`;

const ImageButtonText = styled(CustomText)`
  font-size: ${scale(9)}px;
  color: ${COLORS.text.primary};
`;

export default ImageButton;
