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
  disabled,
}: {
  question: Question;
  setAnswer: (id: number, answer: string) => void;
  disabled?: boolean;
}) => {
  return (
    <QuestionInputContainer>
      <QuestionInputTextWrapper>
        <QuestionInputText
          font="NPSfont_regular"
          style={{fontSize: scale(9), width: '100%'}}>
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
        editable={!disabled}
      />
    </QuestionInputContainer>
  );
};

const QuestionInputContainer = styled.View`
  justify-content: space-between;
  width: ${scale(220)}px;
  padding: ${scale(10)}px;
  background-color: ${COLORS.background.white};
  border-radius: ${scale(10)}px;
  shadow-color: ${COLORS.background.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  gap: ${scale(10)}px;
`;

const QuestionInputText = styled(CustomText)`
  font-size: ${scale(10)}px;
  color: ${COLORS.background.black};
`;

const QuestionInputTextWrapper = styled.View`
  justify-content: center;
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
