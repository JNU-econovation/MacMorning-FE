import React, {useEffect, useState} from 'react';
import Header from '@/components/common/header/Header';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import StoryProgressView from './StoryProgressView';
import {createStory} from '@/apis/AI/createStory';
import {
  getLastStory,
  getNextStory,
  saveProgressStory,
} from '@/apis/story/storyProgress';
import {createEnding, saveEnding} from '@/apis/story/createEnding';
import {NavigationProp, RouteProp, useRoute} from '@react-navigation/native';
import Loading from '@/components/common/loading/Loading';
import StepButton from '@/components/common/buttons/StepButton';
import CustomText from '@/utils/CustomText';
import {Illust} from '@/types/form';

const StoryProgress = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StoryProgress'>>();
  const {bookId, lastPage, formData, nextStory} = route.params.props || {};
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(bookId, lastPage, formData, nextStory);
  const [choiceId, setChoiceId] = useState<number | null>(null);
  const [illust, setIllust] = useState<Illust>({
    illust_id: 0,
    story_id: 0,
    image_url: '',
    created_at: '',
    updated_at: '',
  });

  const [AIResponse, setAIResponse] = useState<{
    story: string;
    choice1: string | undefined;
    choice2: string | undefined;
    my_choice: number | null;
  }>({
    story: '',
    choice1: '',
    choice2: '',
    my_choice: null,
  });

  // 초기값 설정
  const initialTotalPage = lastPage + 1;
  const [total_page, setTotalPage] = useState<number>(initialTotalPage);
  const [page_number, setPageNumber] = useState<number>(initialTotalPage);

  const isNextDisabled = page_number === total_page;
  const isPrevDisabled = page_number === 1;
  // lastPage 변경 시 상태 업데이트
  useEffect(() => {
    const newTotalPage = lastPage + 1;
    setTotalPage(newTotalPage);
    setPageNumber(newTotalPage);
    setAIResponse({
      story: '',
      choice1: '',
      choice2: '',
      my_choice: null,
    });
  }, [lastPage]);

  // 스토리 가져오기
  useEffect(() => {
    console.log('useEffect', page_number);
    const fetchStory = async () => {
      await setIsLoading(true);
      console.log(!formData && !nextStory);
      if (
        AIResponse.story === '' &&
        AIResponse.choice1 === '' &&
        AIResponse.choice2 === '' &&
        (formData || nextStory)
      ) {
        if (page_number === 1 && formData) {
          console.log('createStory');
          const response = await createStory(formData, bookId);
          const newStory = {
            story: response.data.story || '',
            choice1: response.data.choice1 || undefined,
            choice2: response.data.choice2 || undefined,
            my_choice: null,
          };
          setAIResponse(newStory);
          // 이야기 생성이 완되면 저장한다.
          const saveResponse = await saveProgressStory(
            bookId,
            page_number,
            newStory,
          );
          setChoiceId(saveResponse.data.choice.choice_id);
          setIllust(saveResponse.data.illust);
          console.log(saveResult.data.illust.illust_id);
        } else if (isNextDisabled && nextStory) {
          console.log('getNextStory');
          const response = await getNextStory(bookId, nextStory);
          const newStory = {
            story: response.data.story,
            choice1: response.data.choice1,
            choice2: response.data.choice2,
            my_choice: null,
          };
          setAIResponse(newStory);
          const saveResponse = await saveProgressStory(
            bookId,
            page_number,
            newStory,
          );
          setChoiceId(saveResponse.data.choice.choice_id);
          setIllust(saveResponse.data.illust);

          setIsLoading(false);
        }
      } // 엔딩만들기
      else if (AIResponse.story === '' && !formData && !nextStory) {
        const response = await createEnding(bookId);
        const newStory = {
          story: response.data.story,
          choice1: '',
          choice2: '',
          my_choice: null,
        };
        setAIResponse(newStory);

        const saveResponse = await saveProgressStory(
          bookId,
          page_number,
          newStory,
        );
        setIllust(saveResponse.data.illust);
        saveEnding(bookId);
      } else {
        console.log('getLastStory');
        const response = await getLastStory(bookId, page_number);
        const newStory = {
          story: response.data.story.story_text,
          choice1: response.data.choice.first_choice,
          choice2: response.data.choice.second_choice,
          my_choice: response.data.choice.my_choice,
        };
        setIllust(response.data.illust);
        setAIResponse(newStory);
      }
      await setIsLoading(false);
    };
    fetchStory();
  }, [bookId, page_number]);

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
      <Header
        title="이야기 진행"
        headerType="progress"
        isLoading={isLoading}
        bookId={bookId}
        totalPage={total_page}
      />
      {isLoading ? (
        <Loading script="이야기를 만드는 중이에요..." />
      ) : (
        <>
          <StoryProgressViewContainer>
            <StoryProgressView
              bookId={bookId}
              illust={illust}
              page_number={page_number}
              totalPage={total_page}
              choiceId={choiceId}
              AIResponse={AIResponse}
              isDisabled={!isNextDisabled}
              isLoading={isLoading}
              setLastPage={setTotalPage}
            />
          </StoryProgressViewContainer>
        </>
      )}
      <ProgressButtonWrapper>
        <StepButton
          text="이전"
          onPress={handlePrevPage}
          disabled={isPrevDisabled || isLoading}
        />
        <CustomText
          style={{fontSize: scale(10), color: COLORS.text.primary}}
          font="NPSfont_regular">
          {page_number}/{total_page}
        </CustomText>
        <StepButton
          text="다음"
          onPress={handleNextPage}
          disabled={isNextDisabled || isLoading}
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
