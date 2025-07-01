import {baseUrl} from '@/constants/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getNextStory = async (selectScript: string) => {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.post(`${baseUrl}/story/progress`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      choice: selectScript,
    },
  });
  return response.data;
};

export default getNextStory;
