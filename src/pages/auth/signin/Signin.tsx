import React, {useState, useEffect} from 'react';
import {ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {
  PasswordNotMatchErrorView,
  EmailErrorView,
  PasswordErrorView,
} from './ValidateView';
import signup from '@/apis/auth/signup';
import {validateEmail, validatePassword} from '@/utils/validator/validator';

const Signin = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const navigation = useNavigation<RootStackNavigationProp>();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordNotMatchError, setPasswordNotMatchError] = useState(false);

  useEffect(() => {
    if (!validateEmail(email) && email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!validatePassword(password) && password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (password !== passwordCheck) {
      setPasswordNotMatchError(true);
    } else {
      setPasswordNotMatchError(false);
    }
  }, [email, password, passwordCheck]);

  const hadleSignup = async () => {
    if (emailError || passwordError || passwordNotMatchError) {
      return;
    }
    const result = await signup({
      email: email,
      password: password,
      nickname: nickname,
      username: username,
      phone_number: phoneNumber,
    });
    if (result) {
      Alert.alert('알림', '회원가입 성공.');
      navigation.goBack();
    } else {
      Alert.alert('오류', '회원가입 실패.');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={0}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: COLORS.background.white,
        }}
        contentContainerStyle={{flexGrow: 1}}>
        <SigninContainer>
          <LoginBox>
            <LoginTitleContainer>
              <CustomText font="NanumSquareNeo-eHv" style={{fontSize: 25}}>
                계정 생성
              </CustomText>
              <CustomText
                font="NanumSquareNeo-cBd"
                style={{fontSize: 15, color: COLORS.text.secondary}}>
                시작해보세요.
              </CustomText>
            </LoginTitleContainer>
            <InputContainer>
              <Input
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
              />
              {emailError && <EmailErrorView />}
              <Input
                placeholder="비밀번호"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              {passwordError && <PasswordErrorView />}
              {password && (
                <Input
                  placeholder="비밀번호 확인"
                  secureTextEntry={true}
                  value={passwordCheck}
                  onChangeText={setPasswordCheck}
                />
              )}
              {passwordNotMatchError && <PasswordNotMatchErrorView />}
            </InputContainer>
            <InputContainer>
              <InputLabel font="NanumSquareNeo-dEb">이름</InputLabel>
              <Input
                placeholder="이름"
                value={username}
                onChangeText={setUsername}
              />
              <InputLabel font="NanumSquareNeo-dEb">전화번호</InputLabel>
              <Input
                placeholder="전화번호"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <InputLabel font="NanumSquareNeo-dEb">닉네임</InputLabel>
              <Input
                placeholder="닉네임"
                value={nickname}
                onChangeText={setNickname}
              />
            </InputContainer>
            <LoginButtonsContainer>
              <LoginButton
                activeOpacity={1}
                style={{backgroundColor: COLORS.primary}}
                onPress={() => {
                  hadleSignup();
                }}>
                <CustomText
                  font="NanumSquareNeo-dEb"
                  style={{fontSize: 15, color: COLORS.background.white}}>
                  회원가입
                </CustomText>
              </LoginButton>
              <LoginButton
                activeOpacity={1}
                style={{backgroundColor: COLORS.background.white}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <CustomText
                  font="NanumSquareNeo-dEb"
                  style={{fontSize: 15, color: COLORS.primary}}>
                  돌아가기
                </CustomText>
              </LoginButton>
            </LoginButtonsContainer>
          </LoginBox>
        </SigninContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const SigninContainer = styled.View`
  width: 100%;
  min-height: 100%;
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

const InputLabel = styled(CustomText)`
  width: 100%;
  text-align: left;
  padding-left: ${scale(6)}px;
  margin-top: ${scale(5)}px;
  font-size: ${scale(7)}px;
`;

const LoginButtonsContainer = styled.View`
  padding-top: ${scale(10)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: ${scale(5)}px;
`;

const LoginButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${scale(23)}px;
  border-radius: ${scale(20)}px;
`;

export default Signin;
