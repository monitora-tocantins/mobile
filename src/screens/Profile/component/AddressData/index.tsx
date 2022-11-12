import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
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
import { showMessage } from 'react-native-flash-message';
import { stringToColor } from '../../../../utils/mask';

const AddressData: React.FC = ({}) => {
  const theme = useTheme();
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [user, setUser] = useState<UserDataProps | null>();
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [county, setCounty] = useState('');
  const [number, setNumber] = useState('');
  const [zone, setZone] = useState('Urbana');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [cpfError, setCpfError] = useState('');

  async function handleSave() {
    try {
      setIsUpdatingUser(true);
      const res = await api.put('/users/address', {
        uid: user?.id,
        city,
        street,
        number,
        district,
        county,
        zone,
      });
      setUser(res.data.data);
      setCity(res.data.data.addresses.city);
      setStreet(res.data.data.addresses.street);
      setDistrict(res.data.data.addresses.district);
      setCounty(res.data.data.addresses.county);
      setNumber(res.data.data.addresses.number);
      setZone(res.data.data.addresses.zone);
      setIsUpdatingUser(false);
      showMessage({
        message: 'Sucesso',
        description: 'Endereço atualizado',
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
      setUser(res.data.data);
      if (res.data.data.addresses) {
        setCity(res.data.data.addresses.city);
        setStreet(res.data.data.addresses.street);
        setDistrict(res.data.data.addresses.district);
        setCounty(res.data.data.addresses.county);
        setNumber(res.data.data.addresses.number);
        setZone(res.data.data.addresses.zone);
      }
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
              Carregando seus dados... Aguarde!
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
                    label="Rua/Avenida"
                    keyboardType="name-phone-pad"
                    mode="outlined"
                    autoCapitalize="sentences"
                    value={street}
                    error={!!nameError}
                    onChangeText={text => {
                      setStreet(text);
                      setNameError('');
                    }}
                  />
                </View>
                <View style={styles.wrapperImput}>
                  <TextInput
                    label="Número"
                    keyboardType="numeric"
                    mode="outlined"
                    value={number}
                    error={!!cpfError}
                    onChangeText={text => {
                      setNumber(text);
                      setCpfError('');
                    }}
                  />
                </View>

                <View style={styles.wrapperImput}>
                  <TextInput
                    label="Bairro"
                    mode="outlined"
                    autoCapitalize="words"
                    value={district}
                    error={!!emailError}
                    onChangeText={text => {
                      setDistrict(text);
                      setEmailError('');
                    }}
                  />
                </View>

                <View style={styles.wrapperImput}>
                  <TextInput
                    label="Distrito/Localidade"
                    mode="outlined"
                    autoCapitalize="sentences"
                    value={county}
                    error={!!emailError}
                    onChangeText={text => {
                      setCounty(text);
                      setEmailError('');
                    }}
                  />
                </View>

                <View style={styles.wrapperImput}>
                  <TextInput
                    label="Cidade"
                    autoCapitalize="sentences"
                    mode="outlined"
                    value={city}
                    error={!!emailError}
                    onChangeText={text => {
                      setCity(text);
                      setEmailError('');
                    }}
                  />
                </View>

                <View style={styles.wrapperImput}>
                  <Select
                    theme={theme}
                    label="Zona"
                    mode="outlined"
                    onSelect={value => setZone(value)}
                    value={zone}
                    items={[
                      {
                        id: '0',
                        label: 'Urbana',
                        value: 'Urbana',
                      },
                      {
                        id: '1',
                        label: 'Rural',
                        value: 'Rural',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  email: {
    fontSize: 18,
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
  loaderTitle: {
    textAlign: 'center',
    marginTop: 8,
  },
});

export default AddressData;
