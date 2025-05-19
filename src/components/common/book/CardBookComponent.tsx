import React from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';

interface BookInfo {
  title: string;
  author: string;
  image: string;
  isLiked: boolean;
  description: string;
}

const CardBookComponent = (bookInfo: BookInfo): React.JSX.Element => {
  const heartIcon = bookInfo.isLiked
    ? require('@/assets/images/heart-filled.png')
    : require('@/assets/images/heart-outline.png');

  return (
    <CardBookComponentContainer>
      <LikeButton>
        <Image
          source={heartIcon}
          style={{width: scale(16), height: scale(16)}}
        />
      </LikeButton>
      <BookImageWrapper></BookImageWrapper>
      <BookInfoContainer>
        <BookTitleContainer>
          <BookTitle font={'NPSfont_bold'}>{bookInfo.title}</BookTitle>
          <BookAuthor font={'NPSfont_regular'}>{bookInfo.author}</BookAuthor>
        </BookTitleContainer>
        <BookDescriptionContainer>
          <CustomText
            font={'NPSfont_bold'}
            style={{color: COLORS.primary, fontSize: scale(11)}}>
            주제
          </CustomText>
          <BookDescription font={'NPSfont_regular'}>
            {bookInfo.description}
          </BookDescription>
        </BookDescriptionContainer>
      </BookInfoContainer>
    </CardBookComponentContainer>
  );
};

const CardBookComponentContainer = styled.View`
  width: 80%;
  height: ${scale(120)}px;
  border-radius: ${scale(10)}px;
  shadow-color: ${COLORS.background.black};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  background-color: white;
  align-items: center;
  padding: 0 ${scale(10)}px;
  flex-direction: row;
  justify-content: space-between;
`;

const BookImageWrapper = styled.View`
  background-color: black;
  width: ${scale(80)}px;
  height: ${scale(100)}px;
  border-radius: ${scale(10)}px;
`;

const BookImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const LikeButton = styled.TouchableOpacity`
  position: absolute;
  top: ${scale(10)}px;
  right: ${scale(10)}px;
`;

const BookInfoContainer = styled.View`
  height: ${scale(100)}px;
  padding: ${scale(5)}px 0;
  width: 73%;
  gap: ${scale(5)}px;
  justify-content: space-between;
`;

const BookTitleContainer = styled.View`
  gap: ${scale(5)}px;
`;

const BookTitle = styled(CustomText)`
  font-size: ${scale(14)}px;
  font-weight: bold;
`;

const BookAuthor = styled(CustomText)`
  font-size: ${scale(10)}px;
  color: ${COLORS.text.secondary};
`;

const BookDescriptionContainer = styled.View`
  gap: ${scale(2)}px;
`;

const BookDescription = styled(CustomText)`
  font-size: ${scale(9)}px;
  color: ${COLORS.text.primary};
`;

export default CardBookComponent;
