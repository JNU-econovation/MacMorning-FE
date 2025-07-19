import React, { useState, useRef } from 'react';
import MenuWhiteSVG from '@/assets/images/common/menu.svg';
import MenuBlackSVG from '@/assets/images/common/menu-black.svg';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { View } from 'react-native';
import EditModal from './EditModal';

interface EditButtonProps {
  color?: 'white' | 'black';
  page?: 'read' | 'other';
  onTextSize?: (size: 'small' | 'medium' | 'large') => void;
  onEndRead?: () => void;
  currentTextSize?: 'small' | 'medium' | 'large';
}

const EditButton = ({ color = 'white', page, onTextSize, onEndRead, currentTextSize }: EditButtonProps): React.JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const buttonRef = useRef<View>(null);
  
  const MenuIcon = color === 'white' ? MenuWhiteSVG : MenuBlackSVG;
  
  const handleButtonPress = () => {
    if (page === 'read') {
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <EditButtonContainer ref={buttonRef} onPress={handleButtonPress}>
        <MenuIcon width={scale(15)} height={scale(15)} />
      </EditButtonContainer>
      
      {page === 'read' && (
        <EditModal
          visible={isModalVisible}
          onClose={closeModal}
          onTextSize={onTextSize}
          onEndRead={onEndRead}
          currentTextSize={currentTextSize}
        />
      )}
    </>
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