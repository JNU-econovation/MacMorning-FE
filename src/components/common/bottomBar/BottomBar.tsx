import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {TouchableOpacity, Text, View} from 'react-native';
import {colors} from '../../../constants/colors';

import CustomText from '../../../utils/CustomText';
import BottomBarButton from './BottomBarButton';
import HomeSVG from '../../../assets/images/home.svg';
import BookSVG from '../../../assets/images/book.svg';
import OpenBookSVG from '../../../assets/images/book-open.svg';
import UserSVG from '../../../assets/images/user.svg';

const BottomBar = (): React.JSX.Element => {
  return (
    <BottomBarContainer>
      <BottomBarButtonContainer>
        <BottomBarButton
          icon={
            <HomeSVG
              width={scale(20)}
              height={scale(20)}
              strokeWidth={scale(1.2)}
            />
          }
          buttonName="홈"
          onPress={() => console.log('홈')}
        />
        <BottomBarButton
          icon={
            <OpenBookSVG
              width={scale(20)}
              height={scale(20)}
              strokeWidth={scale(1.2)}
            />
          }
          buttonName="내 책"
          onPress={() => console.log('내 책')}
        />
      </BottomBarButtonContainer>
      <BottomBarButtonContainer>
        <BottomBarButton
          icon={
            <BookSVG
              width={scale(20)}
              height={scale(20)}
              strokeWidth={scale(1.2)}
            />
          }
          buttonName="이야기 도서관"
          onPress={() => console.log('이야기 도서관')}
        />
        <BottomBarButton
          icon={
            <UserSVG
              width={scale(20)}
              height={scale(20)}
              strokeWidth={scale(1.2)}
            />
          }
          buttonName="마이페이지"
          onPress={() => console.log('마이페이지')}
        />
      </BottomBarButtonContainer>
    </BottomBarContainer>
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
  gap: 50%;
`;

export default BottomBar;
