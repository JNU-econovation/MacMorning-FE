export interface AuthState {
  user: userInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignupParams {
  email: string;
  password: string;
  nickname: string;
  username: string;
  phone_number: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface SignupResponse {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  username: string;
  phone_number: string;
}
