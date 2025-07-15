import React from 'react';
import MenuSVG from '@/assets/images/common/menu.svg';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

const EditButton = (): React.JSX.Element => {
    return (
        <EditButtonContainer>
          <MenuSVG color="#fff" width={scale(15)} height={scale(15)} />
        </EditButtonContainer>
      );
};
const EditButtonContainer = styled.TouchableOpacity`
  position: absolute;
  right: ${scale(10)}px;
  width: ${scale(40)}px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export default EditButton;
