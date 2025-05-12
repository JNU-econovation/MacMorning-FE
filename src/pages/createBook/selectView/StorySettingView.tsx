import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';
import Toggle from '@/components/common/toggle/Toggle';
import DropDownToggle from '@/components/common/toggle/DropDownToggle';
import CharacterSelectInput from '@/components/createBook/characterSelect/CharacterSelectInput';
import GenderToggle from '@/components/createBook/characterSelect/GenderToggle';

interface FormData {
  genre: string[];
  gameMode: boolean;
  story: {
    perspective: string;
    background: string;
  };
  character: {
    name: string;
    gender: string;
    age: string;
    description: string;
  };
}

type StorySettingViewProps = {
  initialData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const StorySettingView = (props: StorySettingViewProps): React.JSX.Element => {
  return (
    <CharacterSelectContainer>
      <GameModeContainer>
        <GameModeTitle font="NPSfont_bold">게임 모드</GameModeTitle>
        <Toggle
          onToggle={() => {
            props.setFormData(prev => ({...prev, gameMode: !prev.gameMode}));
          }}
          isOn={props.initialData.gameMode}
        />
      </GameModeContainer>
      <CharacterDetailContainer>
        <InputContainer>
          <TitleText font="NPSfont_bold">이야기 진행 시점</TitleText>
          <DropDownToggle
            title="1인칭"
            value={props.initialData.story.perspective}
            onChange={value => {
              props.setFormData(prev => ({
                ...prev,
                story: {...prev.story, perspective: value},
              }));
            }}
            list={['1인칭', '3인칭']}
          />
        </InputContainer>
      </CharacterDetailContainer>
      <BackgroundContainer>
        <TitleText font="NPSfont_bold">시대적 배경</TitleText>
        <CharacterSelectInput
          style={{height: '100%', width: '80%'}}
          value={props.initialData.story.background}
          onChange={value => {
            props.setFormData(prev => ({
              ...prev,
              story: {...prev.story, background: value},
            }));
          }}
        />
      </BackgroundContainer>
    </CharacterSelectContainer>
  );
};

const CharacterSelectContainer = styled.View`
  gap: ${scale(10)}px;
  width: 100%;
`;

const GameModeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${scale(5)}px;
`;

const CharacterDetailContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

const BackgroundContainer = styled.View`
  flex-direction: row;
  height: 25%;
  align-items: center;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const GameModeTitle = styled(CustomText)`
  font-size: ${scale(12)}px;
`;

const TitleText = styled(CustomText)`
  width: ${scale(80)}px;
  font-size: ${scale(9)}px;
`;

export default StorySettingView;
