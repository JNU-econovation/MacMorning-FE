import React from 'react';
import ArrowLeftSVG from '@/assets/images/arrow-left.svg';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

const BackButton = (): React.JSX.Element => {
  return (
    <BackbuttonContainer>
      <ArrowLeftSVG color="#fff" width={scale(15)} height={scale(15)} />
    </BackbuttonContainer>
  );
};
const BackbuttonContainer = styled.TouchableOpacity`
  position: absolute;
  left: ${scale(10)}px;
  width: ${scale(30)}px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export default BackButton;
