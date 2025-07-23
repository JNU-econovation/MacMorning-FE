import React, {useState} from 'react';
import {Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import {useNavigation} from '@react-navigation/native';
import signin from '@/apis/auth/signin';
import {useAuth} from '@/hooks/useAuth';
import {CommonActions} from '@react-navigation/native';
import {useAuthStore} from '@/store/authStore';
import {KeyboardAvoidingView} from 'react-native';

const Login = (): React.JSX.Element => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {setAuth} = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setLogin} = useAuth();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={0}>
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
              <Input
                placeholder="아이디"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </InputContainer>
            <LoginButton
              activeOpacity={1}
              style={{backgroundColor: COLORS.primary}}
              onPress={async () => {
                const response = await signin({
                  email: email,
                  password: password,
                });
                if (response) {
                  setLogin(response.accessToken, response.refreshToken);
                  setAuth(response.accessToken, response.refreshToken);
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'MainTabs', params: {screen: 'Home'}}],
                    }),
                  );
                }
              }}>
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
                onPress={() => {
                  navigation.navigate('Signin');
                }}
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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

const LoginButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${scale(23)}px;
  border-radius: ${scale(20)}px;
`;

export default Login;
