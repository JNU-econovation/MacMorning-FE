import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FormData} from './form';

declare global {
  type RootStackParamList = {
    MainTabs: undefined;
    Home: undefined;
    MyBook: undefined;
    Library: undefined;
    MyPage: undefined;
    Login: undefined;
    Signin: undefined;
    CreateBook: undefined;
    StoryProgress: {
      props: {
        bookId: number;
        lastPage: number;
        formData?: FormData | undefined;
      };
    };
  };

  type RootStackScreenNames = keyof RootStackParamList;

  type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

  type RootStackNavigationProp = RootStackScreenProps<
    keyof RootStackParamList
  >['navigation'];

  type RootStackRouteProp<T extends keyof RootStackParamList> =
    RootStackScreenProps<T>['route'];
}
