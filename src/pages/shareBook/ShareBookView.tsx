import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import { useImageUrl } from '@/hooks/useImageUrl';
import { useDateFormat } from '@/hooks/useDateFormat';
import BookMarkButton from '@/components/common/book/BookMarkButton';
import ShareBadge from '@/components/common/badge/shareBadge';
import CustomText from '@/utils/CustomText';
import ShareButton, {useShareButtonHandlers} from '@/components/common/buttons/ShareButton';

const ShareBookView = ({bookDetail}: {bookDetail: any}) => {
  const imageUrl = useImageUrl(bookDetail?.title_img_url);
  const formattedDate = useDateFormat(bookDetail?.created_at);
  const {handleReadStory, handleCreateStory} = useShareButtonHandlers(bookDetail?.book_id, bookDetail);
  return (
    <ShareBookViewContainer>
      <LeftContainer>
        <BookImage source={{uri: imageUrl}} />
      </LeftContainer>
      <RightContainer>
        <BookDetailContainer>
          <BookMarkButton book_id={bookDetail?.book_id} is_bookmarked={bookDetail?.is_bookmarked === true} />
          <ShareBadge text='제목'/>
            <TextContainer>
              <CustomText
                style={{fontSize: scale(12), color: COLORS.text.primary}}
                font="NPSfont_regular">
                {bookDetail?.title}
              </CustomText>
            </TextContainer>
          <ShareBadge text='지은이'/>
            <TextContainer>
              <CustomText
                style={{fontSize: scale(12), color: COLORS.text.primary}}
                font="NPSfont_regular">
                {bookDetail?.author}
              </CustomText>
            </TextContainer>
          <ShareBadge text='작성일'/>
            <TextContainer>
              <CustomText
                style={{fontSize: scale(12), color: COLORS.text.primary}}
                font="NPSfont_regular">
                {formattedDate}
              </CustomText> 
            </TextContainer>
        </BookDetailContainer>
        <ShareButton onPress={handleReadStory} text={'동화책 읽으러 가기'}/>
        <ShareButton onPress={handleCreateStory} text={'해당 주제로 이야기 만들기'}/>
      </RightContainer>
    </ShareBookViewContainer>
  );
};

const ShareBookViewContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: ${scale(10)}px;
`;

const LeftContainer = styled.View`
  flex: 1;
  margin: ${scale(5)}px ${scale(15)}px;
  background-color: ${COLORS.background.white};
  border-radius: ${scale(10)}px;
  border-color: ${'rgba(0, 0, 0, 0.0)'};
`;

const BookImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${scale(8)}px;
`;

const RightContainer = styled.View`
  flex: 1;
  margin: ${scale(5)}px ${scale(15)}px;
`;

const BookDetailContainer = styled.View`
  width: 100%;
  height: 65%;
  padding: ${scale(15)}px ${scale(15)}px;
  background-color: ${COLORS.background.white};
  border-radius: ${scale(10)}px;
  shadow-color: ${COLORS.background.black};
  shadow-offset: 0px ${scale(2)}px;
  shadow-opacity: 0.1;
  shadow-radius: ${scale(3)}px;
  border-width: ${scale(1)}px;
  border-color: ${'rgba(0, 0, 0, 0.0)'};
  elevation: 2;
`;

const TextContainer = styled.View`
  margin-vertical: ${scale(10)}px;
`;

export default ShareBookView;
