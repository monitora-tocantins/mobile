import React, { lazy } from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Loadable } from '../layout/Loadable';
import { useTheme } from 'react-native-paper';

const Home = Loadable(lazy(() => import('../screens/Home')));
const About = Loadable(lazy(() => import('../screens/About')));
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
          headerShown: false,
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
