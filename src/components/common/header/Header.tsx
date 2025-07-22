import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import BackButton from './BackButton';
import SearchButton from './SearchButton';
import CustomText from '@/utils/CustomText';
import EndingButton from './EndingButton';
import EditButton from './EditButton';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

interface HeaderProps {
  title: string;
  headerType: 'default' | 'create' | 'progress' | 'edit' | 'questions';
  isLoading?: boolean;
  bookId?: number;
  totalPage?: number;
}

const Header = ({
  title,
  headerType,
  isLoading = false,
  bookId,
  totalPage,
}: HeaderProps): React.JSX.Element => {
  const navigation = useNavigation<RootStackNavigationProp>();

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
        <BackHeaderContainer>
          <BackButton
            disabled={isLoading}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <HeaderTitle font="NPSfont_regular">{title}</HeaderTitle>
        </BackHeaderContainer>
      </HeaderWrapper>
    );
  }

  if (headerType === 'progress' && bookId && totalPage) {
    return (
      <HeaderWrapper>
        <BackHeaderContainer>
          <BackButton
            disabled={isLoading}
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'MainTabs', params: {screen: 'Home'}}],
                }),
              );
            }}
          />
          <HeaderTitle font="NPSfont_regular">{title}</HeaderTitle>
          <EndingButton
            onPress={() => {
              navigation.navigate('StoryProgress', {
                props: {
                  bookId: bookId,
                  lastPage: totalPage,
                  formData: undefined,
                  nextStory: undefined,
                },
              });
            }}
          />
        </BackHeaderContainer>
      </HeaderWrapper>
    );
  }

  if (headerType === 'edit') {
    return (
      <HeaderWrapper>
        <BackHeaderContainer>
          <BackButton
            disabled={isLoading}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <HeaderTitle font="NPSfont_regular">{title}</HeaderTitle>
          <EditButton />
        </BackHeaderContainer>
      </HeaderWrapper>
    );
  }

  if (headerType === 'questions') {
    return (
      <HeaderWrapper>
        <BackHeaderContainer>
          <BackButton
            disabled={isLoading}
            onPress={() => {
              Alert.alert(
                '정말 나가시겠어요?',
                '지금 나가시면 작성한 내용이 저장되지 않아요.',
                [
                  {text: '취소', style: 'cancel'},
                  {
                    text: '확인',
                    onPress: () => {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [
                            {name: 'MainTabs', params: {screen: 'Home'}},
                          ],
                        }),
                      );
                    },
                  },
                ],
              );
            }}
          />
          <HeaderTitle font="NPSfont_regular">{title}</HeaderTitle>
        </BackHeaderContainer>
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper>
      <DefaultHeaderContainer>
        <HeaderTitle font="NPSfont_regular">{title}</HeaderTitle>
        <SearchButton />
      </DefaultHeaderContainer>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${scale(33)}px;
  justify-content: space-between;
  background-color: ${COLORS.primary};
`;

const DefaultHeaderContainer = styled.View`
  width: 100%;
  padding: 0 ${scale(10)}px;
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BackHeaderContainer = styled.View`
  width: 100%;
  padding: 0 ${scale(10)}px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const HeaderTitle = styled(CustomText)`
  font-size: ${scale(10)}px;
  color: ${COLORS.text.white};
`;

const ButtonWrapper = styled.View`
  height: 100%;
  justify-content: center;
`;

export default Header;
