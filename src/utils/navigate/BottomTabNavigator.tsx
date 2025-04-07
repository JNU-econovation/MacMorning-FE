import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/pages/home/Home';
import Library from '@/pages/library/Library';
import MyBook from '@/pages/myBook/Mybook';
import MyPage from '@/pages/myPage/MyPage';
import BottomBar from '@/components/common/bottomBar/BottomBar';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Library" component={Library} />
      <Tab.Screen name="MyBook" component={MyBook} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
