import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import {
  Avatar,
  Button,
  ProgressBar,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { FocusAwareStatusBar } from '../../../../components/FocusAwareStatusBar';
import Select from '../../../../components/Select';
import { UserDataProps } from '../../../../contexts/Auth';
import { api } from '../../../../services/api';
import { stringToColor } from '../../../../utils/mask';

const PersonalData: React.FC = ({}) => {
  const theme = useTheme();
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [user, setUser] = useState<UserDataProps | null>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  async function handleSave() {
    try {
      setIsUpdatingUser(true);
      const res = await api.put('/users', {
        uid: user?.id,
        name: name,
        gender: gender,
        email: email,
      });
      console.log('Dados atualizados com sucesso');
      setUser(res.data.data);
      setName(res.data.data.name);
      setEmail(res.data.data.email);
      setGender(res.data.data.gender);
      setIsUpdatingUser(false);
      showMessage({
        message: 'Sucesso',
        description: 'Dados atualizados',
        type: 'success',
        animated: true,
        position: 'top',
        floating: true,
      });
    } catch (error: any) {
      setIsUpdatingUser(false);
      console.log('Error =>', error);
      showMessage({
        message: 'Erro',
        description: error.response.data.error.message,
        type: 'danger',
        animated: true,
        position: 'top',
        floating: true,
      });
    }
  }

  const getUserData = async () => {
    try {
      setIsFetchingUser(true);
      const res = await api.get('@me');
      await AsyncStorage.setItem(
        '@monitora_tocantins:user',
        JSON.stringify(res.data.data),
      );
      setUser(res.data.data);
      setName(res.data.data.name);
      setEmail(res.data.data.email);
      setGender(res.data.data.gender);
      setIsFetchingUser(false);
    } catch (error: any) {
      setIsFetchingUser(false);
      console.log('Error =>', error);
      if (error.response) {
        // error.response.data.error.message
        showMessage({
          message: 'Erro',
          description: error.response.data.error.message,
          type: 'danger',
          animated: true,
          position: 'top',
          floating: true,
        });
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.background}
        />
        {isFetchingUser ? (
          <View style={styles.loader}>
            <ProgressBar indeterminate />
            <Text
              variant="bodyLarge"
              style={[
                styles.loaderTitle,
                { color: theme.colors.onPrimaryContainer },
              ]}>
              Carregando dados
            </Text>
          </View>
        ) : !user ? (
          <View style={styles.loader}>
            <Text
              variant="bodyLarge"
              style={[
                styles.loaderTitle,
                { color: theme.colors.onPrimaryContainer },
              ]}>
              Não foi possível carregar seus dados
            </Text>
          </View>
        ) : (
          <ScrollView>
            <KeyboardAvoidingView behavior="padding">
              <View style={styles.formWrapper}>
                <View style={styles.header}>
                  <View style={styles.wrapperLogo}>
                    <View style={styles.wrapperPerfil}>
                      <Avatar.Text
                        size={46}
                        label={`${
                          user?.name
                            .replace(/\s(de|da|dos|das)\s/g, ' ')
                            .split(' ')[0][0]
                        }`}
                        style={{
                          backgroundColor: stringToColor(user ? user.name : ''),
                        }}
                      />
                      <View style={styles.wrapperName}>
                        <Text variant="titleLarge" style={styles.name}>
                          {user?.name}
                        </Text>
                        {user?.email && (
                          <Text
                            variant="titleMedium"
                            style={[
                              styles.email,
                              { color: theme.colors.secondary },
                            ]}>
                            {user.email}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.wrapperImput}>
                  <TextInput
                    label="Nome"
                    keyboardType="name-phone-pad"
                    mode="outlined"
                    value={name}
                    error={!!nameError}
                    onChangeText={text => {
                      setName(text);
                      setNameError('');
                    }}
                  />
                </View>
                <View style={styles.wrapperImput}>
                  <TextInput
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    mode="outlined"
                    value={email}
                    error={!!emailError}
                    onChangeText={text => {
                      setEmail(text);
                      setEmailError('');
                    }}
                  />
                </View>

                <View style={styles.wrapperImput}>
                  <Select
                    theme={theme}
                    label="Sexo"
                    mode="outlined"
                    placeholder="Selecione seu sexo"
                    onSelect={value => setGender(value)}
                    value={gender}
                    items={[
                      {
                        id: '0',
                        label: 'Masculino',
                        value: 'Masculino',
                      },
                      {
                        id: '1',
                        label: 'Feminino',
                        value: 'Feminino',
                      },
                      {
                        id: '2',
                        label: 'Outro',
                        value: 'Outro',
                      },
                    ]}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        )}
        {!isFetchingUser && (
          <View style={styles.buttons}>
            <Button
              onPress={() => handleSave()}
              disabled={isUpdatingUser}
              contentStyle={styles.button}
              loading={isUpdatingUser}
              mode="contained">
              Salvar alterações
            </Button>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  buttons: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  button: {
    height: 46,
  },
  check: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  textCheck: {
    fontSize: 16,
    marginLeft: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  wrapperLogo: {
    width: '100%',
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
    fontWeight: 'bold',
    color: '#000000',
  },
  email: {},
  loaderTitle: {
    textAlign: 'center',
    marginTop: 8,
  },
  wrapperImput: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  loader: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
});

export default PersonalData;
