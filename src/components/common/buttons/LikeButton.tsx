import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {Book} from '@/types/book';
import likeBook from '@/apis/book/likeBook';
import HeartRegularSVG from '@/assets/images/common/heart-regular.svg';
import HeartSolidSVG from '@/assets/images/common/heart-solid.svg';

const LikeButton = ({book, size}: {book: Book; size: number}) => {
  const [isLiked, setIsLiked] = useState(book.is_bookmarked);
  const heartIcon =
    isLiked === true ? (
      <HeartSolidSVG color="#ff4757" width={scale(size)} height={scale(size)} />
    ) : (
      <HeartRegularSVG
        color="#ff4757"
        width={scale(size)}
        height={scale(size)}
      />
    );

  const onClickLikeButton = async () => {
    await likeBook(book.book_id);
    setIsLiked(!isLiked);
  };

  return (
    <LikeButtonContainer onPress={onClickLikeButton}>
      {heartIcon}
    </LikeButtonContainer>
  );
};

const LikeButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: ${scale(10)}px;
  right: ${scale(10)}px;
`;

export default LikeButton;
