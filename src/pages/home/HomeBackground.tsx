import React from 'react';
import {View, Text, Alert} from 'react-native';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';
import TextNavigateButton from '@/components/home/TextNavigateButton';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '@/store/authStore';

const HomeBackground = (): React.JSX.Element => {
  const HomeImage = require('../../assets/images/home/home_image.png');
  const navigation = useNavigation<RootStackNavigationProp>();
  const isAuthenticated = useAuthStore(state => state.accessToken);

  return (
    <>
      <HomeBackgroundContainer
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('CreateBook');
        }}>
        <HomeTitleContainer>
          <CustomText
            font={'NPSfont_extrabold'}
            style={{fontSize: scale(18), color: COLORS.primary}}>
            AI로 만드는 나만의 동화
          </CustomText>
          <TextNavigateButton
            onPress={() => {
              if (isAuthenticated) {
                navigation.navigate('CreateBook');
              } else {
                Alert.alert(
                  '로그인이 필요한 기능이에요! ',
                  '로그인 후 이용해주세요.',
                  [
                    {
                      text: '로그인 하러가기',
                      onPress: () => {
                        navigation.navigate('Login');
                      },
                    },
                  ],
                );
              }
            }}
            text="이야기 만들러 가기"
            fontInfo={{
              font: 'NPSfont_regular',
              fontSize: scale(10),
              fontColor: COLORS.text.navy,
            }}
          />
        </HomeTitleContainer>
        <HomeImageWrapper>
          <Image
            source={HomeImage}
            style={{
              width: scale(120),
              aspectRatio: 310 / 198,
            }}
          />
        </HomeImageWrapper>
        {/* 메인 화면 컨텐츠 영역 확보를 위한 뷰 */}
      </HomeBackgroundContainer>
      <View style={{height: '60%', backgroundColor: COLORS.secondary}} />
    </>
  );
};

const HomeBackgroundContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  background-color: ${COLORS.secondary};
  padding: 0 ${scale(40)}px;
  justify-content: space-between;
  align-items: center;
`;

const HomeTitleContainer = styled.View`
  width: 70%;
  height: 100%;
  padding-top: ${scale(20)}px;
  justify-content: center;
  flex: 1;
`;

const HomeImageWrapper = styled.View`
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export default HomeBackground;
