import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';
import Toggle from '@/components/common/toggle/Toggle';
import DropDownToggle from '@/components/common/toggle/DropDownToggle';
import CharacterSelectInput from '@/components/createBook/characterSelect/CharacterSelectInput';
import GenderToggle from '@/components/createBook/characterSelect/GenderToggle';
import {FormData} from '@/types/form';

type StorySettingViewProps = {
  initialData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const StorySettingView = (props: StorySettingViewProps): React.JSX.Element => {
  return (
    <CharacterSelectContainer showsVerticalScrollIndicator={false}>
      <GameModeContainer>
        <GameModeTitle font="NPSfont_bold">게임 모드</GameModeTitle>
        <Toggle
          onToggle={() => {
            Alert.alert('게임 모드는 준비중이에요! 👋');
            // props.setFormData(prev => ({...prev, gameMode: !prev.gameMode}));
          }}
          isOn={props.initialData.gameMode}
        />
      </GameModeContainer>
      <CharacterDetailContainer>
        <InputContainer>
          <TitleText font="NPSfont_bold">이야기 진행 시점</TitleText>
          <DropDownToggle
            title="1인칭"
            value={props.initialData.story.grammatical_person}
            onChange={value => {
              props.setFormData(prev => ({
                ...prev,
                story: {...prev.story, grammatical_person: value},
              }));
            }}
            list={['1인칭', '3인칭']}
          />
        </InputContainer>
      </CharacterDetailContainer>
      <BackgroundContainer alignItems="center" style={{height: scale(20)}}>
        <TitleText font="NPSfont_bold">제목</TitleText>
        <CharacterSelectInput
          style={{height: '100%', width: '80%'}}
          value={props.initialData.title}
          onChange={value => {
            props.setFormData(prev => ({
              ...prev,
              title: value,
            }));
          }}
        />
      </BackgroundContainer>
      <BackgroundContainer>
        <TitleText font="NPSfont_bold">줄거리</TitleText>
        <CharacterSelectInput
          style={{height: '100%', width: '80%'}}
          value={props.initialData.story.plot}
          onChange={value => {
            props.setFormData(prev => ({
              ...prev,
              story: {...prev.story, plot: value},
            }));
          }}
        />
      </BackgroundContainer>
      <BackgroundContainer>
        <TitleText font="NPSfont_bold">시대적 배경</TitleText>
        <CharacterSelectInput
          style={{height: '100%', width: '80%'}}
          value={props.initialData.story.historical_background}
          onChange={value => {
            props.setFormData(prev => ({
              ...prev,
              story: {...prev.story, historical_background: value},
            }));
          }}
        />
      </BackgroundContainer>
    </CharacterSelectContainer>
  );
};

const CharacterSelectContainer = styled.ScrollView`
  margin: ${scale(20)}px 0;
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
  margin-bottom: ${scale(15)}px;

  gap: ${scale(10)}px;
`;

const BackgroundContainer = styled.View`
  flex-direction: row;
  height: ${scale(50)}px;
  margin-bottom: ${scale(20)}px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const GameModeTitle = styled(CustomText)`
  font-size: ${scale(12)}px;
`;

const TitleText = styled(CustomText)`
  width: ${scale(76)}px;
  font-size: ${scale(9)}px;
`;

export default StorySettingView;
