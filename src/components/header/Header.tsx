import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {TouchableOpacity, Text} from 'react-native';
import {colors} from '../../constants/colors';
import BackButton from './BackButton';
import SearchButton from './SearchButton';
import CustomText from '../../utils/CustomText';

interface HeaderProps {
  title: string;
  headerType: 'default' | 'create' | 'progress' | 'ending';
}

const Header = ({title, headerType}: HeaderProps): React.JSX.Element => {
  if (headerType === 'default') {
    return (
      <HeaderWrapper>
        <DefaultHeaderContainer>
          <HeaderTitle font="NPSfont_regular">{title}</HeaderTitle>
          <SearchButton />
        </DefaultHeaderContainer>
      </HeaderWrapper>
    );
  }

  if (headerType === 'create') {
    return (
      <HeaderWrapper>
        <HeaderTitle font="NPSfont_regular">{title}</HeaderTitle>
      </HeaderWrapper>
    );
  }

  if (headerType === 'progress') {
    return (
      <HeaderWrapper>
        <HeaderTitle font="NPSfont_regular">{title}</HeaderTitle>
      </HeaderWrapper>
    );
  }

  if (headerType === 'ending') {
    return (
      <HeaderWrapper>
        <HeaderTitle font="NPSfont_regular">{title}</HeaderTitle>
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper>
      <HeaderTitle font="NPSfont_regular">{title}</HeaderTitle>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${scale(35)}px;
  justify-content: space-between;
  background-color: ${colors.primary};
`;

const DefaultHeaderContainer = styled.View`
  width: 100%;
  padding: 0 ${scale(10)}px;
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled(CustomText)`
  font-size: ${scale(12)}px;
  color: ${colors.text.white};
`;

export default Header;
