import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Animated, Easing} from 'react-native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';

type Props = {
  onToggle: () => void;
  isOn: boolean;
};

const Toggle = ({onToggle, isOn}: Props) => {
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
    outputRange: [scale(1), scale(17)],
  });

  const color = isOn ? COLORS.primary : COLORS.background.lightGray;

  return (
    <ToggleContainer activeOpacity={1} onPress={onToggle} color={color}>
      <ToggleWheel
        style={{
          transform: [{translateX}],
        }}
      />
    </ToggleContainer>
  );
};

export default Toggle;

const ToggleContainer = styled.TouchableOpacity<{color: string}>`
  width: ${scale(36)}px;
  height: ${scale(20)}px;
  border-radius: ${scale(10)}px;
  justify-content: center;
  background-color: ${(props: {color: string}) => props.color};
`;

const ToggleWheel = styled(Animated.View)`
  width: ${scale(18)}px;
  height: ${scale(18)}px;
  background-color: white;
  border-radius: 99px;
`;
