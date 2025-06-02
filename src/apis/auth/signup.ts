import axios from 'axios';

interface signupParams {
  email: string;
  password: string;
  nickname: string;
  username: string;
  phone_number: string;
}
const signup = async (params: signupParams) => {
  const baseUrl = 'https://api.ilovejokbal.monster/v1/signup';
  const response = await axios.post(
    `${baseUrl}`,
    {
      email: params.email,
      password: params.password,
      nickname: params.nickname,
      username: params.username,
      phone_number: params.phone_number,
    },
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  console.log(response.data);
  return response.data;
};

export default signup;
