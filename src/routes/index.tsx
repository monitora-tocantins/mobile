import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { useAuth } from '../hooks/useAuth';
import AuthRoutes from './auth.routes';
import Loader from '../layout/Loader';
import AppRoutes from './app.routes';

export const Routes: React.FC = () => {
  const { isAuthenticated, mounted } = useAuth();

  useEffect(() => {
    if (!mounted) {
      RNBootSplash.hide();
    }
  }, [mounted]);

  if (mounted) {
    return <Loader />;
  } else {
    return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
  }
};
