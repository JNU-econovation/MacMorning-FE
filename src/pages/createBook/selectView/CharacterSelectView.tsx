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

type CharacterSelectViewProps = {
  initialData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const CharacterSelectView = (
  props: CharacterSelectViewProps,
): React.JSX.Element => {
  return (
    <CharacterSelectContainer>
      <CharacterDetailContainer>
        <InputContainer width="30%">
          <TitleText font="NPSfont_bold">주인공 이름</TitleText>
          <View style={{width: '70%', height: '40%'}}>
            <CharacterSelectInput
              value={props.initialData.character.name}
              onChange={value => {
                props.setFormData(prev => ({
                  ...prev,
                  character: {...prev.character, name: value},
                }));
              }}
            />
          </View>
        </InputContainer>
        <InputContainer>
          <TitleText font="NPSfont_bold">나이</TitleText>
          <DropDownToggle
            title="나이"
            value={props.initialData.character.age}
            onChange={value => {
              props.setFormData(prev => ({
                ...prev,
                character: {...prev.character, age: value},
              }));
            }}
            list={['어린이', '청소년', '청년', '노인']}
          />
        </InputContainer>
        <InputContainer>
          <TitleText font="NPSfont_bold">성별</TitleText>
          <GenderToggle
            isOn={props.initialData.character.gender === '남'}
            onToggle={() => {
              props.setFormData(prev => ({
                ...prev,
                character: {
                  ...prev.character,
                  gender: prev.character.gender === '남' ? '여' : '남',
                },
              }));
            }}
          />
        </InputContainer>
      </CharacterDetailContainer>
      <CharacterDescriptionContainer>
        <TitleText font="NPSfont_bold">캐릭터 설명</TitleText>
        <CharacterSelectInput
          style={{height: '100%'}}
          value={props.initialData.character.description}
          onChange={value => {
            props.setFormData(prev => ({
              ...prev,
              character: {...prev.character, description: value},
            }));
          }}
        />
      </CharacterDescriptionContainer>
    </CharacterSelectContainer>
  );
};

const CharacterSelectContainer = styled.View`
  gap: ${scale(10)}px;
  height: 100%;
  width: 100%;
`;

const CharacterDetailContainer = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const CharacterDescriptionContainer = styled.View`
  height: 50%;
  gap: ${scale(5)}px;
`;

const InputContainer = styled.View`
  gap: ${scale(10)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleText = styled(CustomText)`
  font-size: ${scale(9)}px;
`;

export default CharacterSelectView;
