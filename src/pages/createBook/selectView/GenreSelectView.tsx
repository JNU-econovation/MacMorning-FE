import React from 'react';
import CustomText from '@/utils/CustomText';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';

const GENRES = ['판타지', '로맨스', 'SF', '미스터리', '코미디', '액션'];

interface FormData {
  genre: string[];
  character: string;
}

type GenreSelectViewProps = {
  initialData: string[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const GenreSelectView = ({
  initialData,
  setFormData,
}: GenreSelectViewProps): React.JSX.Element => {
  const handleSelectGenre = (genre: string) => {
    setFormData(prev => {
      if (prev.genre.includes(genre)) {
        return {...prev, genre: prev.genre.filter(g => g !== genre)};
      } else if (prev.genre.length < 3) {
        return {...prev, genre: [...prev.genre, genre]};
      }
      return prev;
    });
  };

  return (
    <GenreSelectContainer>
      <GenreSelectButtonsWrapper>
        {GENRES.map(genre => (
          <GenreSelectButton
            activeOpacity={1}
            key={genre}
            isSelected={initialData.includes(genre)}
            onPress={() => handleSelectGenre(genre)}>
            <CustomText
              style={{
                fontSize: scale(10),
                color: initialData.includes(genre)
                  ? COLORS.primary
                  : COLORS.text.secondary,
              }}
              font="NPSfont_regular">
              {genre}
            </CustomText>
          </GenreSelectButton>
        ))}
      </GenreSelectButtonsWrapper>
    </GenreSelectContainer>
  );
};

export default GenreSelectView;

const GenreSelectContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${scale(10)}px;
  justify-content: center;
`;

const GenreSelectButtonsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 4%;
`;

const GenreSelectButton = styled.TouchableOpacity<{isSelected: boolean}>`
  width: 22%;
  height: ${scale(30)}px;
  padding: ${scale(5)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${scale(20)}px;
  border-width: ${scale(1)}px;
  border-color: ${({isSelected}: {isSelected: boolean}) =>
    isSelected ? COLORS.primary : COLORS.background.lightGray};
  margin-bottom: ${scale(10)}px;
`;
