import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import ImageButton from '@/components/storyProgress/ImageButton';
import SelectButton from '@/components/storyProgress/SelectButton';
import {onSelectImage} from '@/utils/ImagePicker';
import {uploadImageToS3} from '@/apis/upload/imageUpload';
import {useAuthStore} from '@/store/authStore';

const StoryProgressView = ({bookId}: {bookId: number}) => {
  const accessToken = useAuthStore(state => state.accessToken);

  const handleImagePicker = async () => {
    const result = await onSelectImage();
    const uploadResult = await uploadImageToS3(
      result.assets?.[0]?.uri || '',
      bookId,
      accessToken || '',
    );
    console.log(uploadResult);
  };

  return (
    <StoryProgressViewContainer>
      <LeftContainer>
        <ImageButton text="이미지 업로드" onPress={handleImagePicker} />
        <ImageButton text="삽화 생성" onPress={() => {}} />
      </LeftContainer>
      <RightContainer>
        <StoryContainer></StoryContainer>
        <SelectButtonContainer>
          <SelectButton onPress={() => {}} selectScript="선택지 1" />
          <SelectButton onPress={() => {}} selectScript="선택지 2" />
          <SelectButton onPress={() => {}} selectScript="선택지 3" />
        </SelectButtonContainer>
      </RightContainer>
    </StoryProgressViewContainer>
  );
};

const StoryProgressViewContainer = styled.View`
  background-color: ${COLORS.background.white};
  flex-direction: row;
  width: 90%;
  height: 80%;
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

const StoryContainer = styled.View`
  width: 100%;
  background-color: red;
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
