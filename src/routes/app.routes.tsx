import React, { lazy } from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Loadable } from '../layout/Loadable';
import { useTheme } from 'react-native-paper';

// const Home = Loadable(lazy(() => import('../screens/Home')));
const Dashboard = Loadable(lazy(() => import('../screens/Dashboard')));
const Form = Loadable(lazy(() => import('../screens/Form')));

const StackNavigator = createNativeStackNavigator();

type RootStackParamList = {
  dashboard: undefined;
  form: undefined;
};

export type AppScreensProps = NativeStackNavigationProp<
  RootStackParamList,
  'dashboard',
  'form'
>;

const AppRoutes: React.FC = () => {
  const { colors } = useTheme();

  return (
    <StackNavigator.Navigator>
      {/* <StackNavigator.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      /> */}
      <StackNavigator.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Dashboard - Censo 2022',
        }}
      />
      <StackNavigator.Screen
        name="form"
        component={Form}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'IoT Imuniza - Censo 2022',
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default AppRoutes;
