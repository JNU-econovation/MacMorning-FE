import React, {useState} from 'react';
import CustomText from '@/utils/CustomText';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import {Alert} from 'react-native';

interface FormData {
  genre: string[];
  character: string;
}

type GenreSelectViewProps = {
  initialData: string[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  availableGenres: string[];
  onAddGenre: (genre: string) => void;
  onRemoveGenre: (genre: string) => void;
};

const GenreSelectView = ({
  initialData,
  setFormData,
  availableGenres,
  onAddGenre,
  onRemoveGenre,
}: GenreSelectViewProps): React.JSX.Element => {
  const [isAdding, setIsAdding] = useState(false);
  const [newGenre, setNewGenre] = useState('');

  const handleSelectGenre = (genre: string) => {
    setFormData(prev => {
      if (prev.genre.includes(genre)) {
        return {...prev, genre: prev.genre.filter(g => g !== genre)};
      } else if (prev.genre.length < 3) {
        return {...prev, genre: [...prev.genre, genre]};
      } else {
        Alert.alert('3개 이상의 장르를 선택할 수 없습니다.');
        return prev;
      }
    });
  };

  const handleAddGenre = () => {
    const trimmedGenre = newGenre.trim();
    if (availableGenres.includes(trimmedGenre)) {
      Alert.alert('이미 있는 장르입니다.');
      return 0;
    }

    if (availableGenres.length >= 12) {
      Alert.alert('');
      return 0;
    }

    if (trimmedGenre) {
      onAddGenre(trimmedGenre);
    }
    setNewGenre('');
    setIsAdding(false);
  };

  const handleRemoveGenre = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.filter(g => g !== genre),
    }));
    onRemoveGenre(genre);
  };

  return (
    <GenreSelectContainer>
      <GenreSelectButtonsWrapper>
        {availableGenres.map(genre => (
          <GenreSelectButton
            activeOpacity={1}
            key={genre}
            isSelected={initialData.includes(genre)}
            onPress={() => handleSelectGenre(genre)}
            onLongPress={() => handleRemoveGenre(genre)}>
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
        {availableGenres.length < 12 &&
          (isAdding ? (
            <GenreSelectButton isSelected={false}>
              <GenreInput
                value={newGenre}
                onChangeText={setNewGenre}
                autoFocus
                onSubmitEditing={handleAddGenre}
                onBlur={() => {
                  setIsAdding(false);
                  setNewGenre('');
                }}
                maxLength={10}
              />
            </GenreSelectButton>
          ) : (
            <GenreSelectButton
              activeOpacity={1}
              isSelected={false}
              onPress={() => setIsAdding(true)}>
              <CustomText
                style={{
                  fontSize: scale(10),
                  color: COLORS.text.secondary,
                }}
                font="NPSfont_regular">
                + 추가
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

const GenreInput = styled.TextInput`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: ${scale(10)}px;
  color: ${COLORS.text.secondary};
  font-family: 'NPSfont_regular';
`;
