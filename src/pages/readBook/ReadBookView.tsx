import React from 'react';
import styled from 'styled-components/native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import { useStoryImageUrl } from '@/hooks/useImageUrl';

interface ReadBookViewProps {
    bookPage: any;
    textSize: 'small' | 'medium' | 'large';
}

const ReadBookView = ({ bookPage, textSize }: ReadBookViewProps) => {
    const imageUrl = useStoryImageUrl(bookPage?.image_url);

    const getFontSize = (size: 'small' | 'medium' | 'large') => {
        switch (size) {
            case 'small': return scale(7);
            case 'medium': return scale(9);
            case 'large': return scale(11);
            default: return scale(9);
        }
    };

    return (
        <ReadBookViewContainer>
            <LeftContainer>
                <BookImage source={{uri: imageUrl}} />
            </LeftContainer>
            <RightContainer>
                <StoryContainer>
                    <CustomText font="NPSfont_regular" style={{fontSize: getFontSize(textSize)}}>
                        {bookPage?.story_text}
                    </CustomText>
                </StoryContainer>
            </RightContainer>
        </ReadBookViewContainer>
    );
};

const ReadBookViewContainer = styled.View`
    background-color: ${COLORS.background.white};
    flex-direction: row;
    width: 90%;
    height: 100%;
    border-radius: ${scale(10)}px;
    shadow-color: ${COLORS.background.black};
    shadow-offset: 0px ${scale(2)}px;
    shadow-opacity: 0.1;
    shadow-radius: ${scale(3)}px;
    border-width: ${scale(1)}px;
    border-color: ${'rgba(0, 0, 0, 0.0)'};
    elevation: 5;
`;

const LeftContainer = styled.View`
    width: 50%;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: ${scale(10)}px;
`;

const BookImage = styled.Image`
    width: 100%;
    height: 100%;
    border-top-left-radius: ${scale(10)}px;
    border-bottom-left-radius: ${scale(10)}px;
`;

const RightContainer = styled.View`
    width: 50%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
`;

const StoryContainer = styled.ScrollView`
    width: 100%;
    padding: ${scale(20)}px;
`;

export default ReadBookView;