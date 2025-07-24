import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';

import Header from '@/components/common/header/Header';
import {useAuthStore} from '@/store/authStore';
import {getBestBooks, getBooks, getLikedBooks} from '@/apis/book/getBooks';
import {Book} from '@/types/book';

import GuestView from '@/components/common/guestView/GuestView';
import {ListRenderItem} from '@react-native/virtualized-lists';
import BookComponent from '@/components/common/book/BookComponent';
import Category from '@/components/common/category/Category';
import Loading from '@/components/common/loading/Loading';

function Mybook(): React.JSX.Element {
  const accessToken = useAuthStore(state => state.accessToken);
  const [selectedCategory, setSelectedCategory] = useState<string>('인기');
  const isAuthenticated = accessToken;
  const [books, setBooks] = useState<Book[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = async (
    orderStrategy?: string,
    cursor?: string,
    accessToken?: string,
    isLoadMore: boolean = false,
  ) => {
    try {
      setIsLoading(true);

      if (selectedCategory === '인기') {
        const {books: newBooks, nextCursor: newNextCursor} = await getBestBooks(
          cursor,
          accessToken,
        );
        setBooks(isLoadMore ? [...books, ...newBooks] : newBooks);
        setNextCursor(newNextCursor);
        setHasMore(!!newNextCursor);
      } else if (selectedCategory === '둘러보기') {
        const {books: newBooks, nextCursor: newNextCursor} = await getBooks(
          orderStrategy,
          cursor,
          accessToken,
        );
        setBooks(isLoadMore ? [...books, ...newBooks] : newBooks);
        setNextCursor(newNextCursor);
        setHasMore(!!newNextCursor);
      } else if (selectedCategory === '찜') {
        const {books: newBooks, nextCursor: newNextCursor} =
          await getLikedBooks(orderStrategy, cursor, accessToken);
        setBooks(isLoadMore ? [...books, ...newBooks] : newBooks);
        setNextCursor(newNextCursor);
        setHasMore(!!newNextCursor);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setBooks([]);
    setNextCursor(null);
    setHasMore(true);

    if (isAuthenticated) {
      fetchBooks('created_at_desc', undefined, accessToken, false);
    } else {
      fetchBooks('created_at_desc', undefined, undefined, false);
    }
  }, [accessToken, selectedCategory]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading && nextCursor) {
      fetchBooks('created_at_desc', nextCursor, accessToken, true);
    }
  };

  const renderItem: ListRenderItem<Book> = ({item: book}) => (
    <BookComponent book={book} />
  );

  return (
    <LibraryContainer>
      <Header title="이야기 도서관" headerType="default" />
      <Category
        categoryList={['인기', '둘러보기', '찜']}
        setCategory={setSelectedCategory}
      />
      <LibraryFlatListContainer>
        {isAuthenticated ? (
          <FlatList<Book>
            style={{width: '100%'}}
            data={books}
            renderItem={renderItem}
            keyExtractor={(book, index) => `${book.book_id}-${index}`}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={1}
            contentContainerStyle={{
              paddingTop: scale(30),
            }}
            columnWrapperStyle={{
              gap: '8%',
              marginBottom: scale(30),
            }}
          />
        ) : (
          <GuestView />
        )}
      </LibraryFlatListContainer>
    </LibraryContainer>
  );
}

const LibraryContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.background.white};
`;

const LibraryFlatListContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.background.white};
  padding: 0 ${scale(30)}px;
`;
export default Mybook;
