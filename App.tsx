import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuthStore} from '@/store/authStore';
import 'react-native-reanimated';
import React, {useEffect} from 'react';
import {
  NavigationContainer,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import CreateBook from './src/pages/createBook/CreateBook';
import BottomTabNavigator from './src/utils/navigate/BottomTabNavigator';
import Signin from '@/pages/auth/signin/Signin';
import Login from '@/pages/auth/login/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar} from 'react-native';
import StoryProgress from '@/pages/storyProgress/StoryProgress';
import {FormData} from '@/types/form';
import {processColorsInProps} from 'react-native-reanimated/lib/typescript/Colors';
import ShareBook from '@/pages/shareBook/ShareBook';
import ReadBook from '@/pages/readBook/ReadBook';
import ChooseThumbnail from '@/pages/ChooseThumbnail/ChooseThumbnail';
import Questions from '@/pages/questions/Questions';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const {setAuth} = useAuthStore();

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      setAuth(accessToken || '', refreshToken || '');
    };
    getToken();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen name="CreateBook" component={CreateBook} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="StoryProgress" component={StoryProgress} />
          <Stack.Screen name="ShareBook" component={ShareBook} />
          <Stack.Screen name="ReadBook" component={ReadBook} />
          <Stack.Screen name="ChooseThumbnail" component={ChooseThumbnail} />
          <Stack.Screen name="Questions" component={Questions} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
