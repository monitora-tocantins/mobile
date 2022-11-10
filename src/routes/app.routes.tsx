import React, { lazy } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import { Loadable } from '../layout/Loadable';
import { StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = Loadable(lazy(() => import('../screens/Home')));
const Profile = Loadable(lazy(() => import('../screens/Profile')));
const Dashboard = Loadable(lazy(() => import('../screens/Dashboard')));
const Form = Loadable(lazy(() => import('../screens/Form')));

const PersonalData = Loadable(
  lazy(() => import('../screens/Profile/component/PersonalData')),
);

const StackNavigator = createStackNavigator();

type RootStackParamList = {
  dashboard: undefined;
  form: undefined;
  profile: undefined;
  personalData: undefined;
};

export type AppScreensProps = StackNavigationProp<RootStackParamList>;

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
        name="profile"
        component={Profile}
        options={{
          headerTitle: 'Perfil',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLeft: ({ ...props }) => (
            <MaterialIcons
              {...props}
              name="close"
              size={32}
              color={colors.onPrimaryContainer}
              style={styles.icon}
            />
          ),
        }}
      />
      <StackNavigator.Screen
        name="personalData"
        component={PersonalData}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: 'Dados pessoais',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
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
          headerLeft: ({ ...props }) => (
            <MaterialIcons
              {...props}
              color={colors.onPrimaryContainer}
              name="close"
              size={24}
              style={styles.icon}
            />
          ),
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default AppRoutes;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 16,
  },
});
