import React, {useEffect, useState} from 'react';
import {View, FlatList, ListRenderItem} from 'react-native';
import styled from 'styled-components/native';
import BookComponent from '@/components/common/book/BookComponent';
import {getRecentMyBooks, getMainBestBooks} from '@/apis/book/getBooks';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import TextNavigateButton from '@/components/home/TextNavigateButton';
import {useNavigation} from '@react-navigation/native';

const HomeView = (): React.JSX.Element => {
  const [MyBooks, setMyBooks] = useState<Book[]>([]);
  const [nextMyBookCursor, setNextMyBookCursor] = useState<string | null>(null);
  const [bestBooks, setBestBooks] = useState<Book[]>([]);
  const [nextBestCursor, setNextBestCursor] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const {books: myBooks, nextCursor: myBooksCursor} =
        await getRecentMyBooks();
      setMyBooks(myBooks);
      setNextMyBookCursor(myBooksCursor);

      const {books: bestBooks, nextCursor: bestBooksCursor} =
        await getMainBestBooks();
      setBestBooks(bestBooks);
      setNextBestCursor(bestBooksCursor);
    };
    fetchBooks();
  }, []);

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
      <FlatList<Book>
        data={MyBooks}
        renderItem={renderItem}
        keyExtractor={book => book.id}
        numColumns={4}
        scrollEnabled={false}
        columnWrapperStyle={{
          marginBottom: scale(20),
          gap: '8%',
        }}
      />

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
      <FlatList<Book>
        data={bestBooks}
        renderItem={renderItem}
        keyExtractor={book => book.id}
        numColumns={4}
        scrollEnabled={false}
        columnWrapperStyle={{
          marginBottom: scale(20),
          gap: '8%',
        }}
      />
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
