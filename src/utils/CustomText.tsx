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
    NPSfont_bold: 'NPS-font-bold',
    NPSfont_extrabold: 'NPS-font-extrabold',
    NPSfont_regular: 'NPS-font-regular',
    'NanumSquareNeo-aLt': 'NanumSquareNeoTTF-aLt',
    'NanumSquareNeo-bRg': 'NanumSquareNeoTTF-bRg',
    'NanumSquareNeo-cBd': 'NanumSquareNeoTTF-cBd',
    'NanumSquareNeo-dEb': 'NanumSquareNeoTTF-dEb',
    'NanumSquareNeo-eHv': 'NanumSquareNeoTTF-eHv',
  };

  const customFont: TextStyle = {
    fontFamily: fontMap[font],
    color: '#000000',
  };

  return <Text style={[style, customFont]} {...rest} />;
};

export default CustomText;
