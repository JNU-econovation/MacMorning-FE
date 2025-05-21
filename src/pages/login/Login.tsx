import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';

const Login = (): React.JSX.Element => {
  return (
    <LoginContainer>
      <LoginBox>
        <LoginTitleContainer>
          <CustomText font="NanumSquareNeo-eHv" style={{fontSize: 25}}>
            로그인
          </CustomText>
          <CustomText
            font="NanumSquareNeo-cBd"
            style={{fontSize: 15, color: COLORS.text.secondary}}>
            환영합니다.
          </CustomText>
        </LoginTitleContainer>
        <InputContainer>
          <Input placeholder="아이디" />
          <Input placeholder="비밀번호" />
        </InputContainer>
        <LoginButton
          activeOpacity={1}
          style={{backgroundColor: COLORS.primary}}>
          <CustomText
            font="NanumSquareNeo-dEb"
            style={{fontSize: 15, color: COLORS.background.white}}>
            로그인
          </CustomText>
        </LoginButton>

        {/* 현재 임시 스타일링 작업을 위해 작성해놓은 코드 추후 컴포넌트 분리 및 수정 필요 */}
        <LoginButtonsContainer>
          <LoginButton
            activeOpacity={1}
            style={{backgroundColor: COLORS.background.lightGray}}>
            <CustomText
              font="NanumSquareNeo-dEb"
              style={{fontSize: 15, color: COLORS.text.primary}}>
              구글 로그인
            </CustomText>
          </LoginButton>
          <LoginButton
            activeOpacity={1}
            style={{backgroundColor: COLORS.background.lightGray}}>
            <CustomText
              font="NanumSquareNeo-dEb"
              style={{fontSize: 15, color: COLORS.text.primary}}>
              회원가입
            </CustomText>
          </LoginButton>
        </LoginButtonsContainer>
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
  width: 40%;
  height: 80%;
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
  padding: ${scale(10)}px;
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

const LoginButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${scale(23)}px;
  border-radius: ${scale(20)}px;
`;

export default Login;
