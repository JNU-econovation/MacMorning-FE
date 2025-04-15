import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';

const CreateBookTitle = (props: {
  titleText: string;
  subtitleText: string;
}): React.JSX.Element => {
  return (
    <CreateBookTitleContainer>
      <ImageWrapper>
        <Image
          source={require('@/assets/images/ingq/jump-ingq.gif')}
          style={{width: '100%', height: '100%'}}
        />
      </ImageWrapper>
      <SpeechBubble>
        <CustomText style={{fontSize: scale(9)}} font="NPSfont_bold">
          {props.titleText}
        </CustomText>
        <CustomText
          style={{
            fontSize: scale(7),
            color: COLORS.primary,
            paddingLeft: scale(1),
          }}
          font="NPSfont_regular">
          {props.subtitleText}
        </CustomText>
        <SpeechBubbleTail />
      </SpeechBubble>
    </CreateBookTitleContainer>
  );
};
export default CreateBookTitle;

const CreateBookTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 24%;
  gap: ${scale(5)}px;
  padding: ${scale(20)}px ${scale(30)}px ${scale(15)}px ${scale(30)}px;
`;

const ImageWrapper = styled.View`
  height: 80%;
  aspect-ratio: 1;
  margin-right: ${scale(10)}px;
`;

const SpeechBubble = styled.View`
  position: relative;
  justify-content: center;
  background-color: ${COLORS.background.white};
  border-radius: ${scale(20)}px;
  padding: ${scale(8)}px ${scale(20)}px;
  gap: ${scale(1)}px;
  shadow-color: #000;
  shadow-offset: 0px ${scale(2)}px;
  shadow-opacity: 0.1;
  shadow-radius: ${scale(3)}px;
  elevation: 5;
`;

const SpeechBubbleTail = styled.View`
  position: absolute;
  left: -${scale(7)}px;
  top: ${scale(15)}px;
  height: ${scale(6)}px;
  border-top-width: ${scale(5)}px;
  border-bottom-width: ${scale(5)}px;
  border-right-width: ${scale(10)}px;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-right-color: ${COLORS.background.white};
`;
