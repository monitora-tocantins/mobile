import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import logoImg from '../../assets/logo.png';

const TitleApp: React.FC = () => {
  return (
    <View style={styles.wrapperTitle}>
      <Image source={logoImg} style={styles.logo} resizeMode="contain" />
      <View style={styles.titleArea}>
        <Text style={styles.titleApp}>Monitora </Text>
        <Text style={styles.titleApp2}>Tocantins</Text>
      </View>
    </View>
  );
};

export default TitleApp;

const styles = StyleSheet.create({
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  titleArea: {
    flexDirection: 'row',
  },
  titleApp: {
    fontSize: 18,
  },
  titleApp2: {
    fontSize: 18,
  },
});
