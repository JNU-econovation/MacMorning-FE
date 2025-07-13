import {useAuthStore} from '@/store/authStore';
import {FormData} from '@/types/form';
import {baseUrl} from '@/constants/api';

const createBook = async (data: FormData) => {
  const accessToken = useAuthStore.getState().accessToken;

  const response = await fetch(`${baseUrl}/book`, {
    method: 'POST',
    body: JSON.stringify({
      title: data.title,
      genre: data.genre,
      gamemode: data.gameMode,
      character: {
        grammatical_person: data.story.grammatical_person,
        historical_background: data.story.historical_background,
        name: data.character.name,
        age: data.character.age,
        gender: data.character.gender,
        characteristic: data.character.description,
      },
      background: data.story.plot,
    }),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${accessToken}`,
    },
  });
  return response.json();
};

export default createBook;
