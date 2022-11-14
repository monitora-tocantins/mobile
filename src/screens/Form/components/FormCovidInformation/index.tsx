import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Select from '../../../../components/Select';

type Props = {
  setVaccineDosesError: (text: string) => void;
  vaccineDosesError: string;
  covidInformation: string;
  setCovidInformation: (value: string) => void;
};

export const FormCovidInformation: React.FC<Props> = ({
  setVaccineDosesError,
  vaccineDosesError,
  covidInformation,
  setCovidInformation,
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
                label="Selecione uma opção"
                onSelect={value => {
                  setCovidInformation(value);
                  setVaccineDosesError('');
                }}
                disabled={false}
                value={covidInformation}
                error={!!vaccineDosesError}
                placeholder="Escolha uma opção"
                items={[
                  {
                    id: '0',
                    label: 'Veículo televisivo e rádio',
                    value: 'Veículo televisivo e rádio',
                  },
                  {
                    id: '1',
                    label: 'Internet e redes sociais',
                    value: 'Internet e redes sociais',
                  },
                  {
                    id: '2',
                    label:
                      'Campanhas de vacinação (agentes de saúde, folder, cartazes, outdoor)',
                    value:
                      'Campanhas de vacinação (agentes de saúde, folder, cartazes, outdoor)',
                  },
                ]}
              />
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
