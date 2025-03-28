import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {colors} from '../../../constants/colors';
import {Text} from 'react-native';
import CustomText from '../../../utils/CustomText';

interface BottomBarButtonProps {
  icon: React.ReactNode;
  buttonName: string;
  onPress: () => void;
}

const BottomBarButton = ({
  icon,
  buttonName,
  onPress,
}: BottomBarButtonProps): React.JSX.Element => {
  return (
    <BottomBarButtonContainer onPress={onPress}>
      <Text
        style={{
          color: colors.text.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {icon}
      </Text>
      <CustomText font="NPSfont_regular" style={{fontSize: scale(7)}}>
        {buttonName}
      </CustomText>
    </BottomBarButtonContainer>
  );
};

const BottomBarButtonContainer = styled.TouchableOpacity`
  width: 20%;
  justify-content: center;
  align-items: center;
  gap: ${scale(2)}px;
`;

export default BottomBarButton;
