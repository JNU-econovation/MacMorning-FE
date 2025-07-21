import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {Book} from '@/types/book';

const LikeButton = ({book, size}: {book: Book; size: number}) => {
  const heartIcon =
    book.is_bookmarked === true
      ? require('@/assets/images/common/heart-filled.png')
      : require('@/assets/images/common/heart-outline.png');

  const onClickLikeButton = () => {
    console.log('onClickLikeButton');
  };
  return (
    <LikeButtonContainer activeOpacity={1} onPress={onClickLikeButton}>
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
