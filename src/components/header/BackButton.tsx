import React from 'react';
import ArrowLeftSVG from '../../assets/images/arrow-left.svg';
import {scale} from 'react-native-size-matters';
const BackButton = (): React.JSX.Element => {
  return <ArrowLeftSVG color="#fff" width={scale(15)} height={scale(15)} />;
};

export default BackButton;
