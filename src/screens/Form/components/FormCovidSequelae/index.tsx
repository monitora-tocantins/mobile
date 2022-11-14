import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { HelperText, TextInput, useTheme } from 'react-native-paper';
import Select from '../../../../components/Select';

type Props = {
  setCovidSequelae: (text: string) => void;
  setOtherCovidSequelaeError: (text: string) => void;
  otherCovidSequelae: string;
  otherCovidSequelaeError: string;
  setOtherCovidSequelae: (value: string) => void;
  covidSequelae: string;
  treatmentPlace: string;
  covidSequelaeError: string;
  covidSequelaeNone: boolean;
  setCovidSequelaeNone: (value: boolean) => void;
};

export const FormCovidSequelae: React.FC<Props> = ({
  setCovidSequelae,
  treatmentPlace,
  covidSequelae,
  covidSequelaeError,
  covidSequelaeNone,
  setCovidSequelaeNone,
  setOtherCovidSequelaeError,
  otherCovidSequelae,
  otherCovidSequelaeError,
  setOtherCovidSequelae,
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
                label="Com quais sequelas você ficou?"
                mode="outlined"
                error={!!covidSequelaeError}
                onSelect={value => {
                  if (value === 'Outras') {
                    setCovidSequelaeNone(true);
                  } else {
                    setCovidSequelaeNone(false);
                  }
                  setCovidSequelae(value);
                  setOtherCovidSequelae('');
                }}
                // disabled={false}
                value={covidSequelae}
                placeholder="Selecione uma opção"
                items={[
                  {
                    id: '0',
                    label: 'Não percebo sequelas',
                    value: 'Não percebo sequelas',
                  },
                  {
                    id: '1',
                    label: 'Fadiga, cansaço, fraqueza, mal-estar',
                    value: 'Fadiga, cansaço, fraqueza, mal-estar',
                  },
                  {
                    id: '2',
                    label:
                      'Falta de ar (ou dificuldade de respirar, respiração curta)',
                    value:
                      'Falta de ar (ou dificuldade de respirar, respiração curta)',
                  },
                  {
                    id: '3',
                    label: 'Perda de paladar e olfato',
                    value: 'Perda de paladar e olfato',
                  },
                  {
                    id: '4',
                    label: 'Outras',
                    value: 'Outras',
                  },
                ]}
              />
              <HelperText type="error" visible={!!covidSequelaeError}>
                {covidSequelaeError}
              </HelperText>
              <View style={styles.inputWrapper}>
                {covidSequelaeNone && (
                  <>
                    <TextInput
                      label="Outras sequelas"
                      placeholder="Outras sequelas"
                      value={otherCovidSequelae}
                      error={!!otherCovidSequelaeError}
                      mode="outlined"
                      onChangeText={text => {
                        setOtherCovidSequelae(text);
                        setOtherCovidSequelaeError('');
                      }}
                    />
                    <HelperText
                      type="error"
                      visible={!!otherCovidSequelaeError}>
                      {otherCovidSequelaeError}
                    </HelperText>
                  </>
                )}
              </View>
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
