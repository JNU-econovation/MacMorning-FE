import {baseUrl} from '@/constants/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const getLastStory = async (bookId: number, lastPage: number) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const response = await axios.get(
    `${baseUrl}/book/${bookId}/story/${lastPage}`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    },
  );
  return response.data;
};
export default getLastStory;
