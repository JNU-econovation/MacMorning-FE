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

async function getRecentMyBooks(cursor?: string, orderStrategy?: string) {
  const limit = 4;

  const url = cursor
    ? `${baseUrl}/books/mybooks?limit=${limit}&order_strategy=${orderStrategy}&cursor=${cursor}`
    : `${baseUrl}/books/mybooks?limit=${limit}&order_strategy=${orderStrategy}`;

  const response = await (await fetch(url)).json();

  return {
    books: response.data.books,
    nextCursor: response.data.next_cursor,
  };
}

async function getMainBestBooks(cursor?: string) {
  const limit = 4;

  const url = cursor
    ? `${baseUrl}/books/best?limit=${limit}&cursor=${cursor}`
    : `${baseUrl}/books/best?limit=${limit}`;

  const response = await (await fetch(url)).json();

  return {
    books: response.data.books,
    nextCursor: response.data.next_cursor,
  };
}

export {getBooks, getRecentMyBooks, getMainBestBooks};
