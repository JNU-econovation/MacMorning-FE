import React from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';

const ProgressBar = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  return (
    <ProgressBarContainer>
      <ProgressBarInner totalPages={totalPages} currentPage={currentPage} />
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.View`
  width: ${scale(400)}px;
  height: ${scale(9)}px;
  border-width: ${scale(0.8)}px;
  border-color: ${COLORS.background.lightGray};
  background-color: ${COLORS.background.white};
  justify-content: center;
  border-radius: ${scale(10)}px;
`;

const ProgressBarInner = styled.View`
  width: ${({
    totalPages,
    currentPage,
  }: {
    totalPages: number;
    currentPage: number;
  }) => `${(currentPage / totalPages) * 100}%`};
  height: 100%;
  background-color: ${COLORS.primary};
  border-radius: ${scale(10)}px;
`;

export default ProgressBar;
