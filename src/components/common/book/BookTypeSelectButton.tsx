import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import CustomText from '@/utils/CustomText';
import GridSVG from '@/assets/images/bookTypeSelectButton/grid.svg';
import ListSVG from '@/assets/images/bookTypeSelectButton/list.svg';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';

interface BookTypeSelectButtonProps {
  isGrid: boolean;
}

const BookTypeSelectButton = ({
  isGrid,
}: BookTypeSelectButtonProps): React.JSX.Element => {
  const onPress = () => {
    console.log('onPress');
  };
  return (
    <BookTypeSelectButtonContainer>
      <BookTypeSelectButtonItem onPress={onPress} activeOpacity={1}>
        <GridSVG
          width={scale(15)}
          height={scale(15)}
          color={isGrid ? COLORS.primary : COLORS.text.primary}
        />
      </BookTypeSelectButtonItem>
      <BookTypeSelectButtonItem onPress={onPress} activeOpacity={1}>
        <ListSVG
          width={scale(15)}
          height={scale(15)}
          color={isGrid ? COLORS.text.primary : COLORS.primary}
        />
      </BookTypeSelectButtonItem>
    </BookTypeSelectButtonContainer>
  );
};

const BookTypeSelectButtonContainer = styled.View`
  justify-content: flex-end;
  align-items: center;
  gap: ${scale(5)}px;
  padding-right: ${scale(10)}px;
  width: 100%;
  height: 7%;
  flex-direction: row;
`;

const BookTypeSelectButtonItem = styled.TouchableOpacity``;

export default BookTypeSelectButton;
