import React from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import CustomText from '../../../utils/CustomText';
const EndingButton = (): React.JSX.Element => {
  return (
    <EndingButtonContainer>
      <CustomText font="NPSfont_regular">엔딩 만들기</CustomText>
    </EndingButtonContainer>
  );
};
const EndingButtonContainer = styled.TouchableOpacity`
  position: absolute;
  right: ${scale(10)}px;
  width: ${scale(40)}px;
  height: ${scale(20)}px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: ${scale(15)}px;
`;
export default EndingButton;
