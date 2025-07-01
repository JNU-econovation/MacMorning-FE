import React from 'react';
import {View, Text} from 'react-native';
import ImageButton from '@/components/storyProgress/ImageButton';

function Library(): React.JSX.Element {
  return (
    <View>
      <ImageButton text="이미지 업로드" onPress={() => {}} />
      <Text>Library</Text>
    </View>
  );
}

export default Library;
