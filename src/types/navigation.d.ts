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
    CreateBook:
      | {
          preFilledData?: FormData;
        }
      | undefined;
    ChooseThumbnail: {
      props: {
        bookId: number;
      };
    };
    ShareBook: {
      props: {
        bookId: number;
        is_bookmarked: boolean;
      };
    };
    StoryProgress: {
      props: {
        bookId: number;
        lastPage: number;
        formData?: FormData | undefined;
        nextStory?: Story | undefined;
        createStatus?: string | undefined;
      };
    };
    ReadBook: {
      props: {
        book_id: number;
        page_number: number;
      };
    };
    Questions: {
      props: {
        bookId: number;
      };
    };
    ReadQuestions: {
      props: {
        bookId: number;
      };
    };
    ChooseThumbnail: {
      props: {
        bookId: number;
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
