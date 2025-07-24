import {baseUrl} from '@/constants/api';
import {useAuthStore} from '@/store/authStore';

async function getBooks(
  orderStrategy?: string,
  cursor?: string,
  accessToken?: string,
) {
  const limit = 8;
  let url = `${baseUrl}/books?limit=${limit}`;

  if (orderStrategy !== undefined) {
    url += `&order_strategy=${orderStrategy}`;
  }
  if (cursor !== undefined) {
    url += `&cursor=${cursor}`;
  }

  const response = await (
    await fetch(url, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
  ).json();

  return {
    books: response.data.books,
    nextCursor: response.data.next_cursor,
  };
}

async function getBestBooks(cursor?: string, accessToken?: string) {
  const limit = 8;
  let url = `${baseUrl}/books/best?limit=${limit}`;

  if (cursor !== undefined) {
    url += `&cursor=${cursor}`;
  }

  const response = await (
    await fetch(url, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
  ).json();

  return {
    books: response.data.books,
    nextCursor: response.data.next_cursor,
  };
}

async function getLikedBooks(
  orderStrategy?: string,
  cursor?: string,
  accessToken?: string,
) {
  const limit = 4;

  let url = `${baseUrl}/books/bookmarks?limit=${limit}`;

  if (orderStrategy !== undefined) {
    url += `&order_strategy=${orderStrategy}`;
  }

  if (cursor !== undefined) {
    url += `&cursor=${cursor}`;
  }

  const response = await (
    await fetch(url, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
  ).json();

  return {
    books: response.data.books,
    nextCursor: response.data.next_cursor,
  };
}

async function getMyBooks(
  orderStrategy?: string,
  accessToken?: string,
  cursor?: string,
  progress?: boolean,
) {
  const baseUrl = 'https://api.ilovejokbal.monster/v1/books/mybooks';
  const limit = 8;

  let url = `${baseUrl}?limit=${limit}&order_strategy=${orderStrategy}`;

  if (cursor !== undefined) {
    url += `&cursor=${cursor}`;
  }
  if (progress !== undefined) {
    url += `&progress=${progress}`;
  }

  const response = await (
    await fetch(url, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
  ).json();

  return {
    books: response.data.books,
    nextCursor: response.data.next_cursor,
  };
}

async function getRecentMyBooks(orderStrategy?: string) {
  const baseUrl = 'https://api.ilovejokbal.monster/v1/books/mybooks';
  const limit = 4;
  const accessToken = useAuthStore.getState().accessToken;

  if (!accessToken) {
    return {
      books: [],
      nextCursor: null,
    };
  }

  const url = `${baseUrl}?limit=${limit}&order_strategy=${orderStrategy}`;

  const response = await (
    await fetch(url, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
  ).json();

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
  console.log('response', response);
  return {
    books: response.data.books,
    nextCursor: response.data.next_cursor,
  };
}

export {
  getBooks,
  getMyBooks,
  getRecentMyBooks,
  getMainBestBooks,
  getBestBooks,
  getLikedBooks,
};
