import axios from 'axios';
import {LoginParams} from '@/types/auth';
import {useAuth} from '@/hooks/useAuth';

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

    console.log(response);

    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
  }
  //   const {setLogin} = useAuth();

  //   console.log(response.headers);
  //   console.log(response.data);
  //   setLogin(
  //     responseData.user,
  //     response.headers.authorization,
  //     response.headers.refresh_token,
  //   );

  return 0;
};

export default signin;
