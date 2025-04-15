import React, {useState} from 'react';
import {View} from 'react-native';
import CreateBookTitle from './CreateBookTitle';
import Header from '@/components/common/header/Header';
import styled from 'styled-components/native';
import CharacterSelectView from './selectView/CharacterSelectView';
import GenreSelectView from './selectView/GenreSelectView';
import SelectView from './selectView/SelectView';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '@/constants/windowSize';
import {scale} from 'react-native-size-matters';
import StepButton from '@/components/common/buttons/StepButton';

const CreateBook = (): React.JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    genre: '',
    character: '',
  });

  const handleStep = (direction: number, data?: Partial<typeof formData>) => {
    if (data) {
      setFormData(prev => ({...prev, ...data}));
    }

    setCurrentStep(prev => {
      return prev + direction;
    });
  };

  return (
    <CreateBookContainer>
      <Header title="이야기 만들기" headerType="create" />
      <CreateBookTitle
        titleText="어떤 이야기를 만들어볼까요?"
        subtitleText="장르는 3개까지 정할 수 있어요"
      />
      <SelectView>
        {currentStep === 0 && <GenreSelectView />}
        {currentStep === 1 && <CharacterSelectView />}
      </SelectView>

      <BottomBarButtonContainer>
        {currentStep > 0 ? (
          <StepButton text="이전" onPress={() => handleStep(-1)} />
        ) : (
          <View style={{width: scale(40), height: scale(20)}} />
        )}
        {currentStep < 2 && (
          <StepButton text="다음" onPress={() => handleStep(1)} />
        )}
      </BottomBarButtonContainer>
    </CreateBookContainer>
  );
};

export default CreateBook;

const CreateBookContainer = styled.View`
  width: ${WINDOW_WIDTH}px;
  height: ${WINDOW_HEIGHT}px;
`;

const BottomBarButtonContainer = styled.View`
  width: 100%;
  height: 10%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${scale(10)}px;
  padding: 0 ${scale(40)}px;
`;
