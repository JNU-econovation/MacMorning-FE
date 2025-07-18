import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';

type StepButtonProps = {
  onPress: () => void;
  text: string;
  disabled?: boolean;
};

const StepButton = ({onPress, text, disabled = false}: StepButtonProps): React.JSX.Element => {
  return (
    <StepButtonContainer 
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <CustomText
        style={{
          fontSize: scale(8), 
          color: disabled ? COLORS.text.secondary : COLORS.text.white
        }}
        font="NPSfont_bold">
        {text}
      </CustomText>
    </StepButtonContainer>
  );
};

export default StepButton;

const StepButtonContainer = styled.TouchableOpacity<{ disabled: boolean }>`
  width: ${scale(40)}px;
  height: ${scale(20)}px;
  border-radius: ${scale(4)}px;
  background-color: ${(props: { disabled: boolean }) => 
    props.disabled ? COLORS.background.lightGray : COLORS.primary};
  justify-content: center;
  align-items: center;
  opacity: ${(props: { disabled: boolean }) => props.disabled ? 0.6 : 1};
`;