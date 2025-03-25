import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, Text} from 'react-native';

interface HeaderProps {
  title: string;
  headerType: 'default' | 'create' | 'progress' | 'ending';
}

const Header = ({title, headerType}: HeaderProps) => {
  if (headerType === 'default') {
    return (
      <HeaderWrapper>
        <HeaderTitle>{title}</HeaderTitle>
      </HeaderWrapper>
    );
  }

  if (headerType === 'create') {
    return (
      <HeaderWrapper>
        <HeaderTitle>{title}</HeaderTitle>
      </HeaderWrapper>
    );
  }

  if (headerType === 'progress') {
    return (
      <HeaderWrapper>
        <HeaderTitle>{title}</HeaderTitle>
      </HeaderWrapper>
    );
  }

  if (headerType === 'ending') {
    return (
      <HeaderWrapper>
        <HeaderTitle>{title}</HeaderTitle>
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.View`
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #2897e5;
`;

const DefaultHeaderContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

export default Header;
