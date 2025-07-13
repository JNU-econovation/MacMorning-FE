import {NavigationProp} from '@react-navigation/native';

export const createNavigationHelpers = (
  navigation: NavigationProp<RootStackParamList>,
) => ({
  goToStoryProgress: (props: {
    bookId: number;
    AIResponse: {newStory: string};
  }) => navigation.navigate('StoryProgress', {props}),
});
