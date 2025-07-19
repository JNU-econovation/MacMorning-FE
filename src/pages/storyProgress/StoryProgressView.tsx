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
import {saveProgressStory} from '@/apis/story/storyProgress';
import {useRoute} from '@react-navigation/native';
import {createNavigationHelpers} from '@/utils/navigate/NavigateHelpers';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';

const StoryProgressView = ({
  bookId,
  lastPage,
  AIResponse,
  isDisabled,
}: {
  bookId: number;
  lastPage: number;
  AIResponse: {story: string; choice1: string; choice2: string};
  isDisabled: boolean;
}) => {
  const accessToken = useAuthStore(state => state.accessToken);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {goToStoryProgress} = createNavigationHelpers(navigation);

  const handleImagePicker = async () => {
    const result = await onSelectImage();
    const uploadResult = await uploadImageToS3(
      result.assets?.[0]?.uri || '',
      bookId,
      accessToken || '',
    );
    console.log(uploadResult);
  };

  const handleSelectChoice = (choice: number) => {
    saveProgressStory({
      bookId,
      lastPage,
      AIResponse,
      myChoice: choice,
    });
    goToStoryProgress({
      bookId: bookId,
      lastPage: lastPage + 1,
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
          <SelectButton
            onPress={() => handleSelectChoice(1)}
            selectScript={AIResponse.choice1}
            isDisabled={isDisabled}
          />
          <SelectButton
            onPress={() => handleSelectChoice(2)}
            selectScript={AIResponse.choice2}
            isDisabled={isDisabled}
          />
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

export default StoryProgressView;
