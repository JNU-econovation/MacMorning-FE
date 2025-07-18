import {baseUrl} from '@/constants/api';
import {BookDetail, BookPage} from '@/types/book';

async function getBookDetail(bookId? : number, accessToken?: string) {
  const url = `${baseUrl}/book/${bookId}`;
  try {
    const response = await (
      await fetch(url, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
    ).json();

    const mappedBookDetail: BookDetail = {
      book_id: response.data.book_id,
      title_img_url: response.data.title_img_url,
      title: response.data.title,
      author: response.data.author,
      background: response.data.background,
      is_bookmarked: response.data.is_bookmarked,
      character: response.data.character,
      genre: response.data.genre,
      created_at: response.data.created_at,
  };
    
    return mappedBookDetail;
  } catch (error) {
    console.error('getBookDetail API 에러:', error);
    return null;
  }
}

async function getBookPage(bookNumber: number, pageNumber: number, accessToken?: string): Promise<BookPage | null> {
  const url = `${baseUrl}/book/${bookNumber}/story/${pageNumber}`;
  
  try {
    const response = await (
      await fetch(url, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
    ).json();


    const { story, illust, choice } = response.data;

    const mappedBookPage: BookPage = {
      story_text: story?.story_text || '',
      total_page: story.total_page || 0,
      image_url: illust?.image_url || '',
      my_choice: choice?.my_choice || null,
      first_choice: choice?.first_choice || '',
      second_choice: choice?.second_choice || '',
      third_choice: choice?.third_choice || '',
      is_success: choice?.is_success || '',
    };
    return mappedBookPage;
  } catch (error) {
    console.error('getBookPage API 에러:', error);
    return null;
  }
}

export {getBookDetail, getBookPage};
