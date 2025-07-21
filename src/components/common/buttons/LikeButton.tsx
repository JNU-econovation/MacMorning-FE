import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {Book} from '@/types/book';
import likeBook from '@/apis/book/likeBook';

const LikeButton = ({book, size}: {book: Book; size: number}) => {
  const [isLiked, setIsLiked] = useState(book.is_bookmarked);
  const heartIcon =
    isLiked === true
      ? require('@/assets/images/common/heart-filled.png')
      : require('@/assets/images/common/heart-outline.png');

  const onClickLikeButton = async () => {
    await likeBook(book.book_id);
    setIsLiked(!isLiked);
  };

  return (
    <LikeButtonContainer onPress={onClickLikeButton}>
      <Image
        source={heartIcon}
        style={{width: scale(size), height: scale(size)}}
      />
    </LikeButtonContainer>
  );
};

const LikeButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: ${scale(10)}px;
  right: ${scale(10)}px;
`;

export default LikeButton;
