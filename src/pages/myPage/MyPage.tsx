import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useAuthStore} from '@/store/authStore';

function Mypage(): React.JSX.Element {
  const {setAuth} = useAuthStore();
  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    setAuth('', '');
  };

  return (
    <View>
      <Text>Mypage</Text>
      <LogoutButton onPress={logout}>
        <Text>Logout</Text>
      </LogoutButton>
    </View>
  );
}

const LogoutButton = styled.TouchableOpacity`
  background-color: red;
  padding: 10px;
  border-radius: 5px;
`;

export default Mypage;
