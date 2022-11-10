import { useMemo } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../hooks/useAuth';

export const WithAxios = ({ children }: any) => {
  const { logout } = useAuth();

  useMemo(() => {
    api.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      },
    );
    api.interceptors.request.use(
      config => {
        AsyncStorage.getItem('@monitora_cameta:access_token').then(res => {
          if (typeof res === 'string') {
            if (res) {
              if (config.headers) {
                config.headers.Authorization = `Bearer ${JSON.parse(res)}`;
              }
            }
          }
        });
        return config;
      },
      error => {
        console.log('Erro request', error);
        return Promise.reject(error);
      },
    );
  }, [logout]);

  return children;
};
