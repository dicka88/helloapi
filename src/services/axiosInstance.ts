import axios, { AxiosRequestConfig } from 'axios';
import { API_HOST } from '../config/env';

const instance = axios.create({
  baseURL: API_HOST,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem('token');

    if (token && config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

export default instance;
