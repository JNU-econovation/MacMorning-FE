import React from 'react';
import {scale} from 'react-native-size-matters';
import CustomText from '../../utils/CustomText';
import {colors} from '../../constants/colors';
import styled from 'styled-components/native';
import {SvgProps} from 'react-native-svg';
import ChevronRight from '../../assets/images/chevron-right.svg';

interface FontInfo {
  font:
    | 'NPSfont_regular'
    | 'NPSfont_extrabold'
    | 'NPSfont_bold'
    | 'NanumSquareNeo-aLt'
    | 'NanumSquareNeo-bRg'
    | 'NanumSquareNeo-cBd'
    | 'NanumSquareNeo-dEb'
    | 'NanumSquareNeo-eHv';
  fontSize: number;
  fontColor: string;
}

interface TextNavigateButtonProps {
  onPress: () => void;
  text: string;
  fontInfo: FontInfo;
}

function TextNavigateButton({
  onPress,
  text,
  fontInfo,
}: TextNavigateButtonProps): React.JSX.Element {
  return (
    <StoryCreateButton onPress={onPress} activeOpacity={1}>
      <CustomText
        font={fontInfo.font}
        style={{fontSize: fontInfo.fontSize, color: fontInfo.fontColor}}>
        {text}
      </CustomText>
      <ChevronRight
        width={fontInfo.fontSize * 1.2}
        height={fontInfo.fontSize * 1.2}
        strokeWidth={scale(1.2)}
        color={fontInfo.fontColor}
      />
    </StoryCreateButton>
  );
}
const StoryCreateButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export default TextNavigateButton;
