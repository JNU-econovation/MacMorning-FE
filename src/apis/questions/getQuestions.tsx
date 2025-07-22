import {baseUrl} from '@/constants/api';
import {useAuthStore} from '@/store/authStore';
import {Question} from '@/types/form';

export const getQuestions = async (bookId: number) => {
  const accessToken = useAuthStore.getState().accessToken;
  try {
    const response = await fetch(`${baseUrl}/book/${bookId}/choice`, {
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

export const saveQuestions = async (bookId: number, questions: Question[]) => {
  console.log('questions', questions);
  const accessToken = useAuthStore.getState().accessToken;
  const reasons = questions.map(question => ({
    choice_id: question.choice_id,
    reason: question.answer,
  }));
  try {
    const response = await fetch(`${baseUrl}/book/${bookId}/choice/reason`, {
      method: 'POST',
      headers: {
        Authorization: `${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reasons: reasons,
      }),
    });
    return response.json();
  } catch (error) {
    console.error('saveQuestions 에러:', error);
    throw error;
  }
};
