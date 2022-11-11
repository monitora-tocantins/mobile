import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { HelperText, useTheme } from 'react-native-paper';
import Select from '../../../../components/Select';

type Props = {
  setSchoolLevel: (text: string) => void;
  schollLevel: string;
  setReligion: (text: string) => void;
  religion: string;
  schollError: string;
  religionError: string;
};

export const FormSchool: React.FC<Props> = ({
  setSchoolLevel,
  schollLevel,
  religion,
  setReligion,
  religionError,
  schollError,
}) => {
  const theme = useTheme();

  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <Select
                theme={theme}
                label="Nível escolar *"
                mode="outlined"
                error={!!schollError}
                placeholder="Selecione o nível escolar"
                onSelect={value => setSchoolLevel(value)}
                value={schollLevel}
                items={[
                  {
                    id: '0',
                    label: 'Fundamental Incompleto',
                    value: 'Fundamental Incompleto',
                  },
                  {
                    id: '1',
                    label: 'Fundamental',
                    value: 'Fundamental',
                  },
                  {
                    id: '2',
                    label: 'Médio',
                    value: 'Médio',
                  },
                  {
                    id: '3',
                    label: 'Superior',
                    value: 'Superior',
                  },
                  {
                    id: '4',
                    label: 'Pós-graduação',
                    value: 'Pós-graduação',
                  },
                ]}
              />
              <HelperText type="error" visible={!!religionError}>
                {schollError}
              </HelperText>
            </View>
            <View style={styles.inputWrapper}>
              <Select
                theme={theme}
                label="Qual a sua denominação religiosa? *"
                mode="outlined"
                placeholder="Selecione uma opção"
                onSelect={value => setReligion(value)}
                value={religion}
                error={!!religionError}
                items={[
                  {
                    id: '1',
                    label: 'Católica',
                    value: 'Católica',
                  },
                  {
                    id: '2',
                    label: 'Evangélica',
                    value: 'Evangélica',
                  },
                  {
                    id: '3',
                    label: 'Religiões de Matrizes Afro-brasileira',
                    value: 'Religiões de Matrizes Afro-brasileira',
                  },
                  {
                    id: '4',
                    label: 'Ateu',
                    value: 'Ateu',
                  },
                  {
                    id: '5',
                    label: 'Outro',
                    value: 'Outro',
                  },
                ]}
              />
              <HelperText type="error" visible={!!religionError}>
                {religionError}
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
