import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Animated, Easing} from 'react-native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';

type Props = {
  onToggle: () => void;
  isOn: boolean;
  label: string;
};

const GenderToggle = ({onToggle, isOn, label}: Props) => {
  const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isOn, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [scale(1), scale(24)],
  });

  const color = isOn ? COLORS.primary : COLORS.background.lightGray;

  return (
    <GenderToggleContainer>
      <CustomText>{label}</CustomText>
      <ToggleContainer activeOpacity={1} onPress={onToggle} color={color}>
        <ToggleTextContainer style={{left: 0}}>
          <CustomText font="NPSfont_regular">남자</CustomText>
        </ToggleTextContainer>
        <ToggleTextContainer style={{right: 0}}>
          <CustomText font="NPSfont_regular">여자</CustomText>
        </ToggleTextContainer>
        <ToggleWheel
          style={{
            transform: [{translateX}],
          }}
        />
      </ToggleContainer>
    </GenderToggleContainer>
  );
};

export default GenderToggle;

const GenderToggleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ToggleContainer = styled.TouchableOpacity<{color: string}>`
  width: ${scale(50)}px;
  height: ${scale(20)}px;
  border-radius: ${scale(2)}px;
  justify-content: center;
  background-color: ${COLORS.background.lightGray};
`;

const ToggleTextContainer = styled.View`
  position: absolute;
  width: ${scale(25)}px;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

const ToggleWheel = styled(Animated.View)`
  width: ${scale(25)}px;
  height: ${scale(17)}px;
  background-color: white;
  border-radius: ${scale(2)}px;
`;
