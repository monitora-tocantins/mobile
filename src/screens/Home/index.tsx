import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const Home: React.FC = () => {
  return (
    <>
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Text variant="titleLarge" style={[styles.headerTitle]}>
            Monitora Tocantins - UFPA
          </Text>
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginTop: 48,
    marginBottom: 32,
  },
  headerTitle: {
    fontFamily: 'Raleway-Bold',
    // fontSize: 20,
  },
  headerSubtitle: {
    fontFamily: 'Raleway-Regular',
  },
  form: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  formWrapper: {
    width: '100%',
    marginTop: 48,
    marginBottom: 48,
  },
  inputWrapper: {
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
  },
  button: { height: 46 },
});
