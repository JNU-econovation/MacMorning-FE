import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';
import {Question} from '@/types/form';

const QuestionInput = ({
  question,
  setAnswer,
}: {
  question: Question;
  setAnswer: (id: number, answer: string) => void;
}) => {
  return (
    <QuestionInputContainer>
      <QuestionInputTextWrapper>
        <QuestionInputText font="NPSfont_regular" style={{fontSize: scale(9)}}>
          {question.id + 1}. {question.question}
        </QuestionInputText>
      </QuestionInputTextWrapper>
      <QustionInputBox
        value={question.answer}
        onChangeText={(text: string) => setAnswer(question.id, text)}
        style={{
          textAlignVertical: 'top',
          textAlign: 'left',
        }}
        multiline={true}
        placeholder="질문의 답을 입력해주세요"
      />
    </QuestionInputContainer>
  );
};

const QuestionInputContainer = styled.View`
  justify-content: space-between;
  width: ${scale(220)}px;
  height: ${scale(150)}px;
  padding: ${scale(10)}px;
  background-color: ${COLORS.background.white};
  border-radius: ${scale(10)}px;
  shadow-color: ${COLORS.background.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const QuestionInputText = styled(CustomText)`
  font-size: ${scale(10)}px;
  margin-left: ${scale(5)}px;
  color: ${COLORS.background.black};
`;

const QuestionInputTextWrapper = styled.View`
  justify-content: center;
  height: ${scale(20)}px;
  background-color: ${COLORS.background.white};
`;

const QustionInputBox = styled.TextInput`
  height: ${scale(105)}px;
  font-size: ${scale(8)}px;
  color: ${COLORS.background.black};
  border-width: ${scale(1)}px;
  border-color: ${COLORS.background.lightGray};
  border-radius: ${scale(10)}px;
  padding: ${scale(10)}px;
`;
export default QuestionInput;
