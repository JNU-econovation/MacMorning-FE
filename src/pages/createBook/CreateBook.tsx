import React, {useState} from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

import {WINDOW_WIDTH, WINDOW_HEIGHT} from '@/constants/windowSize';
import createBook from '@/apis/book/createBook';
import {createStory} from '@/apis/AI/createStory';
import {FormData} from '@/types/form';
import {createNavigationHelpers} from '@/utils/navigate/NavigateHelpers';
import {useNavigation} from '@react-navigation/native';

import CreateBookTitle from './CreateBookTitle';
import Header from '@/components/common/header/Header';
import CharacterSelectView from './selectView/CharacterSelectView';
import GenreSelectView from './selectView/GenreSelectView';
import SelectView from './selectView/SelectView';
import StepButton from '@/components/common/buttons/StepButton';
import StorySettingView from './selectView/StorySettingView';
import SelectedSettingView from './selectView/SelectedSettingView';
import {RouteProp, useRoute} from '@react-navigation/native';

interface CreateBookTitle {
  titleText: string;
  subtitleText: string;
}

const CreateBookTitles: CreateBookTitle[] = [
  {
    titleText: '어떤 이야기를 만들어볼까요?',
    subtitleText: '장르는 3개까지 정할 수 있어요',
  },
  {
    titleText: '이야기의 세부 설정들을 알려주세요.',
    subtitleText: '설정된 내용은 바꿀 수 없어요.',
  },
  {
    titleText: '주인공에 대한 정보를 입력해주세요.',
    subtitleText: '설정된 내용은 바꿀 수 없어요.',
  },
  {
    titleText: '이렇게 이야기를 시작할까요?',
    subtitleText: '설정된 내용은 바꿀 수 없어요.',
  },
];

const CreateBook = (): React.JSX.Element => {
  const route = useRoute<RouteProp<RootStackParamList, 'CreateBook'>>();
  const preFilledData = route.params?.preFilledData;
  const navigation = useNavigation<RootStackNavigationProp>();
  const {goToStoryProgress} = createNavigationHelpers(navigation);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(
    preFilledData || {
      genre: [],
      gameMode: false,
      title: '',
      character: {
        name: '',
        gender: '남성',
        age: '',
        description: '',
      },
      story: {
        grammatical_person: '1인칭',
        historical_background: '',
        plot: '',
      },
    },
  );
  const [availableGenres, setAvailableGenres] = useState<string[]>([
    '판타지',
    '로맨스',
    'SF',
    '미스터리',
    '코미디',
    '액션',
  ]);

  const handleAddGenre = (newGenre: string) => {
    if (!availableGenres.includes(newGenre)) {
      setAvailableGenres(prev => [...prev, newGenre]);
    }
  };

  const handleRemoveGenre = (genre: string) => {
    Alert.alert(
      '장르 삭제',
      `"${genre}" 장르를 삭제하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            setAvailableGenres(prev => prev.filter(g => g !== genre));
            setFormData(prev => ({
              ...prev,
              genre: prev.genre.filter(g => g !== genre),
            }));
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleStep = (direction: number) => {
    if (currentStep === 0) {
      if (formData.genre.length === 0) {
        Alert.alert('장르를 선택해주세요.');
        return;
      }
    }

    if (currentStep === 1) {
      if (formData.title === '') {
        Alert.alert('제목을 입력해주세요.');
        return;
      }
      if (formData.story.plot === '') {
        Alert.alert('이야기의 줄거리를 입력해주세요.');
        return;
      }
      if (formData.story.historical_background === '') {
        Alert.alert('이야기의 시대적 배경을 입력해주세요.');
        return;
      }
    }

    if (currentStep === 2) {
      if (formData.character.name === '') {
        Alert.alert('주인공의 이름을 입력해주세요.');
        return;
      }
      if (formData.character.age === '나이') {
        Alert.alert('주인공의 나이를 입력해주세요.');
        return;
      }
      if (formData.character.description === '') {
        Alert.alert('주인공의 특징을 입력해주세요.');
        return;
      }
    }

    setCurrentStep(prev => {
      return prev + direction;
    });
  };

  const handleCreateBook = async (formData: FormData) => {
    const response = await createBook(formData);
    goToStoryProgress({
      bookId: Number(response.data.id),
      lastPage: 0,
      formData: formData,
      createStatus: 'create',
    });
  };

  return (
    <CreateBookContainer>
      <Header title="이야기 만들기" headerType="create" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={-scale(80)} // 필요시 조정
      >
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, height: WINDOW_HEIGHT - 100}}>
          <CreateBookTitle
            titleText={CreateBookTitles[currentStep].titleText}
            subtitleText={CreateBookTitles[currentStep].subtitleText}
          />
          <CreateBookContainer>
            <SelectView>
              {currentStep === 0 && (
                <GenreSelectView
                  initialData={formData.genre}
                  setFormData={setFormData}
                  availableGenres={availableGenres}
                  onAddGenre={handleAddGenre}
                  onRemoveGenre={handleRemoveGenre}
                />
              )}
              {currentStep === 1 && (
                <StorySettingView
                  initialData={formData}
                  setFormData={setFormData}
                />
              )}
              {currentStep === 2 && (
                <CharacterSelectView
                  initialData={formData}
                  setFormData={setFormData}
                />
              )}
              {currentStep === 3 && <SelectedSettingView data={formData} />}
            </SelectView>

            <BottomBarButtonContainer>
              {currentStep > 0 ? (
                <StepButton text="이전" onPress={() => handleStep(-1)} />
              ) : (
                <View style={{width: scale(40), height: scale(20)}} />
              )}
              {currentStep < 3 ? (
                <StepButton text="다음" onPress={() => handleStep(1)} />
              ) : (
                <StepButton
                  text="생성"
                  onPress={() => handleCreateBook(formData)}
                />
              )}
            </BottomBarButtonContainer>
          </CreateBookContainer>
        </ScrollView>
      </KeyboardAvoidingView>
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
