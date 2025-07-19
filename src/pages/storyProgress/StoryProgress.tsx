import React, {useEffect, useState} from 'react';
import Header from '@/components/common/header/Header';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import StoryProgressView from './StoryProgressView';
import {createStory} from '@/apis/AI/createStory';
import {getLastStory} from '@/apis/story/storyProgress';
import {NavigationProp, RouteProp, useRoute} from '@react-navigation/native';
import Loading from '@/components/common/loading/Loading';
import StepButton from '@/components/common/buttons/StepButton';
import {useNavigation} from '@react-navigation/native';
import CustomText from '@/utils/CustomText';

const StoryProgress = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StoryProgress'>>();
  const {bookId, lastPage, formData, nextStory} = route.params.props || {};
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [AIResponse, setAIResponse] = useState<{
    story: string;
    choice1: string;
    choice2: string;
  }>({
    story: '',
    choice1: '',
    choice2: '',
  });
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(false);

  const [total_page, setTotalPage] = useState<number>(lastPage + 1);
  const [page_number, setPageNumber] = useState<number>(lastPage + 1);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(
    page_number === lastPage,
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchStory = async () => {
      setIsLoading(true);
      if (page_number === 0 && formData) {
        console.log('createStory');
        const response = await createStory(formData, bookId);
        setAIResponse({
          story: response.data.story || '',
          choice1: response.data.choice1 || '',
          choice2: response.data.choice2 || '',
        });
      } else {
        const response = await getLastStory(bookId, page_number);
        console.log(response);
        const newStory = {
          story: response.data.story.story_text,
          choice1: response.data.choice.first_choice,
          choice2: response.data.choice.second_choice,
        };
        setAIResponse(newStory);
      }
      setIsLoading(false);
      console.log(AIResponse);
    };
    fetchStory();
  }, [bookId, page_number, formData]);

  // 다음 선택지 버튼 비활성화
  useEffect(() => {
    setIsNextDisabled(page_number === lastPage);
  }, [page_number]);

  const handlePrevPage = () => {
    if (!isPrevDisabled) {
      setPageNumber(page_number - 1);
    }
  };

  const handleNextPage = () => {
    if (!isNextDisabled) {
      setPageNumber(page_number + 1);
    }
  };

  return (
    <StoryProgressContainer>
      <Header title="이야기 진행" headerType="progress" />
      {isLoading ? (
        <Loading script="이야기를 만드는 중이에요..." />
      ) : (
        <>
          <StoryProgressViewContainer>
            <StoryProgressView
              bookId={bookId}
              lastPage={lastPage}
              AIResponse={AIResponse}
              isDisabled={!isNextDisabled}
            />
          </StoryProgressViewContainer>
        </>
      )}
      <ProgressButtonWrapper>
        <StepButton
          text="이전"
          onPress={handlePrevPage}
          disabled={isPrevDisabled}
        />
        <CustomText
          style={{fontSize: scale(10), color: COLORS.text.primary}}
          font="NPSfont_regular">
          {page_number}/{lastPage + 1}
        </CustomText>
        <StepButton
          text="다음"
          onPress={handleNextPage}
          disabled={isNextDisabled}
        />
      </ProgressButtonWrapper>
    </StoryProgressContainer>
  );
};

const StoryProgressContainer = styled.View`
  width: 100%;
  height: 100%;
  gap: ${scale(10)}px;
`;

const StoryProgressViewContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${scale(20)}px;
`;
const ProgressButtonWrapper = styled.View`
  width: 100%;
  padding-bottom: ${scale(15)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: ${scale(15)}px;
`;
export default StoryProgress;
