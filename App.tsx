import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-reanimated';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/pages/home/Home';
import BottomBar from './src/components/common/bottomBar/BottomBar';
import CreateBook from './src/pages/createBook/CreateBook';
import Library from './src/pages/library/Library';
import MyBook from './src/pages/myBook/Mybook';
import MyPage from './src/pages/myPage/MyPage';
import BottomTabNavigator from './src/utils/navigate/BottomTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen name="CreateBook" component={CreateBook} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
