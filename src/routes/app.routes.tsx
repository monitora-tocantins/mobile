import React, { lazy } from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Loadable } from '../layout/Loadable';
import { useTheme } from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = Loadable(lazy(() => import('../screens/Home')));
const About = Loadable(lazy(() => import('../screens/Profile')));
const Dashboard = Loadable(lazy(() => import('../screens/Dashboard')));

const StackNavigator = createNativeStackNavigator();
type RootStackParamList = {
  about: undefined;
};
export type AppScreensProps = NativeStackNavigationProp<
  RootStackParamList,
  'about'
>;

const AppRoutes: React.FC = () => {
  const { colors } = useTheme();

  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigator.Screen
        name="about"
        component={About}
        options={{
          headerTitle: 'Perfil',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLeft: ({ ...props }) => (
            <MaterialIcons
              name="close"
              {...props}
              size={32}
              color={'#000000'}
              style={{ marginLeft: 24 }}
            />
          ),
        }}
      />
      <StackNavigator.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Censo 2022',
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default AppRoutes;
