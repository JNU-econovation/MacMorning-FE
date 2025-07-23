import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';
import QuestionInput from '@/components/question/QeustionInput';
import CustomText from '@/utils/CustomText';
import {COLORS} from '@/constants/colors';
import {getQuestions, saveQuestions} from '@/apis/questions/getQuestions';
import {RouteProp, useRoute} from '@react-navigation/native';
import Loading from '@/components/common/loading/Loading';
import Header from '@/components/common/header/Header';
import QuestionsTitle from './QuestionsTitle';
import {Question} from '@/types/form';
import {createNavigationHelpers} from '@/utils/navigate/NavigateHelpers';
import {CommonActions, useNavigation} from '@react-navigation/native';

const ReadQuestions = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ReadQuestions'>>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const {bookId} = route.params.props;

  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 0,
      question: '질문의 제목이 보여집니다.',
      answer: '답변이 보여집니다.',
      choice_id: 0,
    },
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const response = await getQuestions(bookId);
      console.log('response', response);
      setQuestions(
        response.data.choices
          .filter(
            (choice: any) => choice.my_choice !== 3 && choice.reason !== '',
          )
          .map((choice: any, index: number) => ({
            id: index,
            question: choice.choice_content,
            answer: choice.reason,
            choice_id: choice.choice_id,
          })),
      );
      console.log('questions', questions);
      setIsLoading(false);
    };
    fetchQuestions();
  }, []);
  return (
    <QuestionContainer>
      <QuestionsTitle
        titleText={'작가의 의도를 확인해보세요!'}
        subtitleText={'해당 선택지를 고른 이유를 함께 확인해봐요.'}
      />
      <QuestionPageContainer>
        {questions.length > 0 ? (
          <>
            <QuestionListContainer showsVerticalScrollIndicator={false}>
              {questions.map(
                question =>
                  question && (
                    <QuestionWrapper
                      activeOpacity={1}
                      active={selectedQuestion === question.id}
                      key={question.id}
                      onPress={() => setSelectedQuestion(question.id)}>
                      <CustomText
                        font="NPSfont_regular"
                        style={{
                          fontSize: scale(9),
                          color: question.answer
                            ? COLORS.text.primary
                            : COLORS.text.secondary,
                        }}>
                        {question.id + 1}. {question.question}
                      </CustomText>
                    </QuestionWrapper>
                  ),
              )}
            </QuestionListContainer>
            <QuestionInputContainer>
              {questions.map(question =>
                question.id === selectedQuestion ? (
                  <QuestionInput
                    key={question.id}
                    question={question}
                    setAnswer={() => {}}
                  />
                ) : null,
              )}
            </QuestionInputContainer>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: scale(50),
            }}>
            <CustomText
              font="NPSfont_regular"
              style={{fontSize: scale(10), color: COLORS.text.secondary}}>
              작가의 의도가 없습니다.
            </CustomText>
          </View>
        )}
      </QuestionPageContainer>

      <QuestionSaveButton
        right={scale(7.5)}
        onPress={() => {
          navigation.goBack();
        }}>
        <CustomText
          font="NPSfont_bold"
          style={{color: COLORS.text.white, fontSize: scale(8)}}>
          이야기로 돌아가기
        </CustomText>
      </QuestionSaveButton>

      <QuestionSaveButton
        right={scale(2)}
        onPress={() => {
          navigation.goBack();
          navigation.goBack();
        }}>
        <CustomText
          font="NPSfont_bold"
          style={{color: COLORS.text.white, fontSize: scale(8)}}>
          그만 읽기
        </CustomText>
      </QuestionSaveButton>
    </QuestionContainer>
  );
};

const QuestionContainer = styled.View`
  flex: 1;
`;

const QuestionPageContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: ${scale(10)}px;
`;

const QuestionListContainer = styled.ScrollView`
  flex: 1;
  gap: ${scale(10)}px;
`;

const QuestionWrapper = styled.TouchableOpacity<{active: boolean}>`
  flex: 1;
  padding: ${scale(12)}px ${scale(15)}px;
  margin: ${scale(5)}px 0;
  background-color: ${COLORS.background.white};
  border-radius: ${scale(10)}px;
  shadow-color: ${COLORS.background.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  border-width: ${scale(1)}px;
  border-color: ${({active}: {active: boolean}) =>
    active ? COLORS.primary : 'rgba(0, 0, 0, 0.0)'};
`;

const QuestionInputContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const QuestionSaveButton = styled.TouchableOpacity<{
  right: number;
}>`
  position: absolute;
  bottom: 6%;
  right: ${({right}: {right: number}) => right}%;
  padding: 0 ${scale(10)}px;
  height: 8%;
  background-color: ${COLORS.primary};
  border-radius: ${scale(20)}px;
  align-items: center;
  justify-content: center;
  margin-top: ${scale(10)}px;
`;

export default ReadQuestions;
