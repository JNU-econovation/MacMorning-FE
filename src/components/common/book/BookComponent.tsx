import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';

interface BookComponentProps {
  book?: Book;
}

function BookComponent({book}: BookComponentProps): React.JSX.Element {
  return (
    <BookComponentContainer onPress={() => console.log('book 클릭')}>
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
