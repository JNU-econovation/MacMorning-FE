import {AI_BASE_URL} from '@/constants/api';
import {FormData} from '@/types/form';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createStory = async (data: FormData, bookId: number) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const response = await fetch(`${AI_BASE_URL}/book/${bookId}/story/start`, {
    method: 'POST',
    body: JSON.stringify({
      title: data.title,
      genre: data.genre,
      character: {
        grammatical_person: data.story.grammatical_person,
        historical_background: data.story.historical_background,
        name: data.character.name,
        age: data.character.age,
        gender: data.character.gender,
        characteristic: [data.character.description],
      },
      background: data.story.plot,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${accessToken}`,
    },
  });
  console.log('response', response);
  return response.json();
};
