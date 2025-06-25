import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import AlertCircle from '@/assets/images/guestView/alert-circle.svg';
import CustomText from '@/utils/CustomText';
import {COLORS} from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';

const GuestView = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleLoginNavigate = () => {
    navigation.navigate('Login');
  };

  return (
    <GuestViewContainer>
      <AlertCircle
        width={scale(24)}
        height={scale(24)}
        color={COLORS.primary}
      />
      <CustomText
        font="NanumSquareNeo-cBd"
        style={{color: COLORS.text.primary, fontSize: scale(10)}}>
        로그인이 필요한 서비스입니다.
      </CustomText>
      <LoginNavigateButton activeOpacity={1} onPress={handleLoginNavigate}>
        <CustomText
          font="NanumSquareNeo-dEb"
          style={{color: COLORS.primary, fontSize: scale(6)}}>
          로그인하러 가기
        </CustomText>
      </LoginNavigateButton>
    </GuestViewContainer>
  );
};

const GuestViewContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  width: ${scale(375)}px;
  height: ${scale(80)}px;
  gap: ${scale(8)}px;
  margin-bottom: ${scale(20)}px;
`;

const LoginNavigateButton = styled.TouchableOpacity`
  margin-top: ${scale(5)}px;
  justify-content: center;
  align-items: center;
  width: ${scale(100)}px;
  height: ${scale(20)}px;
  background-color: ${COLORS.background.white};
  border-radius: ${scale(15)}px;
  border: ${scale(1)}px solid ${COLORS.primary};
`;
export default GuestView;
