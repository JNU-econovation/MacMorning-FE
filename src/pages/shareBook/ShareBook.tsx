import React, {useEffect, useState} from 'react';
import Header from '@/components/common/header/Header';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import ShareBookView from './ShareBookView';
import { getBookDetail } from '@/apis/book/getBook';
import { useAuthStore } from '@/store/authStore';
import {BookDetail} from '@/types/book';

type ShareBookProps = RootStackScreenProps<'ShareBook'>;

const ShareBook = ({route}: ShareBookProps) => {
    const {bookId} = route.params.props;
    const accessToken = useAuthStore(state => state.accessToken);
    const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);

    useEffect(() => {
        const fetchBookDetail = async () => {
            if (!accessToken) return;

            try {
                const response = await getBookDetail(bookId, accessToken);
                const {
                    title,
                    titleImgUrl,
                    author,
                    background,
                    createdAt,
                    isBookMarked,
                    character,
                    genre
                } = response;
                
                const mappedBookDetail: BookDetail = {
                    book_id: bookId,
                    title_img_url: titleImgUrl,
                    title: title,
                    author: author,
                    background: background,
                    is_bookmarked: isBookMarked,
                    character: character,
                    genre: genre,
                    created_at: createdAt,
                };
                setBookDetail(mappedBookDetail);
            } catch (error) {
                console.error('fetchBookDetail 에러 : ', error)
            }
        };
        fetchBookDetail();
    }, [bookId, accessToken, bookDetail]);

    return (
        <ShareBookContainer>
        <Header title={bookDetail?.title || ''} headerType="edit" />
        <ShareBookViewContainer>
            <ShareBookView bookDetail = {bookDetail} />
        </ShareBookViewContainer>
        </ShareBookContainer>
    );
};

const ShareBookContainer = styled.View`
    width: 100%;
    height: 100%;
`;

const ShareBookViewContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    border-radius: ${scale(20)}px;
`;

export default ShareBook;
