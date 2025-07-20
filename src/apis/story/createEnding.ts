import AsyncStorage from '@react-native-async-storage/async-storage';
import {AI_BASE_URL, baseUrl} from '@/constants/api';
import axios from 'axios';

const createEnding = async (bookId: number) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  console.log('createEnding', bookId);
  try {
    const response = await axios.post(
      `${AI_BASE_URL}/book/${bookId}/story/end`,
      {}, // 빈 body 또는 필요한 데이터
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('createEnding 에러:', error);
    throw error;
  }
};

const saveEnding = async (bookId: number) => {
  console.log('saveEnding', bookId);
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `${baseUrl}/book/${bookId}/end`,
      {},
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('saveEnding 에러:', error);
    throw error;
  }
};

export {createEnding, saveEnding};
