import {baseUrl} from '@/constants/api';

async function getBookDetail(bookId? : number, accessToken?: string) {
  const url = `${baseUrl}/book/${bookId}`;

  const response = await (
    await fetch(url, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
  ).json();

  return {
    title: response.data.title,
    titleImgUrl: response.data.title_img_url,
    author: response.data.author,
    createdAt: response.data.created_at,
    background: response.data.background,
    isBookMarked : response.data.is_bookmarked,
    character: response.data.character,
    genre: response.data.genre,
  };
}
export {getBookDetail};
