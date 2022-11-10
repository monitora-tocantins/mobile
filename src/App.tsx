import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import { FormStorageProvider } from './contexts/FormStorage';
import FlashMessage from 'react-native-flash-message';
import { WithAxios } from './contexts/WithAxios';
import { AuthProvider } from './contexts/Auth';
import { Routes } from './routes';
import { theme } from './theme';

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <FormStorageProvider>
          <PaperProvider theme={theme}>
            <WithAxios>
              <Routes />
            </WithAxios>
            <FlashMessage position="top" />
          </PaperProvider>
        </FormStorageProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};
