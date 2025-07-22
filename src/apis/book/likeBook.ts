import {baseUrl} from '@/constants/api';
import axios from 'axios';
import {useAuthStore} from '@/store/authStore';

const likeBook = async (bookId: number) => {
  const accessToken = useAuthStore.getState().accessToken;
  try {
    const response = await axios.post(
      `${baseUrl}/bookmark`,
      {
        book_id: bookId,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export default likeBook;
