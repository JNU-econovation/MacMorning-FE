import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {colors} from '../../../constants/colors';
import {Text} from 'react-native';
import PlusSVG from '../../../assets/images/plus.svg';

interface BottomBarPlusButtonProps {
  buttonName: string;
  onPress: () => void;
}

const BottomBarPlusButton = ({
  buttonName,
  onPress,
}: BottomBarPlusButtonProps): React.JSX.Element => {
  return (
    <BottomBarPlusButtonContainer
      style={{
        transform: [{translateX: -scale(22.5)}],
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <Text
        style={{
          color: colors.text.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PlusSVG
          width={scale(20)}
          height={scale(20)}
          strokeWidth={scale(1.2)}
          stroke={colors.text.white}
        />
      </Text>
    </BottomBarPlusButtonContainer>
  );
};

// 현재 보더가 inner로 빠지는 문제가 있음
const BottomBarPlusButtonContainer = styled.TouchableOpacity`
  z-index: 100;
  width: ${scale(45)}px;
  height: ${scale(45)}px;
  justify-content: center;
  align-items: center;
  border-width: ${scale(3)}px;
  border-radius: ${scale(100)}px;
  background-color: ${colors.primary};
  border-color: ${colors.background.white};
  position: absolute;
  bottom: ${scale(10)}px;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: ${scale(3)}px;
  left: 50%;
`;

export default BottomBarPlusButton;
