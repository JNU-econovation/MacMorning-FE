import React from 'react';
import styled from 'styled-components/native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import Header from '@/components/common/header/Header';

type ReadBookProps = RootStackScreenProps<'ReadBook'>;

const ReadBook = ({ route }: ReadBookProps) => {
  const { story_id } = route.params.props;

  return (
    <ReadBookContainer>
      <Header title="동화책 읽기" headerType="default" />
      <ContentContainer>
        <CustomText 
          font="NPSfont_bold" 
          style={{ 
            fontSize: scale(16), 
            color: COLORS.text.primary,
            textAlign: 'center'
          }}
        >
          ReadBook 입니다. {story_id}
        </CustomText>
      </ContentContainer>
    </ReadBookContainer>
  );
};

const ReadBookContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.background.white};
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${scale(20)}px;
`;

export default ReadBook;