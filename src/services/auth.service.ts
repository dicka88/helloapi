import axios from 'axios';
import { API_HOST } from '../config/env';

export type SigninType = {
  email: string;
  password: string;
}

type AuthResponse = {
  statusCode?: number,
  message?: string,
  token: string,
}

export const signin = async (credential: SigninType): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>(`${API_HOST}/auth/signin`, credential);

  return data;
};

export type SignupType = {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
}

export const signup = async (credential: SignupType): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>(`${API_HOST}/auth/signup`, credential);

  return data;
};
