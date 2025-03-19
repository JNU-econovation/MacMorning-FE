import React from 'react';
import {Text, TextProps, TextStyle} from 'react-native';

interface CustomTextProps extends TextProps {
  font?:
    | 'NPSfont_regular'
    | 'NPSfont_extrabold'
    | 'NPSfont_bold'
    | 'NanumSquareNeo-aLt'
    | 'NanumSquareNeo-bRg'
    | 'NanumSquareNeo-cBd'
    | 'NanumSquareNeo-dEb'
    | 'NanumSquareNeo-eHv';
}

const CustomText: React.FC<CustomTextProps> = ({
  style,
  font = 'NanumSquareNeo-bRg',
  ...rest
}) => {
  const fontMap: Record<NonNullable<CustomTextProps['font']>, string> = {
    NPSfont_bold: 'NPSfont_bold',
    NPSfont_extrabold: 'NPSfont_extrabold',
    NPSfont_regular: 'NPSfont_regular',
    'NanumSquareNeo-aLt': 'NanumSquareNeo-aLt',
    'NanumSquareNeo-bRg': 'NanumSquareNeo-bRg',
    'NanumSquareNeo-cBd': 'NanumSquareNeo-cBd',
    'NanumSquareNeo-dEb': 'NanumSquareNeo-dEb',
    'NanumSquareNeo-eHv': 'NanumSquareNeo-eHv',
  };

  const customFont: TextStyle = {
    fontFamily: fontMap[font],
    color: '#000000',
  };

  return <Text style={[style, customFont]} {...rest} />;
};

export default CustomText;
