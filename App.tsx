import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {KeyboardAvoidingView, Platform, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-reanimated';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CreateBook from './src/pages/createBook/CreateBook';
import BottomTabNavigator from './src/utils/navigate/BottomTabNavigator';
import Signin from '@/pages/auth/signin/Signin';
import Login from '@/pages/auth/login/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '@/hooks/useAuth';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  useEffect(() => {
    if (AsyncStorage.getItem('accessToken') === null) {
      AsyncStorage.setItem('accessToken', 'null');
      AsyncStorage.setItem('refreshToken', 'null');
    }
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
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
