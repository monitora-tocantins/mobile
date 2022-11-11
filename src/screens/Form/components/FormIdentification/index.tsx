import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Checkbox, HelperText, TextInput, useTheme } from 'react-native-paper';
import { maskCpf } from '../../../../utils/mask';

type Props = {
  setName: (text: string) => void;
  name: string;
  setCpf: (text?: string) => void;
  cpf?: string;
  setEmail: (text: string) => void;
  email: string;
  setReasonNotCpf: (text?: string) => void;
  reasonNotCpf?: string;
  nameError: string;
  setNameError: (value: string) => void;
  cpfError: string;
  setCpfError: (value: string) => void;
  emailError: string;
  setEmailError: (value: string) => void;
  toggleCheckBoxCpf: boolean;
  setToggleCheckBoxCpf: (value: boolean) => void;
};

export const FormIdentification: React.FC<Props> = ({
  cpf,
  email,
  name,
  setCpf,
  setEmail,
  setName,
  setReasonNotCpf,
  reasonNotCpf,
  nameError,
  setNameError,
  cpfError,
  setCpfError,
  emailError,
  setEmailError,
  toggleCheckBoxCpf,
  setToggleCheckBoxCpf,
}) => {
  const theme = useTheme();

  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <TextInput
                label="Nome *"
                placeholder="Digite o nome do entrevistado"
                keyboardType="name-phone-pad"
                mode="outlined"
                value={name}
                error={!!nameError}
                onChangeText={text => {
                  setName(text);
                  setNameError('');
                }}
              />
              <HelperText type="error" visible={!!nameError}>
                {nameError}
              </HelperText>
            </View>
            {!toggleCheckBoxCpf ? (
              <>
                <View style={styles.inputWrapper}>
                  <TextInput
                    label="CPF *"
                    placeholder="Digite o CPF do entrevistado"
                    keyboardType="numeric"
                    mode="outlined"
                    autoCapitalize="none"
                    value={maskCpf(cpf !== undefined ? cpf : '')}
                    error={!!cpfError}
                    onChangeText={text => {
                      setCpf(text.replace(/[^\d]+/g, ''));
                      setCpfError('');
                    }}
                  />
                  <HelperText type="error" visible={!!cpfError}>
                    {cpfError}
                  </HelperText>
                </View>
              </>
            ) : (
              <>
                <View style={styles.inputWrapper}>
                  <TextInput
                    label="Qual o motivo de não informar o CPF? *"
                    placeholder="Descreva aqui..."
                    onChangeText={text => {
                      setReasonNotCpf(text);
                      setCpf('');
                    }}
                    multiline
                    numberOfLines={3}
                    mode="outlined"
                    editable
                    error={!!cpfError}
                    value={reasonNotCpf}
                  />
                  <HelperText type="error" visible={!!cpfError}>
                    {cpfError}
                  </HelperText>
                </View>
              </>
            )}
            <View style={styles.check}>
              <Checkbox
                disabled={false}
                status={toggleCheckBoxCpf ? 'checked' : 'unchecked'}
                onPress={() => {
                  setToggleCheckBoxCpf(!toggleCheckBoxCpf);
                  setCpfError('');
                }}
              />
              <Text
                style={[
                  styles.textCheck,
                  { color: theme.colors.onPrimaryContainer },
                ]}>
                Prefiro não informar o CPF
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                label="E-mail"
                placeholder="Digite o e-mail do entrevistado"
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
              <HelperText type="error" visible={!!emailError}>
                {emailError}
              </HelperText>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  buttons: {
    width: '100%',
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
  inputWrapper: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
});
