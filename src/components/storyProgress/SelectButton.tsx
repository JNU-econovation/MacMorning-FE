import React, {useState} from 'react';
import styled from 'styled-components/native';
import CustomText from '@/utils/CustomText';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';

const SelectButton = ({
  onPress,
  selectScript,
  isDisabled,
  isSelected = false,
}: {
  onPress: () => void;
  selectScript: string;
  isDisabled: boolean;
  isSelected?: boolean;
}) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <ButtonContainer
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      isPressed={isPressed}
      isSelected={isSelected}
      disabled={isDisabled}>
      <ButtonText font="NPSfont_regular">{selectScript}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.Pressable<{
  isPressed: boolean;
  isSelected: boolean;
}>`
  width: 90%;
  background-color: ${COLORS.background.white};
  padding: ${scale(5)}px ${scale(15)}px;
  border-radius: ${scale(30)}px;
  justify-content: center;
  align-items: center;
  border: 2px solid
    ${({isPressed, isSelected}: {isPressed: boolean; isSelected: boolean}) =>
      isPressed || isSelected ? COLORS.primary : COLORS.text.secondary};
`;

const ButtonText = styled(CustomText)`
  font-size: ${scale(8)}px;
  color: #000;
`;

export default SelectButton;
