import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Header from '@/components/common/header/Header';
import {scale} from 'react-native-size-matters';
import ChooseThumbnailView from './ChooseThumbnailView';
import StepButton from '@/components/common/buttons/StepButton';
import {getBookDetail} from '@/apis/book/getBook';
import {getBookAllIllust, setThumbnail} from '@/apis/Illust/illusts';
import {useAuthStore} from '@/store/authStore';
import {BookDetail} from '@/types/book';
import {Illust} from '@/types/book';
import {Alert} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

type ChooseThumbnailProps = RootStackScreenProps<'ChooseThumbnail'>;

const ChooseThumbnail = ({route}: ChooseThumbnailProps): React.JSX.Element => {
  const {bookId} = route.params?.props || {};
  const accessToken = useAuthStore(state => state.accessToken);
  const navigation = useNavigation<RootStackNavigationProp>();

  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [illust, setIllust] = useState<Illust[]>([]);
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<number | null>(
    null,
  );

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
          setIllust(illustResponse.filter(item => item.image_url !== ''));
        }
        console.log('illustResponse', illust);
      } catch (error) {
        console.error('ChooseThumbnail 데이터 fetch 에러:', error);
      }
    };
    fetchData();
  }, [bookId, accessToken]);

  const handleSelectThumbnail = (selectedId: number | null) => {
    setSelectedThumbnailId(selectedId);
  };

  const handleChoose = async () => {
    if (illust.length === 0) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'MainTabs', params: {screen: 'Home'}}],
        }),
      );
      return;
    }

    if (!selectedThumbnailId) {
      Alert.alert('알림', '썸네일을 선택해주세요.');
      return;
    }

    // 선택된 ID로 해당 일러스트 찾기
    const selectedIllust = illust.find(
      item => item.illust_id === selectedThumbnailId,
    );

    if (!selectedIllust || !selectedIllust.image_url) {
      Alert.alert('오류', '선택된 이미지를 찾을 수 없습니다.');
      return;
    }

    try {
      const success = await setThumbnail(
        bookId,
        selectedIllust.image_url,
        accessToken,
      );

      if (success) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'MainTabs', params: {screen: 'Home'}}],
          }),
        );
      } else {
        Alert.alert('오류', '썸네일 설정에 실패했습니다.');
      }
    } catch (error) {
      console.error('썸네일 설정 오류:', error);
      Alert.alert('오류', '썸네일 설정 중 오류가 발생했습니다.');
    }
  };

  return (
    <ChooseThumbnailContainer>
      <Header title={bookDetail?.title || '썸네일 선택'} headerType="create" />
      <ChooseThumbnailViewContainer>
        <ChooseThumbnailView
          illust={illust}
          onSelectThumbnail={handleSelectThumbnail}
        />
      </ChooseThumbnailViewContainer>
      <ProgressButtonContainer>
        <ProgressButtonWrapper>
          <StepButton text="선택 완료" onPress={handleChoose} />
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
  align-items: center;
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
