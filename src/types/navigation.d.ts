import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  type RootStackParamList = {
    MainTabs: undefined;
    Home: undefined;
    MyBook: undefined;
    Library: undefined;
    MyPage: undefined;
    CreateBook: undefined;
    MainTabs: undefined;
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
