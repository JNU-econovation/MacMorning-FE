import React, {useState} from 'react';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import ImageButton from '@/components/storyProgress/ImageButton';
import SelectButton from '@/components/storyProgress/SelectButton';
import {onSelectImage} from '@/utils/ImagePicker';
import {uploadImageToS3} from '@/apis/upload/imageUpload';
import {useAuthStore} from '@/store/authStore';
import CustomText from '@/utils/CustomText';
import {fetchChoice} from '@/apis/story/storyProgress';
import {useRoute} from '@react-navigation/native';
import {createNavigationHelpers} from '@/utils/navigate/NavigateHelpers';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';

const StoryProgressView = ({
  bookId,
  totalPage,
  AIResponse,
  isDisabled,
  isLoading,
  setLastPage,
}: {
  bookId: number;
  totalPage: number;
  AIResponse: {
    story: string;
    choice1: string | undefined;
    choice2: string | undefined;
  };
  isDisabled: boolean;
  isLoading: boolean;
  setLastPage: (lastPage: number) => void;
}) => {
  const accessToken = useAuthStore(state => state.accessToken);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {goToStoryProgress, goToQuestions} =
    createNavigationHelpers(navigation);

  const handleImagePicker = async () => {
    const result = await onSelectImage();

    if (result) {
      const uploadResult = await uploadImageToS3(
        result?.name || '',
        bookId,
        accessToken || '',
        result,
      );
      console.log(uploadResult);
    }
  };

  const handleSelectChoice = async (choice: number) => {
    const response = await fetchChoice(bookId, choice);
    console.log(response);
    goToStoryProgress({
      bookId: bookId,
      lastPage: totalPage,
      nextStory: choice === 1 ? AIResponse.choice1 : AIResponse.choice2,
    });
  };

  return (
    <StoryProgressViewContainer>
      <LeftContainer>
        <ImageButton text="이미지 업로드" onPress={handleImagePicker} />
        <ImageButton text="삽화 생성" onPress={() => {}} />
      </LeftContainer>
      <RightContainer>
        <StoryContainer>
          <CustomText font="NPSfont_regular" style={{fontSize: scale(9)}}>
            {AIResponse.story}
          </CustomText>
        </StoryContainer>
        <SelectButtonContainer>
          {AIResponse.choice1 && (
            <SelectButton
              onPress={() => handleSelectChoice(1)}
              selectScript={AIResponse.choice1}
              isDisabled={isDisabled}
            />
          )}
          {AIResponse.choice2 && (
            <SelectButton
              onPress={() => handleSelectChoice(2)}
              selectScript={AIResponse.choice2}
              isDisabled={isDisabled}
            />
          )}
          {AIResponse.choice1 === '' && AIResponse.choice2 === '' && (
            <GoQuestionButtonWrapper>
              <GoQuestionButton
                activeOpacity={1}
                onPress={() => {
                  goToQuestions({bookId});
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
    </StoryProgressViewContainer>
  );
};

const StoryProgressViewContainer = styled.View`
  background-color: ${COLORS.background.white};
  flex-direction: row;
  width: 90%;
  height: 100%;
  border-radius: ${scale(10)}px;
`;

const LeftContainer = styled.View`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: ${scale(10)}px;
`;

const RightContainer = styled.View`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const StoryContainer = styled.ScrollView`
  width: 100%;
  padding: ${scale(10)}px;
`;

const SelectButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${scale(5)}px;
  padding: ${scale(10)}px 0;
  margin-bottom: ${scale(10)}px;
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

export default StoryProgressView;
