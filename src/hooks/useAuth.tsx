import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};
