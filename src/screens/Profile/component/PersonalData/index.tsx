import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import UserPerfil from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../../../hooks/useAuth';
import { FocusAwareStatusBar } from '../../../../components/FocusAwareStatusBar';
import Select from '../../../../components/Select';

const PersonalData: React.FC = ({}) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [name, setName] = useState(user.name);
  // const [cpf, setCpf] = useState(user.cpf);
  const [email, setEmail] = useState(user?.email);
  const [gender, setGender] = useState(user.gender);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  // const [cpfError, setCpfError] = useState('');
  // const [genderError, setGenderError] = useState('');

  async function handleSave() {
    try {
      console.log('Salvando dados!!');
    } catch (error) {
      console.log('Erro ao salvar os dados', error);
    }
  }

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
        <ScrollView>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.formWrapper}>
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
              {/*<View style={styles.wrapperImput}>
                 <TextInput
                  label="CPF"
                  disabled
                  keyboardType="numeric"
                  mode="outlined"
                  value={cpf}
                  error={!!cpfError}
                  onChangeText={text => {
                    setCpf(text);
                    setCpfError('');
                  }}
                />
</View>
*/}
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
        <View style={styles.buttons}>
          <Button
            onPress={() => handleSave()}
            disabled={false}
            contentStyle={styles.button}
            loading={false}
            mode="contained">
            Salvar alterações
          </Button>
        </View>
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
});

export default PersonalData;
