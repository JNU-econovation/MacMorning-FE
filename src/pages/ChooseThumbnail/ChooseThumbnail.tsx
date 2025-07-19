import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Header from '@/components/common/header/Header';
import {scale} from 'react-native-size-matters';
import ChooseThumbnailView from './ChooseThumbnailView';
import StepButton from '@/components/common/buttons/StepButton';
import {getBookDetail, getBookAllIllust} from '@/apis/book/getBook';
import {useAuthStore} from '@/store/authStore';
import {BookDetail} from '@/types/book';
import { Illust } from '@/types/book';

type ChooseThumbnailProps = RootStackScreenProps<'ChooseThumbnail'>;

const ChooseThumbnail = ({ route }: ChooseThumbnailProps): React.JSX.Element => {
  const {bookId} = route.params?.props || {};
  const accessToken = useAuthStore(state => state.accessToken);
  
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [illust, setIllust] = useState<Illust[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken || !bookId) return;

      try {
        // 1. 책 정보 불러오기 - 책 제목을 불러오기 위함임.
        const bookResponse = await getBookDetail(bookId, accessToken);
        setBookDetail(bookResponse);

        // 2. 모든 일러스트 불러오기
        const illustResponse = await getBookAllIllust(bookId, accessToken);
        if (illustResponse) {
          setIllust(illustResponse);
        }
      } catch (error) {
        console.error('ChooseThumbnail 데이터 fetch 에러:', error);
      }
    };
    fetchData();
  }, [bookId, accessToken]);

  const handleChoose = () => {

  };

  return (
    <ChooseThumbnailContainer>
      <Header title={bookDetail?.title || '썸네일 선택'} headerType="create" />
      <ChooseThumbnailViewContainer>
        <ChooseThumbnailView illust={illust}/>
      </ChooseThumbnailViewContainer>
      <ProgressButtonContainer>
        <ProgressButtonWrapper>
          <StepButton
            text="선택 완료"
            onPress={handleChoose}
          />
        </ProgressButtonWrapper>
      </ProgressButtonContainer>
    </ChooseThumbnailContainer>
  );
};

const ChooseThumbnailContainer = styled.View`
  width: 100%;
  height: 100%;
  gap: ${scale(10)}px;
`;

const ChooseThumbnailViewContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${scale(20)}px;
`;

const ProgressButtonContainer = styled.View`
  width: 100%;
  align-items: center
`;

const ProgressButtonWrapper = styled.View`
  width: 90%;
  padding-bottom: ${scale(15)}px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  gap: ${scale(15)}px;
`;
export default ChooseThumbnail;