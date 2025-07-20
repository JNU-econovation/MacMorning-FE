import {AI_BASE_URL, baseUrl} from '@/constants/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const getLastStory = async (bookId: number, lastPage: number) => {
  console.log('getLastStory', bookId, lastPage);
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      `${baseUrl}/book/${bookId}/story/${lastPage}`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    console.log('getLastStory response', response.data);
    return response.data;
  } catch (error) {
    console.error('기존 스토리 가져오기 에러:', error);
    throw error;
  }
};

const saveProgressStory = async (
  bookId: number,
  page_number: number,
  AIResponse: {story: string; choice1: string; choice2: string},
  illust?: string,
) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  let requestBody = {
    story: {
      page_number: page_number,
      story_text: AIResponse.story,
    },
    ...(illust && {
      illust: {
        illust_url: illust,
      },
    }),
    choice: {
      first_choice: AIResponse.choice1,
      second_choice: AIResponse.choice2,
    },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/book/${bookId}/story`,
      requestBody,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('스토리 저장 에러:', error);
    throw error;
  }
};

const getNextStory = async (bookId: number, choice: string) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `${AI_BASE_URL}/book/${bookId}/story`,
      {
        choice: choice,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('다음 스토리 가져오기 에러:', error);
    throw error;
  }
};
export {getLastStory, saveProgressStory, getNextStory};
