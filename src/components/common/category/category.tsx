import CustomText from '@/utils/CustomText';
import {COLORS} from '@/constants/colors';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
const Category = ({
  categoryList,
}: {
  categoryList: string[];
}): React.JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryList[0],
  );

  return (
    <CategoryContainer>
      {categoryList.map(item => (
        <CategoryItem
          selectedCategory={selectedCategory === item}
          onPress={() => {
            setSelectedCategory(item);
          }}
          activeOpacity={1}>
          <CustomText
            font="NPSfont_regular"
            style={{
              fontSize: 20,
              color:
                selectedCategory === item
                  ? COLORS.primary
                  : COLORS.text.primary,
            }}>
            {item}
          </CustomText>
        </CategoryItem>
      ))}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${scale(27)}px;
  background-color: ${COLORS.background.white};
  border-bottom-width: ${scale(0.2)}px;
  border-bottom-color: ${COLORS.background.lightGray};
`;

const CategoryItem = styled.TouchableOpacity<{selectedCategory: boolean}>`
  padding: ${scale(5)}px 0px;
  margin: 0 ${scale(20)}px;
  justify-content: center;
  align-items: center;
  border-bottom-width: ${(props: {selectedCategory: boolean}) =>
    props.selectedCategory ? scale(0.8) : 0}px;
  border-bottom-color: ${(props: {selectedCategory: boolean}) =>
    props.selectedCategory ? COLORS.primary : 'transparent'};
`;
export default Category;
