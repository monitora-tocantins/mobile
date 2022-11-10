import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './contexts/Auth';
import { theme } from './theme';
import { Routes } from './routes';
import FlashMessage from 'react-native-flash-message';

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <Routes />
          <FlashMessage position="top" />
        </PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};
