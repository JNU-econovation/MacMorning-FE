import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';
import {Book} from '@/types/book';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {createNavigationHelpers} from '@/utils/navigate/NavigateHelpers';
import { useImageUrl } from '@/hooks/useImageUrl';

interface BookComponentProps {
  book: Book;
}

function BookComponent({book}: BookComponentProps): React.JSX.Element {
  const imageUrl = useImageUrl(book?.title_img_url);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {goToCreatedBookProgress, goToShareBook} = createNavigationHelpers(navigation);

  const handlePress = () => {
    if (book?.is_in_progress === null || book?.is_in_progress === false) {
      goToShareBook({bookId: Number(book.book_id)});
    } else {
      goToCreatedBookProgress({bookId: Number(book.book_id), lastPage: 0});
    }
  };

  return (
    <BookComponentContainer onPress={handlePress}>
      <BookImage 
        source={{uri:imageUrl}}
      />
      <BookInfoContainer>
        <CustomText font={'NPSfont_bold'} style={{fontSize: scale(10)}}>
          {book?.title}
        </CustomText>
        <CustomText font={'NPSfont_regular'} style={{fontSize: scale(7)}}>
          {book?.author}
        </CustomText>
      </BookInfoContainer>
    </BookComponentContainer>
  );
}
const BookComponentContainer = styled.TouchableOpacity`
  width: 19%;
  gap: 1%;
`;

const BookImage = styled.Image`
  width: 100%;
  aspect-ratio: 1;
  background-color: gray;
  border-radius: ${scale(5)}px;
`;

const BookInfoContainer = styled.View`
  width: 100%;
`;

export default BookComponent;
