import axios from 'axios';
import {LoginParams} from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const signin = async (params: LoginParams) => {
  console.log(params);
  const baseUrl = 'https://api.ilovejokbal.monster/v1/login';

  try {
    const response = await axios.post(
      `${baseUrl}`,
      `username=${params.email}&password=${params.password}`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log(response.data);

    AsyncStorage.setItem('accessToken', response.headers['authorization']);
    AsyncStorage.setItem('refreshToken', response.headers['refresh']);

    return {
      accessToken: response.headers['authorization'],
      refreshToken: 'null',
    };
  } catch (error: any) {
    console.log(error.response.data);
  }

  return 0;
};

export default signin;
