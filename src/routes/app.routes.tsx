import React, { lazy } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { Loadable } from '../layout/Loadable';
import { StyleSheet } from 'react-native';

// const Home = Loadable(lazy(() => import('../screens/Home')));
const Dashboard = Loadable(lazy(() => import('../screens/Dashboard')));
const Form = Loadable(lazy(() => import('../screens/Form')));

const StackNavigator = createStackNavigator();

type RootStackParamList = {
  dashboard: undefined;
  form: undefined;
};

export type AppScreensProps = StackNavigationProp<
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
