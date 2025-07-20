import React from 'react';
import styled from 'styled-components/native';
import CustomText from '@/utils/CustomText';

const PasswordNotMatchErrorView = () => {
  return (
    <PasswordErrorViewContainer>
      <CustomText>비밀번호가 일치하지 않습니다.</CustomText>
    </PasswordErrorViewContainer>
  );
};

const EmailErrorView = () => {
  return (
    <EmailErrorViewContainer>
      <CustomText>이메일 형식이 올바르지 않습니다.</CustomText>
    </EmailErrorViewContainer>
  );
};

const PasswordErrorView = () => {
  return (
    <PasswordErrorViewContainer>
      <CustomText>
        비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.
      </CustomText>
    </PasswordErrorViewContainer>
  );
};

const EmailErrorViewContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const PasswordErrorViewContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export {PasswordNotMatchErrorView, EmailErrorView, PasswordErrorView};
