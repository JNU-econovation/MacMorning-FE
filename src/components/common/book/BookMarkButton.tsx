import React, {useState} from 'react';
import HeartRegularSVG from '@/assets/images/common/heart-regular.svg';
import HeartSolidSVG from '@/assets/images/common/heart-solid.svg';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {baseUrl} from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BookMarkButtonProps {
    book_id: number;
    is_bookmarked: boolean;
}

const BookMarkButton = ({book_id, is_bookmarked}: BookMarkButtonProps): React.JSX.Element => {
    const [isBookmarked, setIsBookmarked] = useState(is_bookmarked);
    const [isLoading, setIsLoading] = useState(false);

    const toggleBookmark = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        
        try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        
        const response = await fetch(`${baseUrl}/bookmark`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `${accessToken}`,
            },
            body: JSON.stringify({
            book_id: book_id,
            }),
        });

        const data = await response.json();
        
        if (response.ok) {
            if (data === true || data.success === true) {
            setIsBookmarked(!isBookmarked);
            }
        } else {
            console.error('북마크 요청 실패:', data);
        }
        } catch (error) {
            console.error('북마크 요청 중 오류 발생:', error);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <BookmarkButtonContainer onPress={toggleBookmark} disabled={isLoading}>
        {isBookmarked ? (
            <HeartSolidSVG color="#ff4757" width={scale(15)} height={scale(15)} />
        ) : (
            <HeartRegularSVG color="#ff4757" width={scale(15)} height={scale(15)} />
        )}
        </BookmarkButtonContainer>
    );
};

const BookmarkButtonContainer = styled.TouchableOpacity`
    position: absolute;
    right: ${scale(10)}px;
    width: ${scale(40)}px;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export default BookMarkButton;