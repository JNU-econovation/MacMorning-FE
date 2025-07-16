import React, {useEffect, useState} from 'react';
import Header from '@/components/common/header/Header';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import StoryProgressView from './StoryProgressView';
import {createStory} from '@/apis/AI/createStory';
import {FormData} from '@/types/form';
import {getLastStory} from '@/apis/story/storyProgress';
import {RouteProp, useRoute} from '@react-navigation/native';

const StoryProgress = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StoryProgress'>>();
  const {bookId, lastPage, formData} = route.params.props || {};
  console.log(bookId, lastPage, formData);
  const [AIResponse, setAIResponse] = useState<{
    story: string;
    choice1: string;
    choice2: string;
  }>({
    story: '',
    choice1: '',
    choice2: '',
  });

  useEffect(() => {
    const fetchStory = async () => {
      if (lastPage === 0 && formData) {
        console.log('createStory');
        const response = await createStory(formData, bookId);
        setAIResponse({
          story: response.data.story || '',
          choice1: response.data.choice1 || '',
          choice2: response.data.choice2 || '',
        });
      } else {
        const response = await getLastStory(bookId, lastPage);
        console.log(response);
        const newStory = {
          story: response.data.story.story_text,
          choice1: response.data.choice.first_choice,
          choice2: response.data.choice.second_choice,
        };
        setAIResponse(newStory);
      }
      console.log(AIResponse);
    };
    fetchStory();
  }, [bookId, lastPage, formData]);

  return (
    <StoryProgressContainer>
      <Header title="이야기 진행" headerType="progress" />
      <StoryProgressViewContainer>
        <StoryProgressView
          bookId={bookId}
          lastPage={lastPage}
          AIResponse={AIResponse}
        />
      </StoryProgressViewContainer>
    </StoryProgressContainer>
  );
};

const StoryProgressContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const StoryProgressViewContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${scale(20)}px;
`;

export default StoryProgress;
