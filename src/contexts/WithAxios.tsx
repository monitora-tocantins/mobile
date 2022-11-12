import { useMemo } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../hooks/useAuth';
import { showMessage } from 'react-native-flash-message';

export const WithAxios = ({ children }: any) => {
  const { logout } = useAuth();

  useMemo(() => {
    api.interceptors.request.use(
      config => {
        AsyncStorage.getItem('@monitora_tocantins:access_token').then(res => {
          if (typeof res === 'string') {
            if (res) {
              if (config.headers) {
                config.headers.Authorization = `Bearer ${JSON.parse(res)}`;
                config.headers.authorization = `Bearer ${JSON.parse(res)}`;
              }
            }
          }
        });
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
    api.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status === 423 || error.response.status === 401) {
          if (
            error.response.data?.error.code === 'auth/user-not_authorized' ||
            error.response.data?.error.code === 'auth/user-disabled'
          ) {
            showMessage({
              message: 'Sessão',
              description: error.response.data.error.message,
              type: 'danger',
              animated: true,
              position: 'top',
              floating: true,
            });
            return logout();
          }
        }
        return Promise.reject(error);
      },
    );
  }, [logout]);

  return children;
};
