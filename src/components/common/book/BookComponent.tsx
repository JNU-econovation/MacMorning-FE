import React from 'react';
import {Alert, View} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';
import {Book} from '@/types/book';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {createNavigationHelpers} from '@/utils/navigate/NavigateHelpers';
import {useImageUrl} from '@/hooks/useImageUrl';
import LikeButton from '@/components/common/buttons/LikeButton';

interface BookComponentProps {
  book: Book;
}

function BookComponent({book}: BookComponentProps): React.JSX.Element {
  const imageUrl = useImageUrl(book?.title_img_url);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {goToStoryProgress, goToShareBook} =
    createNavigationHelpers(navigation);

  const handlePress = () => {
    if (book?.is_in_progress === null || book?.is_in_progress === false) {
      console.log(book.is_bookmarked || false);
      goToShareBook({
        bookId: Number(book.book_id),
        is_bookmarked: book.is_bookmarked,
      });
    } else {
      Alert.alert('작성중이던 이야기예요!', '이어 쓰시겠어요?', [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            goToStoryProgress({
              bookId: Number(book.book_id),
              lastPage: book.total_page - 1,
              createStatus: 'getStory',
            });
          },
        },
      ]);
    }
  };

  return (
    <BookComponentContainer onPress={handlePress}>
      <LikeButtonWrapper>
        <LikeButton
          book_id={book.book_id}
          is_bookmarked={book.is_bookmarked || false}
          size={scale(5.4)}
        />
      </LikeButtonWrapper>
      <BookImage source={{uri: imageUrl}} />
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
  height: ${scale(100)}px;
  gap: 1%;
`;

const LikeButtonWrapper = styled.View`
  z-index: 100;
  position: absolute;
  top: -${scale(5)}px;
  right: -${scale(5)}px;
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
