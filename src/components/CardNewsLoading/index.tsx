import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import Shimmer from 'react-native-shimmer';

export const CardNewsLoading: React.FC = () => {
  const theme = useTheme();
  return (
    <Card style={styles.container}>
      <Shimmer
        style={[
          styles.cover,
          { backgroundColor: theme.colors.elevation.level1 },
        ]}
      />
      <Shimmer
        style={[
          styles.title,
          { backgroundColor: theme.colors.elevation.level1 },
        ]}
      />
      <Shimmer
        style={[
          styles.subtitle,
          { backgroundColor: theme.colors.elevation.level1 },
        ]}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  cover: {
    height: 175,
    width: '100%',
  },
  title: {
    height: 24,
    width: '50%',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  subtitle: {
    height: 50,
    marginHorizontal: 16,
    marginVertical: 8,
  },
});
