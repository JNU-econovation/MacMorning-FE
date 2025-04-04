import React from 'react';
import {View, FlatList, ListRenderItem} from 'react-native';
import styled from 'styled-components/native';
import BookComponent from '../../components/common/book/BookComponent';
import {getBooks} from '../../apis/book/mock';
import {scale} from 'react-native-size-matters';
import {colors} from '../../constants/colors';
import CustomText from '../../utils/CustomText';
import TextNavigateButton from '../../components/home/TextNavigateButton';

const HomeView: React.FC = () => {
  const books: Book[] = getBooks();
  const renderItem: ListRenderItem<Book> = ({item: book}) => (
    <BookComponent book={book} />
  );

  return (
    <HomeViewContainer>
      <HomeButtonContainer>
        <TextNavigateButton
          onPress={() => console.log('내가 쓴 이야기')}
          text="내가 쓴 이야기"
          fontInfo={{
            font: 'NPSfont_bold',
            fontSize: scale(12),
            fontColor: colors.text.primary,
          }}
        />
      </HomeButtonContainer>
      <FlatList<Book>
        data={books}
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
