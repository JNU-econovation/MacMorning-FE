import {NavigationProp} from '@react-navigation/native';

export const createNavigationHelpers = (
  navigation: NavigationProp<RootStackParamList>,
) => ({
  goToStoryProgress: () => navigation.navigate('StoryProgress'),
});
