import {baseUrl} from '@/constants/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const getLastStory = async (bookId: number, lastPage: number) => {
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
    return response.data;
  } catch (error) {
    console.error('기존 스토리 가져오기 에러:', error);
    throw error;
  }
};

const saveProgressStory = async (props: {
  bookId: number;
  lastPage: number;
  AIResponse: {story: string; choice1: string; choice2: string};
  myChoice: number;
  illust?: string;
}) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  let requestBody = {
    story: {
      page_number: props.lastPage,
      story_text: props.AIResponse.story,
    },
    ...(props.illust && {
      illust: {
        illust_url: props.illust,
      },
    }),
    choice: {
      first_choice: props.AIResponse.choice1,
      second_choice: props.AIResponse.choice2,
      my_choice: props.myChoice,
    },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/book/${props.bookId}/story`,
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
export {getLastStory, saveProgressStory};
