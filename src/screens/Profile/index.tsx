import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentToDP } from '../../libs';
import {
  Avatar,
  Button,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppScreensProps } from '../../routes/app.routes';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { stringToColor } from '../../utils/mask';
import Share from 'react-native-share';

const About: React.FC = () => {
  const navigation = useNavigation<AppScreensProps>();
  const theme = useTheme();
  const { user, logout, loading, getUserData } = useAuth();
  const onShare = async () => {
    try {
      const result = await Share.open({
        title: 'Monitora Tocantins',
        urls: ['https://monitoratocantins-front.herokuapp.com/app/download'],
        message:
          'O aplicativo monitora tocantins é um app desenvolvido pelo LASEDi',
        url: 'https://monitoratocantins-front.herokuapp.com/app/download',
      });
      if (result.success) {
        console.log('Message', result.message);
      }
    } catch (error: any) {
      console.log('Message', error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [getUserData]);

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
              <Avatar.Text
                size={46}
                label={`${
                  user.name
                    .replace(/\s(de|da|dos|das)\s/g, ' ')
                    .split(' ')[0][0]
                }`}
                style={{
                  backgroundColor: stringToColor(user.name),
                }}
              />
              <View style={styles.wrapperName}>
                <Text variant="titleLarge" style={styles.name}>
                  {user.name}
                </Text>
                {user.email && (
                  <Text
                    variant="titleMedium"
                    style={[{ color: theme.colors.secondary }]}>
                    {user.email}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.formWrapper}>
          <View>
            <View style={styles.wrapperCard}>
              <Text variant="titleLarge" style={styles.titleCard}>
                Conta
              </Text>
              <TouchableRipple
                style={styles.wrapperButto}
                onPress={() => {
                  navigation.navigate('personalData');
                }}>
                <>
                  <MaterialIcons
                    name="person-outline"
                    color={theme.colors.onPrimaryContainer}
                    size={heightPercentToDP('3%')}
                  />
                  <Text style={styles.titleButto}>Dados pessoais</Text>
                </>
              </TouchableRipple>
              <TouchableRipple
                style={styles.wrapperButto}
                onPress={() => {
                  navigation.navigate('adressData');
                }}>
                <>
                  <Feather
                    name="map-pin"
                    color={theme.colors.onPrimaryContainer}
                    size={heightPercentToDP('3%')}
                  />

                  <Text style={styles.titleButto}>Endereço</Text>
                </>
              </TouchableRipple>
            </View>
            <View style={styles.wrapperCard}>
              <Text variant="titleLarge" style={styles.titleCard}>
                Geral
              </Text>
              <TouchableRipple
                style={styles.wrapperButto}
                onPress={() => {
                  navigation.navigate('personalData');
                }}>
                <>
                  <MaterialIcons
                    name="help-outline"
                    color={theme.colors.onPrimaryContainer}
                    size={heightPercentToDP('3%')}
                  />
                  <Text style={styles.titleButto}>Suporte</Text>
                </>
              </TouchableRipple>
              <TouchableRipple
                style={styles.wrapperButto}
                onPress={() => {
                  navigation.navigate('personalData');
                }}>
                <>
                  <MaterialCommunityIcons
                    color={theme.colors.onPrimaryContainer}
                    name="clipboard-text-outline"
                    size={heightPercentToDP('3%')}
                  />
                  <Text style={styles.titleButto}>Sobre</Text>
                </>
              </TouchableRipple>
              <TouchableRipple
                style={styles.wrapperButto}
                onPress={() => {
                  onShare();
                }}>
                <>
                  <MaterialIcons
                    name="person-add-alt"
                    color={theme.colors.onPrimaryContainer}
                    size={heightPercentToDP('3%')}
                  />
                  <Text style={styles.titleButto}>Convidar amigos</Text>
                </>
              </TouchableRipple>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          onPress={() => logout()}
          disabled={loading}
          contentStyle={styles.button}
          loading={loading}
          mode="contained">
          Sair da conta
        </Button>
      </View>
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
  buttons: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  button: {
    height: 46,
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
    marginLeft: 16,
  },
  name: {
    fontWeight: 'bold',
  },
  wrapperCard: {
    marginTop: '5%',
  },
  wrapperButto: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '6%',
  },
  titleCard: {
    // fontSize: 22,
    fontWeight: 'bold',
  },
  titleButto: {
    fontSize: 17,
    marginLeft: 32,
  },
  version: {
    textAlign: 'center',
  },
  formWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
});

export default About;
