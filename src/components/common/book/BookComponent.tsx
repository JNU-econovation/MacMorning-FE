import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';
import {Book} from '@/types/book';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {createNavigationHelpers} from '@/utils/navigate/NavigateHelpers';

interface BookComponentProps {
  book: Book;
}

function BookComponent({book}: BookComponentProps): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {goToCreatedBookProgress} = createNavigationHelpers(navigation);

  const handlePress = () => {
    goToCreatedBookProgress({bookId: Number(book.id), lastPage: 0});
  };

  return (
    <BookComponentContainer onPress={handlePress}>
      <BookImageWrapper></BookImageWrapper>
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

const BookImageWrapper = styled.View`
  width: 100%;
  aspect-ratio: 1;
  background-color: gray;
  border-radius: ${scale(5)}px;
`;

const BookInfoContainer = styled.View`
  width: 100%;
`;

export default BookComponent;
