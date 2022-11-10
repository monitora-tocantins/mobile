import React, { lazy } from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { Loadable } from '../layout/Loadable';

const Login = Loadable(lazy(() => import('../screens/Login')));
const Register = Loadable(lazy(() => import('../screens/Register')));

type RootStackParamList = {
  login: undefined;
  register: undefined;
};

export type authScreensProp = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;

const StackNavigator = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  const { colors } = useTheme();

  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigator.Screen
        name="register"
        component={Register}
        options={{
          headerShadowVisible: false,
          headerTitle: 'Crie sua conta',
          animation: 'slide_from_right',
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default AuthRoutes;
