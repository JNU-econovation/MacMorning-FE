import React from 'react';
import SearchSVG from '../../../assets/images/search.svg';
import {scale} from 'react-native-size-matters';

const SearchButton = (): React.JSX.Element => {
  return <SearchSVG color="#fff" width={scale(15)} height={scale(15)} />;
};

export default SearchButton;
