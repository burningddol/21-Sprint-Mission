import {
  AccessToken,
  LoginData,
  SignUpData,
  Tokens,
  User,
  UserLogin,
} from '@/types/auth';
import axios from './axiosInstance';

export async function postSignUpData(signUpData: SignUpData): Promise<void> {
  await axios.post('/auth/signUp', signUpData);
}

export async function postLoginData(LoginData: LoginData): Promise<UserLogin> {
  const res = await axios.post('/auth/signIn', LoginData);
  const data = res.data;

  return data;
}

export async function getUserData(): Promise<User | any> {
  const res = await axios.get('/users/me');
  const data = res.data;

  return data;
}

export async function getRefreshToken(
  refreshToken: string | null
): Promise<AccessToken | null> {
  if (!refreshToken) return null;
  const res = await axios.post('/auth/refresh-token', {
    refreshToken,
  });
  const data = res.data;

  return data;
}
