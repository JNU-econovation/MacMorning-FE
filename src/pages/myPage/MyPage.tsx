import React, {useState} from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {useAuthStore} from '@/store/authStore';

const MyPage = (): React.JSX.Element => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {setAuth} = useAuthStore();

  return (
    <LoginContainer>
      <LoginBox>
        <LoginTitleContainer>
          <CustomText font="NanumSquareNeo-eHv" style={{fontSize: 25}}>
            마이페이지
          </CustomText>
          <CustomText
            font="NanumSquareNeo-cBd"
            style={{fontSize: 15, color: COLORS.text.secondary}}>
            현재 마이페이지는 준비중입니다.
          </CustomText>
        </LoginTitleContainer>

        <LogoutButton
          activeOpacity={1}
          style={{backgroundColor: COLORS.primary}}
          onPress={async () => {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
            setAuth('', '');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'MainTabs', params: {screen: 'Home'}}],
              }),
            );
          }}>
          <CustomText
            font="NanumSquareNeo-dEb"
            style={{fontSize: 15, color: COLORS.background.white}}>
            로그아웃
          </CustomText>
        </LogoutButton>
      </LoginBox>
    </LoginContainer>
  );
};

const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.background.white};
`;

const LoginBox = styled.View`
  width: ${scale(200)}px;
  height: ${scale(400)}px;
  gap: ${scale(15)}px;
  border-radius: ${scale(10)}px;
  padding: ${scale(15)}px;
  justify-content: center;
  align-items: center;
`;

const LoginTitleContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: ${scale(5)}px;
`;

const InputContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: ${scale(5)}px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: ${scale(23)}px;
  border-radius: ${scale(20)}px;
  border-width: ${scale(0.7)}px;
  border-color: ${COLORS.text.secondary};
  padding-left: ${scale(10)}px;
`;

const LoginButtonsContainer = styled.View`
  padding-top: ${scale(10)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: ${scale(5)}px;
  border-top-width: ${scale(0.3)}px;
  border-color: ${COLORS.text.secondary};
`;

const LogoutButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${scale(23)}px;
  border-radius: ${scale(20)}px;
`;

export default MyPage;
