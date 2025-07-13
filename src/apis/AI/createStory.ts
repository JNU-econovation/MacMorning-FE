import {baseUrl} from '@/constants/api';
import {FormData} from '@/types/form';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createStory = async (data: FormData) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const baseUrl = 'https://api.ilovejokbal.monster/v1';
  const response = await fetch(`${baseUrl}/book/story/start`, {
    method: 'POST',
    body: JSON.stringify({
      title: data.title,
      genre: data.genre,
      gamemode: data.gameMode,
      chracter: {
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
