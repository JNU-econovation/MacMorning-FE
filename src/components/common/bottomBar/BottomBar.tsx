import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {colors} from '@/constants/colors';
import BottomBarButton from './BottomBarButton';
import BottomBarPlusButton from './BottomBarPlusButton';
import HomeSVG from '@/assets/images/home.svg';
import BookSVG from '@/assets/images/book.svg';
import OpenBookSVG from '@/assets/images/book-open.svg';
import UserSVG from '@/assets/images/user.svg';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const BottomBar = ({navigation}: BottomTabBarProps): React.JSX.Element => {
  const iconProps: IconProps = {
    width: scale(15),
    height: scale(15),
    strokeWidth: scale(0.8),
  };

  return (
    <>
      <BottomBarPlusButton
        buttonName="책 추가"
        onPress={() => navigation.navigate('CreateBook')}
      />
      <BottomBarContainer>
        <BottomBarButtonContainer>
          <BottomBarButton
            icon={<HomeSVG {...iconProps} />}
            buttonName="홈"
            onPress={() => navigation.navigate('Home')}
          />
          <BottomBarButton
            icon={<OpenBookSVG {...iconProps} />}
            buttonName="내 책"
            onPress={() => navigation.navigate('MyBook')}
          />
        </BottomBarButtonContainer>
        <BottomBarButtonContainer>
          <BottomBarButton
            icon={<BookSVG {...iconProps} />}
            buttonName="이야기 도서관"
            onPress={() => navigation.navigate('Library')}
          />
          <BottomBarButton
            icon={<UserSVG {...iconProps} />}
            buttonName="마이페이지"
            onPress={() => navigation.navigate('MyPage')}
          />
        </BottomBarButtonContainer>
      </BottomBarContainer>
    </>
  );
};

const BottomBarContainer = styled.View`
  width: 100%;
  height: ${scale(38)}px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.background.white};
  shadow-color: #000;
  shadow-offset: 0px ${scale(-2)}px;
  shadow-opacity: 0.1;
  shadow-radius: ${scale(3)}px;
`;

const BottomBarButtonContainer = styled.View`
  width: 40%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30%;
`;

export default BottomBar;
