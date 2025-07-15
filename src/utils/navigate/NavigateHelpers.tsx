import {NavigationProp} from '@react-navigation/native';
import {FormData} from '@/types/form';

export const createNavigationHelpers = (
  navigation: NavigationProp<RootStackParamList>,
) => ({
  goToStoryProgress: (props: {
    bookId: number;
    formData: FormData;
    lastPage?: number;
  }) => navigation.navigate('StoryProgress', {props}),
  goToCreatedBookProgress: (props: {bookId: number; lastPage: number}) =>
    navigation.navigate('StoryProgress', {props}),
});
