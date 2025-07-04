import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import PlusCircle from '@/assets/images/storyProgress/plus-circle.svg';

const ImageButton = ({text, onPress}: {text: string; onPress: () => void}) => {
  return (
    <ImageButtonContainer onPress={onPress}>
      <PlusCircle
        width={scale(20)}
        height={scale(20)}
        color={COLORS.text.primary}
      />
      <ImageButtonText font="NanumSquareNeo-dEb">{text}</ImageButtonText>
    </ImageButtonContainer>
  );
};

const ImageButtonContainer = styled.TouchableOpacity`
  width: ${scale(140)}px;
  height: ${scale(90)}px;
  background-color: ${COLORS.secondary};
  border-radius: ${scale(10)}px;
  justify-content: center;
  align-items: center;
  gap: ${scale(5)}px;
  opacity: 0.3;
`;

const ImageButtonText = styled(CustomText)`
  font-size: ${scale(9)}px;
  color: ${COLORS.text.primary};
`;

export default ImageButton;
