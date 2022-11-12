import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { HelperText, useTheme } from 'react-native-paper';
import { CustomInputCheck } from '../../../../components/CustomInputCheck';
import Select from '../../../../components/Select';

type Props = {
  diagnosticConfirmation: boolean | undefined;
  vaccinated: boolean | undefined;
  setVaccinated: (value: boolean | undefined) => void;
  reasonNotToTake: string;
  setReasonNotToTake: (value: string) => void;
  setReasonNotToTakeError: (value: string) => void;
  reasonNotToTakeError: string;
  vaccineDoses: string;
  setVaccineDoses: (value: string) => void;
  setVaccineDosesError: (value: string) => void;
  vaccineDosesError: string;
};

export const FormVaccinated: React.FC<Props> = ({
  diagnosticConfirmation,
  vaccinated,
  setVaccinated,
  reasonNotToTake,
  setReasonNotToTake,
  vaccineDoses,
  setVaccineDoses,
  vaccineDosesError,
  setVaccineDosesError,
  reasonNotToTakeError,
  setReasonNotToTakeError,
}) => {
  const theme = useTheme();
  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Sim"
                label="Sim"
                value={vaccinated === true}
                onValueChange={value => {
                  if (vaccinated === true) {
                    setVaccinated(undefined);
                  } else {
                    setVaccineDoses('');
                    setVaccinated(value);
                    setReasonNotToTake('');
                  }
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Não"
                label="Não"
                value={vaccinated === false}
                onValueChange={value => {
                  if (vaccinated === false) {
                    setVaccinated(undefined);
                  } else {
                    setVaccineDoses('');
                    setVaccinated(!value);
                    setReasonNotToTake('');
                  }
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              {vaccinated && (
                <>
                  <Select
                    theme={theme}
                    label="Como estão suas doses da Vacina contra COVID 19?"
                    mode="outlined"
                    error={!!vaccineDosesError}
                    placeholder="Selecione uma opção"
                    onSelect={value => {
                      setVaccineDoses(value);
                      setVaccineDosesError('');
                    }}
                    value={vaccineDoses}
                    items={[
                      {
                        id: '0',
                        label: 'Dose única',
                        value: 'Dose única',
                      },
                      {
                        id: '1',
                        label: '02 doses',
                        value: '02 doses',
                      },
                      {
                        id: '2',
                        label: '03 doses',
                        value: '03 doses',
                      },
                      {
                        id: '3',
                        label: '04 doses',
                        value: '04 doses',
                      },
                    ]}
                  />
                  <HelperText type="error" visible={!!vaccineDosesError}>
                    {vaccineDosesError}
                  </HelperText>
                </>
              )}
            </View>

            <View style={styles.inputWrapper}>
              {vaccinated === false && (
                <>
                  <Select
                    theme={theme}
                    label="Porque você não tomou a vacina?"
                    mode="outlined"
                    error={!!reasonNotToTakeError}
                    placeholder="Selecione uma opção"
                    onSelect={value => {
                      setReasonNotToTake(value);
                      setReasonNotToTakeError('');
                    }}
                    value={reasonNotToTake}
                    items={[
                      {
                        id: '0',
                        label:
                          'Não tive acesso à vacina ou perdi o calendário vacinal',
                        value:
                          'Não tive acesso à vacina ou perdi o calendário vacinal',
                      },
                      {
                        id: '1',
                        label: 'Medo das possíveis reações da vacina',
                        value: 'Medo das possíveis reações da vacina',
                      },
                      {
                        id: '2',
                        label: 'Optei por esperar mais um pouco',
                        value: 'Optei por esperar mais um pouco',
                      },
                      {
                        id: '3',
                        label: 'Não acredito nas vacinas',
                        value: 'Não acredito nas vacinas',
                      },
                      {
                        id: '4',
                        label: 'Orientação religiosa',
                        value: 'Orientação religiosa',
                      },
                      {
                        id: '5',
                        label: 'Orientação médica',
                        value: 'Orientação médica',
                      },
                      {
                        id: '6',
                        label: 'Posição político/ideológica',
                        value: 'Posição político/ideológica',
                      },
                      {
                        id: '7',
                        label: 'Falta de informação adequada',
                        value: 'Falta de informação adequada',
                      },
                      {
                        id: '8',
                        label: 'Orientação familiar',
                        value: 'Orientação familiar',
                      },
                      {
                        id: '9',
                        label: 'Outras',
                        value: 'Outras',
                      },
                    ]}
                  />
                  <HelperText type="error" visible={!!vaccineDosesError}>
                    {vaccineDosesError}
                  </HelperText>
                </>
              )}
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
