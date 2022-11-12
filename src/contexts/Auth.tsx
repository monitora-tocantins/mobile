import React, { createContext, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { api } from '../services/api';

interface AuthContextData {
  isAuthenticated: boolean;
  isConnected: boolean | null;
  isFetchingUser: boolean;
  user: UserDataProps;
  loading: boolean;
  mounted: boolean;
  signIn(
    document: string,
    documentType: 'email' | 'cpf',
    password: string,
  ): Promise<boolean>;
  logout(): Promise<void>;
  getUserData(): Promise<boolean>;
}

export type UserDataProps = {
  id: string;
  name: string;
  email: string;
  gender: string;
  birth_date: string;
  cpf: string;
  type: number;
  email_verified_at?: Date;
  status: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(false);
  const [user, setUser] = useState<UserDataProps>({} as UserDataProps);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  const loadStorage = async () => {
    // await AsyncStorage.clear();
    const dataStorage = await AsyncStorage.getItem(
      '@monitora_tocantins:access_token',
    );
    const dataStorageUser = await AsyncStorage.getItem(
      '@monitora_tocantins:user',
    );
    if (dataStorage && dataStorageUser) {
      setUser(JSON.parse(dataStorageUser));
      api.defaults.headers.common.Authorization = `Bearer ${JSON.parse(
        dataStorage,
      )}`;
      setIsAuthenticated(true);
      setMounted(false);
      setLoading(false);
    } else {
      setMounted(false);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@monitora_tocantins:access_token');
      console.log('Apagar os formulários');
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Encerrar sessão falhou');
    }
  };

  const getUserData = async () => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        setIsFetchingUser(true);
        const res = await api.get('@me');
        await AsyncStorage.setItem(
          '@monitora_tocantins:user',
          JSON.stringify(res.data.data),
        );
        setUser(res.data.data);
        setIsFetchingUser(false);
        resolve(true);
      } catch (error: any) {
        setIsFetchingUser(false);
        console.log('Error =>', error);
        if (error.response) {
          reject(error.response.data.error.message);
        } else {
          reject('Erro ao buscar os dados do usuário');
        }
      }
    });
  };

  const signIn = async (
    document: string,
    documentType: 'email' | 'cpf',
    password: string,
  ) => {
    return new Promise<boolean>(async (resolve, reject) => {
      setLoading(true);
      try {
        const res = await api.post('/auth/authenticate', {
          document_type: documentType,
          document,
          password,
        });
        api.defaults.headers.common.Authorization = `Bearer ${res.data.data.access_token}`;
        await AsyncStorage.setItem(
          '@monitora_tocantins:access_token',
          JSON.stringify(res.data.data.access_token),
        );
        await AsyncStorage.setItem(
          '@monitora_tocantins:user',
          JSON.stringify(res.data.data.user),
        );
        setUser(res.data.data.user);
        setIsAuthenticated(true);
        setLoading(false);
        resolve(true);
      } catch (error: any) {
        setLoading(false);
        if (error.response) {
          reject(error.response.data.error.message);
        } else {
          reject('Verifique suas credenciais e tente novamente!');
        }
      }
    });
  };

  useEffect(() => {
    loadStorage();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        mounted,
        signIn,
        isConnected,
        logout,
        getUserData,
        isFetchingUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
