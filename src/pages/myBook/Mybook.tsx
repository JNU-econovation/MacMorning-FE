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

  useEffect(() => {
    const fetchMyBooks = async () => {
      if (!accessToken) return;

      try {
        const response = await getMyBooks('created_at_desc', accessToken || '');
        setMyBooks(response.books);
      } catch (error) {
        console.error('내 책 불러오기 에러:', error);
      }
    };
    fetchMyBooks();
  }, [accessToken]);

  const renderItem: ListRenderItem<Book> = ({item: book}) => (
    <BookComponent book={book} />
  );

  return (
    <MyBookContainer>
      <Header title="내 책" headerType="default" />
      <MybookScrollContainer>
        {isAuthenticated ? (
          <FlatList<Book>
            style={{width: '100%'}}
            data={myBooks}
            renderItem={renderItem}
            keyExtractor={book => book.id}
            numColumns={4}
            scrollEnabled={false}
            columnWrapperStyle={{
              marginBottom: scale(20),
              gap: '8%',
            }}
          />
        ) : (
          <GuestView />
        )}
      </MybookScrollContainer>
    </MyBookContainer>
  );
}

const MyBookContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.background.white};
`;

const MybookScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.background.white};
  padding: ${scale(30)}px;
`;
export default Mybook;
