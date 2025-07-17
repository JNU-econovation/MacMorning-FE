import React, {useEffect, useState} from 'react';
import {View, FlatList, ListRenderItem} from 'react-native';
import styled from 'styled-components/native';
import BookComponent from '@/components/common/book/BookComponent';
import {getRecentMyBooks, getMainBestBooks} from '@/apis/book/getBooks';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import TextNavigateButton from '@/components/home/TextNavigateButton';
import {useNavigation} from '@react-navigation/native';
import GuestView from '@/components/common/guestView/GuestView';
import {useAuthStore} from '@/store/authStore';
import {Book} from '@/types/book';
import Loading from '@/components/common/loading/Loading';

const HomeView = (): React.JSX.Element => {
  const [MyBooks, setMyBooks] = useState<Book[]>([]);
  const [bestBooks, setBestBooks] = useState<Book[]>([]);
  const accessToken = useAuthStore(state => state.accessToken);
  const isAuthenticated = accessToken;
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      if (!accessToken) return;

      try {
        const {books: myBooks} = await getRecentMyBooks(
          'created_at_desc',
          accessToken,
        );
        setMyBooks(myBooks);
        const {books: bestBooks} = await getMainBestBooks();
        setBestBooks(bestBooks);
      } catch (error) {
        console.error('fetchBooks 에러:', error);
      }
      setIsLoading(false);
    };

    fetchBooks();
  }, [accessToken]);

  const renderItem: ListRenderItem<Book> = ({item: book}) => (
    <BookComponent book={book} />
  );
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <HomeViewContainer>
      <HomeButtonContainer>
        <TextNavigateButton
          onPress={() => navigation.navigate('MyBook')}
          text="내가 쓴 이야기"
          fontInfo={{
            font: 'NPSfont_bold',
            fontSize: scale(12),
            fontColor: COLORS.text.primary,
          }}
        />
      </HomeButtonContainer>
      {isAuthenticated ? (
        isLoading ? (
          <Loading />
        ) : (
          <FlatList<Book>
            style={{width: '100%'}}
            data={MyBooks}
            renderItem={renderItem}
            keyExtractor={book => book.book_id.toString()}
            numColumns={4}
            scrollEnabled={false}
            columnWrapperStyle={{
              marginBottom: scale(20),
              gap: '8%',
            }}
          />
        )
      ) : (
        <GuestView />
      )}

      <HomeButtonContainer>
        <TextNavigateButton
          onPress={() => navigation.navigate('MyBook')}
          text="Best 이야기"
          fontInfo={{
            font: 'NPSfont_bold',
            fontSize: scale(12),
            fontColor: COLORS.text.primary,
          }}
        />
      </HomeButtonContainer>
      {isAuthenticated ? (
        isLoading ? (
          <Loading />
        ) : (
          <FlatList<Book>
            style={{width: '100%'}}
            data={bestBooks}
            renderItem={renderItem}
            keyExtractor={book => book.book_id.toString()}
            numColumns={4}
            scrollEnabled={false}
            columnWrapperStyle={{
              marginBottom: scale(20),
              gap: '8%',
            }}
          />
        )
      ) : (
        <GuestView />
      )}
    </HomeViewContainer>
  );
};

const HomeViewContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 ${scale(20)}px;
`;

const HomeButtonContainer = styled.TouchableOpacity`
  width: 100%;
  margin: 0 0 ${scale(10)}px 0;
`;
export default HomeView;
