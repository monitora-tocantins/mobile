import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentToDP, widthPercentToDP } from '../../libs';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppScreensProps } from '../../routes/app.routes';
import UserPerfil from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserAdd from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../hooks/useAuth';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';

const About: React.FC = () => {
  const navigation = useNavigation<AppScreensProps>();
  const theme = useTheme();
  const { user } = useAuth();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.background}
        />
        <View style={styles.header}>
          <View style={styles.wrapperLogo}>
            <View style={styles.wrapperPerfil}>
              <UserPerfil
                color={theme.colors.onPrimaryContainer}
                name="user-circle"
                size={56}
              />
              <View style={styles.wrapperName}>
                <Text style={styles.name}>{user.name}</Text>
                {user.email && (
                  <Text
                    style={[styles.email, { color: theme.colors.secondary }]}>
                    {user.email}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.wrapperData}>
          <View style={styles.wrapperCard}>
            <Text style={styles.titleCard}>Conta</Text>
            <View style={styles.wrapperButto}>
              <Ionicons
                name="person-outline"
                color={theme.colors.onPrimaryContainer}
                size={heightPercentToDP('4%')}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('personalData');
                }}>
                <Text style={styles.titleButto}>Dados pessoais</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapperButto}>
              <Feather
                name="map-pin"
                color={theme.colors.onPrimaryContainer}
                size={heightPercentToDP('4%')}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('adressData');
                }}>
                <Text style={styles.titleButto}>Endereço</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapperCard}>
            <Text style={styles.titleCard}>Geral</Text>
            <View style={styles.wrapperButto}>
              <MaterialIcons
                name="contact-support"
                color={theme.colors.onPrimaryContainer}
                size={heightPercentToDP('4%')}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('home');
                }}>
                <Text style={styles.titleButto}>Suporte</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapperButto}>
              <MaterialCommunityIcons
                color={theme.colors.onPrimaryContainer}
                name="clipboard-text-outline"
                size={heightPercentToDP('4%')}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('home');
                }}>
                <Text style={styles.titleButto}>Sobre</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapperButto}>
              <UserAdd
                name="person-add-outline"
                color={theme.colors.onPrimaryContainer}
                size={heightPercentToDP('4%')}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('home');
                }}>
                <Text style={styles.titleButto}>Convidar amigos</Text>
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
    paddingHorizontal: 24,
    marginTop: '5%',
    marginBottom: '1%',
  },
  wrapperPerfil: {
    width: '100%',
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
    paddingHorizontal: 24,
  },
  wrapperCard: {
    marginTop: '5%',
  },

  wrapperButto: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '6%',
  },
  titleCard: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  titleButto: {
    fontSize: 17,
    marginLeft: 32,
    fontWeight: 'bold',
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
