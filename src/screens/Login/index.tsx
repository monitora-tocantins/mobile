import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  useTheme,
  HelperText,
} from 'react-native-paper';

import LogoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/useAuth';
import { authScreensProp } from '../../routes/auth.routes';
import { maskCpf, validateCpf, validateEmail } from '../../utils/mask';
import { showMessage } from 'react-native-flash-message';

const Login: React.FC = () => {
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [documentType, setDocumentType] = useState<'email' | 'cpf'>('email');
  const [documentError, setDocumentError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { colors } = useTheme();
  const { signIn, loading } = useAuth();

  const navigation = useNavigation<authScreensProp>();

  const handleRegister = () => {
    navigation.navigate('register');
  };

  const handleSubmit = async () => {
    if (document === '') {
      return setDocumentError('Este campo é obrigatório');
    }
    if (documentType === 'email') {
      if (!validateEmail(document)) {
        return setDocumentError('Digite um e-mail válido');
      }
    } else if (documentType === 'cpf') {
      if (!validateCpf(document)) {
        return setDocumentError('Digite um CPF válido');
      }
    }
    if (password === '') {
      return setPasswordError('Este campo é obrigatório');
    }

    try {
      const result = await signIn(document, documentType, password);
      if (result) {
        showMessage({
          message: 'Login',
          description: 'Bem vindo ao Monitora Tocantins',
          type: 'success',
          animated: true,
          position: 'top',
          floating: true,
        });
      }
    } catch (error: any) {
      showMessage({
        message: 'Login',
        description: error,
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

  const onChangeDocument = (text: string) => {
    if (text.search('@') >= 0) {
      setDocumentType('email');
    } else if (Number(text)) {
      setDocumentType('cpf');
    } else {
      setDocumentType('email');
    }

    setDocumentError('');
    setDocument(text);
  };

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Image source={LogoImg} style={styles.logo} resizeMode="contain" />
        <View style={styles.header}>
          <Text
            variant="titleLarge"
            style={[styles.headerTitle, { color: colors.onPrimaryContainer }]}>
            Monitora Tocantins - UFPA
          </Text>
          <Text
            variant="titleMedium"
            style={[styles.headerSubtitle, { color: colors.secondary }]}>
            Não se preocupe, cuidaremos muito bem das suas informações.
          </Text>
        </View>
        <View style={styles.form}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            enabled={false}>
            <View style={styles.formWrapper}>
              <View style={styles.inputWrapper}>
                <TextInput
                  label="Email ou CPF"
                  mode="outlined"
                  placeholder="Digite seu email/CPF"
                  autoComplete="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={documentType === 'cpf' ? maskCpf(document) : document}
                  error={!!documentError}
                  // autoFocus
                  onChangeText={value =>
                    onChangeDocument(
                      documentType === 'cpf'
                        ? value.replace(/[^\d]+/g, '')
                        : value,
                    )
                  }
                />
                <HelperText type="error" visible={!!documentError}>
                  {documentError}
                </HelperText>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  label="Senha"
                  autoComplete="password"
                  mode="outlined"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  secureTextEntry={!passwordVisible}
                  onChangeText={value => onChangePassword(value)}
                  error={!!passwordError}
                  right={
                    <TextInput.Icon
                      icon={!passwordVisible ? 'eye' : 'eye-off'}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  }
                />
                <HelperText type="error" visible={!!passwordError}>
                  {passwordError}
                </HelperText>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.inputWrapperButton}>
            <Button
              contentStyle={styles.button}
              mode="contained"
              buttonColor={colors.primary}
              loading={loading}
              disabled={loading}
              onPress={() => handleSubmit()}>
              Entrar
            </Button>
            <Button
              contentStyle={styles.button}
              style={styles.registerButton}
              mode="text"
              disabled={loading}
              onPress={() => handleRegister()}>
              Ainda não tem uma conta? Cadastre-se
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default Login;

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
    marginTop: 8,
    marginBottom: 8,
  },
  inputWrapperButton: {
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
  },
  button: { height: 46 },
  registerButton: { marginTop: 16 },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
