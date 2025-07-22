import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { createNavigationHelpers } from '@/utils/navigate/NavigateHelpers';

interface ShareButtonProps {
    text: string;
    onPress: () => void;
}

export const useShareButtonHandlers = (book_id: number | null, bookDetail: any) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { goToReadBook } = createNavigationHelpers(navigation);

    const handleReadStory = () => {
    if (!book_id) {
        console.warn('book_id가 없습니다.');
        return;
    }
    goToReadBook({ book_id: book_id, page_number: 1 });
    };

    const handleCreateStory = () => {
    if (!bookDetail) {
        console.warn('bookDetail이 없습니다.');
        return;
    }
    const formDataFromBookDetail = {
        genre: bookDetail.genre || [],
        gameMode: false,
        title: `${bookDetail.title}`,
        character: {
            name: bookDetail.character?.name || '',
            gender: bookDetail.character?.gender || '남성',
            age: bookDetail.character?.age || '',
            description: bookDetail.character?.characteristic || '',
        },
        story: {
            grammatical_person: bookDetail.character?.grammatical_person || '1인칭',
            historical_background: bookDetail.character?.historical_background || bookDetail.background || '',
            plot: `${bookDetail.title}`,
        },
    };

    navigation.navigate('CreateBook', { 
        preFilledData: formDataFromBookDetail 
    });
};

    return {
    handleReadStory,
    handleCreateStory,
    };
};

const ShareButton = ({
    text, 
    onPress
}: ShareButtonProps): React.JSX.Element => {
    return (
        <ButtonContainer onPress={onPress}>
            <ButtonText>
                <CustomText
                    style={{fontSize: scale(10), color: COLORS.text.white}}
                    font="NPSfont_bold">
                    {text}
                </CustomText>
            </ButtonText>
            <CustomText
                style={{fontSize: scale(10), color: COLORS.text.white}}
                font="NPSfont_bold">
                →
            </CustomText>
        </ButtonContainer>
    );
};

const ButtonContainer = styled.TouchableOpacity`
    background-color: ${COLORS.primary};
    border-radius: ${scale(15)}px;
    padding-horizontal: ${scale(16)}px;
    padding-vertical: ${scale(12)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${scale(12)}px;
    width: 100%;
`;

const ButtonText = styled.Text<{variant: string}>`
    flex: 1;
`;

export default ShareButton;