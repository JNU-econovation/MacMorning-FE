import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import {useStoryImageUrl} from '@/hooks/useImageUrl';
import {useNavigation} from '@react-navigation/native';
import {createNavigationHelpers} from '@/utils/navigate/NavigateHelpers';
import SelectButton from '@/components/storyProgress/SelectButton';
import {NavigationProp} from '@react-navigation/native';

interface ReadBookViewProps {
  bookPage: any;
  textSize: 'small' | 'medium' | 'large';
}

const ReadBookView = ({bookPage, textSize}: ReadBookViewProps) => {
  const imageUrl = useStoryImageUrl(bookPage?.image_url);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {goToReadQuestions} = createNavigationHelpers(navigation);

  console.log(bookPage);
  const getFontSize = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return scale(7);
      case 'medium':
        return scale(9);
      case 'large':
        return scale(11);
      default:
        return scale(9);
    }
  };

  return (
    <ReadBookViewContainer>
      <LeftContainer>
        <BookImage source={{uri: imageUrl}} />
      </LeftContainer>
      <RightContainer>
        <StoryContainer>
          <CustomText
            font="NPSfont_regular"
            style={{fontSize: getFontSize(textSize)}}>
            {bookPage?.story_text}
          </CustomText>
        </StoryContainer>
        <SelectButtonContainer>
          {bookPage?.first_choice && (
            <SelectButton
              onPress={() => {}}
              selectScript={bookPage.first_choice}
              isDisabled={false}
              isSelected={bookPage.my_choice === 1}
            />
          )}
          {bookPage?.second_choice && (
            <SelectButton
              onPress={() => {}}
              selectScript={bookPage.second_choice}
              isDisabled={false}
              isSelected={bookPage.my_choice === 2}
            />
          )}
          {bookPage?.first_choice === '' && bookPage?.second_choice === '' && (
            <GoQuestionButtonWrapper>
              <GoQuestionButton
                activeOpacity={1}
                onPress={() => {
                  goToReadQuestions({bookId: bookPage.book_id});
                }}>
                <CustomText
                  font="NPSfont_regular"
                  style={{
                    fontSize: scale(9),
                    color: COLORS.primary,
                  }}>
                  작가의 의도 작성하러 가기 ▶
                </CustomText>
              </GoQuestionButton>
            </GoQuestionButtonWrapper>
          )}
        </SelectButtonContainer>
      </RightContainer>
    </ReadBookViewContainer>
  );
};

const ReadBookViewContainer = styled.View`
  background-color: ${COLORS.background.white};
  flex-direction: row;
  width: 90%;
  height: 100%;
  border-radius: ${scale(10)}px;
  shadow-color: ${COLORS.background.black};
  shadow-offset: 0px ${scale(2)}px;
  shadow-opacity: 0.1;
  shadow-radius: ${scale(3)}px;
  border-width: ${scale(1)}px;
  border-color: ${'rgba(0, 0, 0, 0.0)'};
  elevation: 5;
`;

const LeftContainer = styled.View`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: ${scale(10)}px;
`;

const BookImage = styled.Image`
  width: 100%;
  height: 100%;
  border-top-left-radius: ${scale(10)}px;
  border-bottom-left-radius: ${scale(10)}px;
`;

const RightContainer = styled.View`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const StoryContainer = styled.ScrollView`
  width: 100%;
  padding: ${scale(20)}px;
`;

const SelectButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${scale(5)}px;
  padding: ${scale(10)}px 0;
  margin-bottom: ${scale(10)}px;
`;

const UploadedImage = styled.Image`
  width: 100%;
  height: 100%;
  border-top-left-radius: ${scale(10)}px;
  border-bottom-left-radius: ${scale(10)}px;
`;

const GoQuestionButton = styled.TouchableOpacity`
  padding: ${scale(10)}px ${scale(15)}px;
  align-items: center;
  justify-content: center;
`;

const GoQuestionButtonWrapper = styled.View`
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
`;
export default ReadBookView;
