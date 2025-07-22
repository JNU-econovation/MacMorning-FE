import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import QuestionInput from '@/components/question/QeustionInput';
import {Text} from 'react-native';
import CustomText from '@/utils/CustomText';
import {COLORS} from '@/constants/colors';
import {getQuestions} from '@/apis/questions/getQuestions';
import {RouteProp, useRoute} from '@react-navigation/native';
import Loading from '@/components/common/loading/Loading';
import Header from '@/components/common/header/Header';
import QuestionsTitle from './QuestionsTitle';

interface Question {
  id: number;
  question: string;
  answer: string;
}

const Questions = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Questions'>>();
  const {bookId} = route.params.props;
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 0,
      question: '질문의 제목이 보여집니다.',
      answer: '답변이 보여집니다.',
    },
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const setAnswer = (id: number, answer: string) => {
    setQuestions(prev =>
      prev.map(question =>
        question.id === id ? {...question, answer} : question,
      ),
    );
  };

  const saveQuestions = async () => {
    console.log('questions', questions);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const response = await getQuestions(bookId);
      console.log('response', response);
      setQuestions(
        response.data.choices
          .filter((choice: any) => choice.my_choice !== 3)
          .map((choice: any, index: number) => ({
            id: index,
            question: choice.choice_content,
            answer: '',
          })),
      );
      console.log('questions', questions);
      console.log('response', response);
      setIsLoading(false);
    };
    fetchQuestions();
  }, []);
  return (
    <QuestionContainer>
      <Header title="질문" headerType="questions" />
      <QuestionsTitle
        titleText={'선택지를 고른 이유를 작성해주세요!'}
        subtitleText={'모든 질문에 답변하지 않아도 괜찮아요.'}
      />
      <QuestionPageContainer>
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
                setAnswer={setAnswer}
              />
            ) : null,
          )}
        </QuestionInputContainer>
      </QuestionPageContainer>
      <QuestionSaveButton>
        <CustomText
          font="NPSfont_bold"
          style={{color: COLORS.text.white, fontSize: scale(8)}}>
          저장하기
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

const QuestionSaveButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 6%;
  right: 3%;
  width: 15%;
  height: 8%;
  background-color: ${COLORS.primary};
  border-radius: ${scale(20)}px;
  align-items: center;
  justify-content: center;
  margin-top: ${scale(10)}px;
`;

export default Questions;
