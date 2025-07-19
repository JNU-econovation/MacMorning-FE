import React from 'react';
import styled from 'styled-components/native';
import Header from '@/components/common/header/Header';
import {scale} from 'react-native-size-matters';
import ChooseThumbnailView from './ChooseThumbnailView';
import StepButton from '@/components/common/buttons/StepButton';

const ChooseThumbnail = (): React.JSX.Element => {

  const handleChoose = () => {

  };

  return (
    <ChooseThumbnailContainer>
      <Header title="썸네일 선택" headerType="create" />
      <ChooseThumbnailViewContainer>
        <ChooseThumbnailView />
      </ChooseThumbnailViewContainer>
      <ProgressButtonContainer>
        <ProgressButtonWrapper>
          <StepButton
            text="선택 완료"
            onPress={handleChoose}
          />
        </ProgressButtonWrapper>
      </ProgressButtonContainer>
    </ChooseThumbnailContainer>
  );
};

const ChooseThumbnailContainer = styled.View`
  width: 100%;
  height: 100%;
  gap: ${scale(10)}px;
`;

const ChooseThumbnailViewContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${scale(20)}px;
`;

const ProgressButtonContainer = styled.View`
  width: 100%;
  align-items: center
`;

const ProgressButtonWrapper = styled.View`
  width: 90%;
  padding-bottom: ${scale(15)}px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  gap: ${scale(15)}px;
`;
export default ChooseThumbnail;