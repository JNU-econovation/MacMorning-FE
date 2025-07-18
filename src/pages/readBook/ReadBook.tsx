import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '@/constants/colors';
import ReadBookView from './ReadBookView';
import ProgressBar from '@/components/readBook/ProgressBar';
import StepButton from '@/components/common/buttons/StepButton';
import CustomText from '@/utils/CustomText';
import { useAuthStore } from '@/store/authStore';
import { BookPage } from '@/types/book';
import { getBookPage } from '@/apis/book/getBook';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { createNavigationHelpers } from '@/utils/navigate/NavigateHelpers';

type ReadBookProps = RootStackScreenProps<'ReadBook'>;

const ReadBook = ({ route }: ReadBookProps) => {
    const { book_id, page_number } = route.params.props;
    const accessToken = useAuthStore(state => state.accessToken);
    const [bookPage, setBookPage] = useState<BookPage | null>(null);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { goToReadBook } = createNavigationHelpers(navigation);

    const isPrevDisabled = page_number <= 1;
    const isNextDisabled = bookPage?.total_page ? page_number >= bookPage.total_page : true;

    useEffect(() => {
        const fetchBookPage = async () => {
            if (!accessToken) return;

            try {
                const response = await getBookPage(book_id, page_number, accessToken);
                console.log(response)
                setBookPage(response);
            } catch (error) {
                console.error('fetchBookDetail 에러 : ', error)
            }
        };
        fetchBookPage();
    }, [book_id, page_number, accessToken]);

    const handlePrevPage = () => {
        if (!isPrevDisabled) {
            goToReadBook({ 
                book_id, 
                page_number: page_number - 1 
            });
        }
    };

    const handleNextPage = () => {
        if (!isNextDisabled) {
            goToReadBook({ 
                book_id, 
                page_number: page_number + 1 
            });
        }
    };
    return (
        <ReadBookContainer>
            <ProgressBarWrapper>
                <ProgressBar totalPages={bookPage?.total_page || 0} currentPage={page_number} />
            </ProgressBarWrapper>
            <ReadBookViewContainer>
                <ReadBookView bookPage={bookPage} />
            </ReadBookViewContainer>
            <ProgressButtonWrapper>
                <StepButton 
                    text="이전" 
                    onPress={handlePrevPage}
                    disabled={isPrevDisabled}
                />
                <CustomText
                    style={{fontSize: scale(10), color: COLORS.text.primary}}
                    font="NPSfont_regular">
                    {page_number}/{bookPage?.total_page}
                </CustomText> 
                <StepButton 
                    text="다음" 
                    onPress={handleNextPage}
                    disabled={isNextDisabled}
            />
            </ProgressButtonWrapper>
        </ReadBookContainer>
    );
};

const ReadBookContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${COLORS.background.white};
`;

const ProgressBarWrapper = styled.View`
    width: 100%;
    padding: ${scale(20)}px;
    align-items: center;
    justify-content: center;
`;

const ReadBookViewContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const ProgressButtonWrapper = styled.View`
    width: 100%;
    padding: ${scale(15)}px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: ${scale(15)}px;
`;

export default ReadBook;