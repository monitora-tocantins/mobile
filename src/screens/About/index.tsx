import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentToDP } from '../../libs';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppScreensProps } from '../../routes/app.routes';
import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';

const About: React.FC = () => {
  const navigation = useNavigation<AppScreensProps>();
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.wrapperLogo}>
            <View style={styles.wrapperPerfil}>
              <Avatar.Text size={66} label="XD" />
              <View style={styles.wrapperName}>
                <Text style={styles.name}>Ilanildo Viana</Text>
                <Text style={[styles.email, { color: theme.colors.secondary }]}>
                  ilannildoviana12@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.wrapperData}>
          <View style={styles.wrapperCard}>
            <Text>Conta</Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('home');
                }}>
                <Text>Dados pessoais</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('home');
                }}>
                <Text>Endereço</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapperCard}>
            <Text>Geral</Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('home');
                }}>
                <Text>Suporte</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('home');
                }}>
                <Text>Sobre</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('home');
                }}>
                <Text>Convidar amigos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
  },
  wrapperLogo: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 30,
    marginBottom: 5,
  },
  wrapperPerfil: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperName: {
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
  },
  wrapperData: {
    paddingHorizontal: 16,
    backgroundColor: '#91b8dd',
  },
  wrapperCard: {
    marginTop: 30,
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
  description: {
    fontSize: 16,
  },
  version: {
    fontSize: 12,
    textAlign: 'center',
  },
  copyright: {
    marginTop: 20,
    marginBottom: 30,
  },
  body: {
    borderBottomWidth: 0.7,
    borderTopWidth: 0.7,
    padding: 10,
    marginBottom: 30,
  },
  buttonBody: {
    padding: 10,
  },
  textBody: {
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  wrapperLogout: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonAvaliation: {
    width: widthPercentToDP('80%'),
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginBottom: 10,
  },
  textButtonAvaliation: {
    fontSize: 16,
  },
});

export default About;
