import {baseUrl} from '@/constants/api';
import {useAuthStore} from '@/store/authStore';

export const getQuestions = async (bookId: number) => {
  const accessToken = useAuthStore.getState().accessToken;
  try {
    const response = await fetch(`${baseUrl}/books/${bookId}/choice`, {
      method: 'GET',
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    console.log('response', response);
    return response.json();
  } catch (error) {
    console.error('getQuestions 에러:', error);
    throw error;
  }
};
