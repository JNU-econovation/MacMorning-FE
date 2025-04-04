import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import CustomText from '../../utils/CustomText';
import TextNavigateButton from '../../components/home/TextNavigateButton';
import {useNavigation} from '@react-navigation/native';

const HomeBackground = (): React.JSX.Element => {
  const HomeImage = require('../../assets/images/home_image.png');
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <>
      <HomeBackgroundContainer
        activeOpacity={1}
        onPress={() => {
          console.log('home banner');
        }}>
        <HomeTitleContainer>
          <CustomText
            font={'NPSfont_extrabold'}
            style={{fontSize: scale(18), color: colors.primary}}>
            AI로 만드는 나만의 동화
          </CustomText>
          <TextNavigateButton
            onPress={() => navigation.navigate('CreateBook')}
            text="이야기 만들러 가기"
            fontInfo={{
              font: 'NPSfont_regular',
              fontSize: scale(10),
              fontColor: colors.text.navy,
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
      <View style={{height: '60%', backgroundColor: colors.secondary}} />
    </>
  );
};

const HomeBackgroundContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  background-color: ${colors.secondary};
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
