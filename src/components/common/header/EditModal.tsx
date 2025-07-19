import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Animated } from 'react-native';
import styled from 'styled-components/native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import TypeSVG from '@/assets/images/common/type.svg';
import ChevronRightSVG from '@/assets/images/common/chevron-right.svg';

interface EditModalProps {
    visible: boolean;
    onClose: () => void;
    onTextSize?: (size: 'small' | 'medium' | 'large') => void;
    onEndRead?: () => void;
    currentTextSize?: 'small' | 'medium' | 'large';
}

const EditModal = ({ visible, onClose, onTextSize, onEndRead, currentTextSize = 'medium' }: EditModalProps): React.JSX.Element => {
    const [isTextSizeExpanded, setIsTextSizeExpanded] = useState(false);
    const [rotateAnim] = useState(new Animated.Value(0));

    const handleTextSizeToggle = () => {
        const newExpanded = !isTextSizeExpanded;
        setIsTextSizeExpanded(newExpanded);

        Animated.timing(rotateAnim, {
            toValue: newExpanded ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const handleTextSizeSelect = (size: 'small' | 'medium' | 'large') => {
        if (onTextSize) {
            onTextSize(size);
        }
        setIsTextSizeExpanded(false);
        rotateAnim.setValue(0);
        onClose();
    };

    const handleEndRead = () => {
        if (onEndRead) {
            onEndRead();
        }
        onClose();
    };

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <ModalOverlay>
                    <TouchableWithoutFeedback>
                        <ModalContainer>
                            <TextType onPress={handleTextSizeToggle}>
                                <TextTypeContent>
                                    <TypeSVG width={scale(8)} height={scale(8)} />
                                    <ModalText font="NPSfont_bold">글자 크기 조절</ModalText>
                                </TextTypeContent>
                                <AnimatedChevron style={{ transform: [{ rotate: rotation }] }}>
                                    <ChevronRightSVG width={scale(10)} height={scale(10)} />
                                </AnimatedChevron>
                            </TextType>
                            
                            {isTextSizeExpanded && (
                                <TextSizeOptions>
                                    <TextSizeOption 
                                        onPress={() => handleTextSizeSelect('small')}
                                        isSelected={currentTextSize === 'small'}
                                    >
                                        <OptionText 
                                            font="NPSfont_regular" 
                                            style={{fontSize: scale(5)}}
                                            isSelected={currentTextSize === 'small'}
                                        >
                                            작은 글자 크기
                                        </OptionText>
                                    </TextSizeOption>
                                    <TextSizeOption 
                                        onPress={() => handleTextSizeSelect('medium')}
                                        isSelected={currentTextSize === 'medium'}
                                    >
                                        <OptionText 
                                            font="NPSfont_regular" 
                                            style={{fontSize: scale(7)}}
                                            isSelected={currentTextSize === 'medium'}
                                        >
                                            중간 글자 크기
                                        </OptionText>
                                    </TextSizeOption>
                                    <TextSizeOption 
                                        onPress={() => handleTextSizeSelect('large')}
                                        isSelected={currentTextSize === 'large'}
                                    >
                                        <OptionText 
                                            font="NPSfont_regular" 
                                            style={{fontSize: scale(9)}}
                                            isSelected={currentTextSize === 'large'}
                                        >
                                            큰 글자 크기
                                        </OptionText>
                                    </TextSizeOption>
                                </TextSizeOptions>
                            )}
                            
                            <EndRead onPress={handleEndRead}>
                                <ButtonText font="NPSfont_bold">그만 읽기</ButtonText>
                            </EndRead>
                        </ModalContainer>
                    </TouchableWithoutFeedback>
                </ModalOverlay>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const ModalOverlay = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: flex-end;
    padding-top: ${scale(40)}px;
    padding-right: ${scale(10)}px;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
    background-color: ${COLORS.background.white};
    border-radius: ${scale(4)}px;
    shadow-color: #000;
    shadow-offset: 0px ${scale(2)}px;
    shadow-opacity: 0.25;
    shadow-radius: ${scale(4)}px;
    elevation: 5;
    min-width: ${scale(80)}px;
`;

const TextType = styled.TouchableOpacity`
    padding: ${scale(8)}px ${scale(12)}px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;

const TextTypeContent = styled.View`
    flex-direction: row;
    align-items: center;
`;

const AnimatedChevron = styled(Animated.View)`
    justify-content: center;
    align-items: center;
`;

const TextSizeOptions = styled.View`
    background-color: ${COLORS.background.white};
    margin: 0 ${scale(4)}px ${scale(4)}px ${scale(4)}px;
    padding: ${scale(4)}px;
    border-radius: ${scale(4)}px;
    border-width: ${scale(0.5)}px;
    border-color: ${COLORS.background.lightGray};
`;

const TextSizeOption = styled.TouchableOpacity<{ isSelected: boolean }>`
    padding: ${scale(4)}px ${scale(6)}px;
    border-radius: ${scale(4)}px;
    background-color: ${(props: { isSelected: boolean }) => props.isSelected ? COLORS.background.lightGray : 'transparent'};
`;

const OptionText = styled(CustomText)<{ isSelected: boolean }>`
    min-height: ${scale(7)}px;
    color: ${COLORS.text.primary};
    text-align: left;
`;

const EndRead = styled.TouchableOpacity`
    background-color: ${COLORS.background.lightGray};
    padding: ${scale(6)}px ${scale(8)}px;
    border-radius: ${scale(4)}px;
    margin: ${scale(4)}px;
    align-items: center;
`;

const ModalText = styled(CustomText)`
    font-size: ${scale(7)}px;
    color: ${COLORS.text.primary};
    margin-left: ${scale(3)}px;
    margin-right: ${scale(8)}px;
`;

const ButtonText = styled(CustomText)`
    font-size: ${scale(8)}px;
    color: ${COLORS.text.primary};
`;
export default EditModal;