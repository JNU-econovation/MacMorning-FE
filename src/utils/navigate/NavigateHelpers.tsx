import {NavigationProp} from '@react-navigation/native';
import {FormData} from '@/types/form';

export const createNavigationHelpers = (
  navigation: NavigationProp<RootStackParamList>,
) => ({
  goToStoryProgress: (props: {
    bookId: number;
    lastPage: number;
    formData?: FormData | undefined;
  }) => navigation.navigate('StoryProgress', {props}),

  goToCreatedBookProgress: (props: {bookId: number; lastPage: number}) =>
    navigation.navigate('StoryProgress', {props}),

  goToShareBook: (props: {bookId: number}) =>
    navigation.navigate('ShareBook', {props}),

  goToReadBook: (props: { story_id: number }) =>
    navigation.navigate('ReadBook', { props }),
});
