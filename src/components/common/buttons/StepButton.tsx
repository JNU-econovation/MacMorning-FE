import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';

type StepButtonProps = {
  onPress: () => void;
  text: string;
};

const StepButton = ({onPress, text}: StepButtonProps): React.JSX.Element => {
  return (
    <StepButtonContainer onPress={onPress}>
      <CustomText
        style={{fontSize: scale(8), color: COLORS.text.white}}
        font="NPSfont_bold">
        {text}
      </CustomText>
    </StepButtonContainer>
  );
};

export default StepButton;

const StepButtonContainer = styled.TouchableOpacity`
  width: ${scale(40)}px;
  height: ${scale(20)}px;
  border-radius: ${scale(4)}px;
  background-color: ${COLORS.primary};
  justify-content: center;
  align-items: center;
`;
