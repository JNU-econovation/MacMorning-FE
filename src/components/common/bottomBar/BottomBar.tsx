import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import BottomBarPlusButton from './BottomBarPlusButton';
import HomeSVG from '@/assets/images/bottomBar/home.svg';
import BookSVG from '@/assets/images/bottomBar/book.svg';
import OpenBookSVG from '@/assets/images/bottomBar/book-open.svg';
import UserSVG from '@/assets/images/bottomBar/user.svg';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Platform, Text} from 'react-native';
import CustomText from '@/utils/CustomText';

interface BottomBarButtonProps {
  icon: React.ReactNode;
  buttonName: string;
  onPress: () => void;
  isActive: boolean;
}

const BottomBarButton = ({
  icon,
  buttonName,
  onPress,
  isActive,
}: BottomBarButtonProps) => {
  return (
    <BottomBarButtonWrapper onPress={onPress}>
      <Text style={{justifyContent: 'center', alignItems: 'center'}}>
        {icon}
      </Text>
      <CustomText
        font="NPSfont_regular"
        style={{
          fontSize: scale(7),
          color: isActive ? COLORS.primary : COLORS.text.primary,
        }}>
        {buttonName}
      </CustomText>
    </BottomBarButtonWrapper>
  );
};

const BottomBar = ({
  navigation,
  state,
}: BottomTabBarProps): React.JSX.Element => {
  const iconProps: IconProps = {
    width: scale(15),
    height: scale(15),
    strokeWidth: scale(0.8),
  };
  const currentRoute = state.routes[state.index].name;

  return (
    <>
      <BottomBarPlusButton
        buttonName="책 추가"
        onPress={() => navigation.navigate('CreateBook')}
      />
      <BottomBarContainer>
        <BottomBarButtonContainer>
          <BottomBarButton
            icon={
              <HomeSVG
                color={
                  currentRoute === 'Home' ? COLORS.primary : COLORS.text.primary
                }
                {...iconProps}
              />
            }
            buttonName="홈"
            onPress={() => navigation.navigate('Home')}
            isActive={currentRoute === 'Home'}
          />
          <BottomBarButton
            icon={
              <OpenBookSVG
                color={
                  currentRoute === 'MyBook'
                    ? COLORS.primary
                    : COLORS.text.primary
                }
                {...iconProps}
              />
            }
            buttonName="내 책"
            onPress={() => navigation.navigate('MyBook')}
            isActive={currentRoute === 'MyBook'}
          />
        </BottomBarButtonContainer>
        <BottomBarButtonContainer>
          <BottomBarButton
            icon={
              <BookSVG
                color={
                  currentRoute === 'Library'
                    ? COLORS.primary
                    : COLORS.text.primary
                }
                {...iconProps}
              />
            }
            buttonName="이야기 도서관"
            onPress={() => navigation.navigate('Library')}
            isActive={currentRoute === 'Library'}
          />
          <BottomBarButton
            icon={
              <UserSVG
                color={
                  currentRoute === 'MyPage'
                    ? COLORS.primary
                    : COLORS.text.primary
                }
                {...iconProps}
              />
            }
            buttonName="마이페이지"
            onPress={() => navigation.navigate('MyPage')}
            isActive={currentRoute === 'MyPage'}
          />
        </BottomBarButtonContainer>
      </BottomBarContainer>
    </>
  );
};

const BottomBarContainer = styled.View`
  z-index: 1;
  width: 100%;
  height: ${scale(38)}px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${COLORS.background.white};
  shadow-color: #000;
  shadow-offset: 0px ${scale(-2)}px;
  shadow-opacity: 0.1;
  shadow-radius: ${scale(3)}px;
  elevation: ${Platform.OS === 'android' ? scale(7) : 0};
`;

const BottomBarButtonContainer = styled.View`
  width: 40%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30%;
`;

const BottomBarButtonWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  gap: ${scale(2)}px;
  width: 25%;
`;

export default BottomBar;
