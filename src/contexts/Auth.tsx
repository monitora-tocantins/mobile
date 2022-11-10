import React, { createContext, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { api } from '../services/api';

interface AuthContextData {
  isAuthenticated: boolean;
  isConnected: boolean | null;
  user: UserDataProps;
  loading: boolean;
  mounted: boolean;
  signIn(
    document: string,
    documentType: 'email' | 'cpf',
    password: string,
  ): Promise<boolean>;
  logout(): Promise<void>;
}

type UserDataProps = {
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
  const [isConnected, setIsConnected] = useState<boolean | null>(false);
  const [user, setUser] = useState<UserDataProps>({} as UserDataProps);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  const loadStorage = async () => {
    // await AsyncStorage.clear();
    const dataStorage = await AsyncStorage.getItem(
      '@monitora_cameta:accessToken',
    );
    const dataStorageUser = await AsyncStorage.getItem('@monitora_cameta:user');
    if (dataStorage && dataStorageUser) {
      setUser(JSON.parse(dataStorageUser));
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
      await AsyncStorage.removeItem('@monitora_cameta:accessToken');
      console.log('Apagar os formulários');
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Encerrar sessão falhou');
    }
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
        await AsyncStorage.setItem(
          '@monitora_cameta:accessToken',
          JSON.stringify(res.data.data.access_token),
        );
        await AsyncStorage.setItem(
          '@monitora_cameta:user',
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
        // console.log("Error auth =>", error.response);
      }
    });
    // setLoading(true);
    // try {
    //   const response = await api.post('/auth/authenticate', {
    //     document,
    //     document_type: documentType,
    //     password,
    //   });
    //   api.defaults.headers.Authorization = `Bearer ${response.data.data.access_token}`;
    //   await AsyncStorage.setItem(
    //     '@monitora_cameta:accessToken',
    //     JSON.stringify(response.data.data.access_token),
    //   );
    //   await AsyncStorage.setItem(
    //     '@monitora_cameta:user',
    //     JSON.stringify(response.data.data.user),
    //   );
    //   setUser(response.data.data.user);
    //   setIsAuthenticated(true);
    //   Toast.show({
    //     type: 'success',
    //     text1: 'Sucesso',
    //     text2: 'Bem vindo ao Monitora Tocantins',
    //     autoHide: true,
    //   });
    //   setLoading(false);
    // } catch (error: any) {
    //   if (error.response) {
    //     console.log(error.response.data);
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Login',
    //       text2: error.response.data.error.message,
    //       autoHide: true,
    //     });
    //   } else {
    //     console.log('Error', error.message);
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Error',
    //       text2: 'Ocorreu um erro ao conectar com o servidor',
    //       autoHide: true,
    //     });
    //   }
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    loadStorage();

    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
