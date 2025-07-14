import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';

import Header from '@/components/common/header/Header';
import {useAuthStore} from '@/store/authStore';
import {getMyBooks} from '@/apis/book/getBooks';
import GuestView from '@/components/common/guestView/GuestView';
import {ListRenderItem} from '@react-native/virtualized-lists';
import BookComponent from '@/components/common/book/BookComponent';

function Mybook(): React.JSX.Element {
  const accessToken = useAuthStore(state => state.accessToken);
  const isAuthenticated = accessToken;
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMyBooks = async (cursor?: string) => {
    if (!accessToken || isLoading) return;

    setIsLoading(true);
    try {
      const response = await getMyBooks(
        'created_at_desc',
        accessToken || '',
        cursor,
      );

      if (cursor) {
        setMyBooks(prev => [...prev, ...response.books]);
      } else {
        setMyBooks(response.books);
      }

      setNextCursor(response.nextCursor);
      setHasMore(!!response.nextCursor);
    } catch (error) {
      console.error('내 책 불러오기 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, [accessToken]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading && nextCursor) {
      fetchMyBooks(nextCursor);
    }
  };

  const renderItem: ListRenderItem<Book> = ({item: book}) => (
    <BookComponent book={book} />
  );

  return (
    <MyBookContainer>
      <Header title="내 책" headerType="default" />
      <MybookFlatListContainer>
        {isAuthenticated ? (
          <FlatList<Book>
            style={{width: '100%'}}
            data={myBooks}
            renderItem={renderItem}
            keyExtractor={(book, index) => `${book.id}-${index}`}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{
              paddingTop: scale(30),
              paddingBottom: scale(60),
            }}
            columnWrapperStyle={{
              marginBottom: scale(20),
              gap: '8%',
            }}
          />
        ) : (
          <GuestView />
        )}
      </MybookFlatListContainer>
    </MyBookContainer>
  );
}

const MyBookContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.background.white};
`;

const MybookFlatListContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.background.white};
  padding: 0 ${scale(30)}px;
`;
export default Mybook;
