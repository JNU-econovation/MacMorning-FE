import {baseUrl} from '@/constants/api';

async function getBooks(cursor?: string) {
  const limit = 4;

  const url = cursor
    ? `${baseUrl}?limit=${limit}&cursor=${cursor}`
    : `${baseUrl}?limit=${limit}`;

  const response = await (await fetch(url)).json();

  return {
    books: response.data.books,
    nextCursor: response.data.next_cursor,
  };
}

async function getRecentMyBooks(orderStrategy?: string, accessToken?: string) {
  const baseUrl = 'https://api.ilovejokbal.monster/v1/books/mybooks';
  const limit = 4;

  const url = `${baseUrl}?limit=${limit}&order_strategy=${orderStrategy}`;

  console.log('url', url);
  console.log('accessToken', accessToken);
  const response = await (
    await fetch(url, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
  ).json();
  console.log('response', response);
  return {
    books: response.data.books,
    nextCursor: response.data.next_cursor,
  };
}

async function getMainBestBooks() {
  const baseUrl = 'https://api.ilovejokbal.monster/v1/books/best';
  const limit = 4;
  const url = `${baseUrl}?limit=${limit}`;

  const response = await (await fetch(url)).json();

  return {
    books: response.data.books,
    nextCursor: response.data.next_cursor,
  };
}

export {getBooks, getRecentMyBooks, getMainBestBooks};
