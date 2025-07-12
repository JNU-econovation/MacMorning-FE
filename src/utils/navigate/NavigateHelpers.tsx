import {NavigationProp} from '@react-navigation/native';

export const createNavigationHelpers = (
  navigation: NavigationProp<RootStackParamList>,
) => ({
  goToStoryProgress: (props: {bookId: number}) =>
    navigation.navigate('StoryProgress', {props}),
});
