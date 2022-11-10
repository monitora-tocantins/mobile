import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  useTheme,
  Snackbar,
  HelperText,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import LogoImg from '../../assets/icon.png';
import { maskCpf, validateCpf, validateEmail } from '../../utils/mask';
import Select from '../../components/Select';
import { api } from '../../services/api';
import { authScreensProp } from '../../routes/auth.routes';
import { showMessage } from 'react-native-flash-message';
import { theme } from '../../theme';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();
  const navigation = useNavigation<authScreensProp>();

  const handleSubmit = async () => {
    if (name === '') {
      return setNameError('Este campo é obrigatório');
    }
    if (cpf === '') {
      return setCpfError('Este campo é obrigatório');
    }
    if (!validateCpf(cpf)) {
      return setCpfError('Digite um CPF válido');
    }
    if (email !== '') {
      if (!validateEmail(email)) {
        return setEmailError('Digite um e-mail válido');
      }
    }
    if (password === '') {
      return setPasswordError('Este campo é obrigatório');
    }
    setIsLoading(true);

    try {
      const res = await api.post('/auth/register', {
        name,
        cpf,
        email,
        gender,
        password,
      });
      setIsLoading(false);
      if (res.data.success) {
        showMessage({
          message: 'Sucesso',
          description: 'Cadastrado com sucesso',
          type: 'success',
          animated: true,
          position: 'top',
          floating: true,
        });
        navigation.goBack();
      }
      console.log('Register', res.data);
    } catch (error: any) {
      setIsLoading(false);
      showMessage({
        message: 'Cadastro',
        description: error.response.data.error.message,
        type: 'danger',
        animated: true,
        position: 'top',
        floating: true,
      });
    }
  };

  const onChangePassword = (text: string) => {
    setPasswordError('');
    setPassword(text);
  };

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
        enabled={false}>
        <ScrollView
          style={[
            styles.scroll,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <View
            style={[styles.container, { backgroundColor: colors.background }]}>
            <Image source={LogoImg} style={styles.logo} resizeMode="contain" />
            <View style={styles.header}>
              <Text
                variant="titleLarge"
                style={[
                  styles.headerTitle,
                  { color: colors.onPrimaryContainer },
                ]}>
                Monitora Tocantins - UFPA
              </Text>
              <Text
                variant="titleMedium"
                style={[styles.headerSubtitle, { color: colors.secondary }]}>
                Não se preocupe, cuidaremos muito bem das suas informações.
              </Text>
            </View>
            <View style={styles.form}>
              <View>
                <View style={styles.formWrapper}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      label="Nome completo *"
                      mode="outlined"
                      placeholder="Digite seu nome completo"
                      autoComplete="name"
                      value={name}
                      error={!!nameError}
                      // autoFocus
                      onChangeText={value => {
                        setName(value);
                        setNameError('');
                      }}
                    />
                    <HelperText type="error" visible={!!nameError}>
                      {nameError}
                    </HelperText>
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      label="CPF *"
                      mode="outlined"
                      placeholder="Digite seu CPF"
                      autoComplete="tel"
                      keyboardType="numeric"
                      value={maskCpf(cpf)}
                      error={!!cpfError}
                      // autoFocus
                      onChangeText={value => {
                        setCpf(value.replace(/[^\d]+/g, ''));
                        setCpfError('');
                      }}
                    />
                    <HelperText type="error" visible={!!cpfError}>
                      {cpfError}
                    </HelperText>
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      label="E-mail"
                      mode="outlined"
                      placeholder="Digite seu email"
                      autoComplete="email"
                      keyboardType="email-address"
                      value={email}
                      error={!!emailError}
                      // autoFocus
                      onChangeText={value => {
                        setEmail(value);
                        setEmailError('');
                      }}
                    />
                    <HelperText type="error" visible={!!emailError}>
                      {emailError}
                    </HelperText>
                  </View>
                  <View style={styles.inputWrapper}>
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
                    <HelperText type="error" visible={false}>
                      {emailError}
                    </HelperText>
                  </View>

                  <View style={styles.inputWrapper}>
                    <TextInput
                      label="Senha *"
                      keyboardType="visible-password"
                      autoComplete="password"
                      mode="outlined"
                      placeholder="Digite seu email/CPF"
                      value={password}
                      onChangeText={value => {
                        onChangePassword(value);
                        setPasswordError('');
                      }}
                      error={!!passwordError}
                    />
                    <HelperText type="error" visible={!!passwordError}>
                      {passwordError}
                    </HelperText>
                  </View>
                </View>
              </View>
              <View style={styles.inputWrapperButton}>
                <Button
                  contentStyle={styles.button}
                  mode="contained"
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={() => handleSubmit()}>
                  Cadastrar
                </Button>
              </View>
              <Snackbar
                visible={!!message}
                onDismiss={() => setMessage('')}
                action={{
                  label: 'Fechar',
                  onPress: () => {
                    // Do something
                    setMessage('');
                  },
                }}>
                {message}
              </Snackbar>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 8,
    alignItems: 'center',
  },
  scroll: {
    height: '100%',
  },
  header: {
    width: '100%',
    marginTop: 24,
    marginBottom: 16,
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
    marginTop: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  inputWrapperButton: {
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
  },
  button: { height: 46 },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
