import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';

// ==============================|| LOADER ||============================== //
const Loader = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.loader,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <ProgressBar indeterminate />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1301,
    height: '100%',
    width: '100%',
  },
});
