import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { HelperText, TextInput, useTheme } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { CustomInputCheck } from '../../../../components/CustomInputCheck';

type Props = {
  affectedCovidAfterVaccinated: boolean | undefined;
  setAffectedCovidAfterVaccinated: (value: boolean | undefined) => void;
  rehabilitationSequelae: boolean | undefined;
  setRehabilitationSequelae: (value: boolean | undefined) => void;
  treatmentRehabilitationSequelae: string;
  setTreatmentRehabilitationSequelae: (value: string) => void;
  setTreatmentRehabilitationSequelaeError: (value: string) => void;
  treatmentRehabilitationSequelaeError: string;
  setRehabilitationSequelaeError: (value: string) => void;
  rehabilitationSequelaeError: string;
  setAffectedCovidAfterVaccinatedError: (value: string) => void;
  affectedCovidAfterVaccinatedError: string;
};

export const FormAffectedCovidAfterVaccinated: React.FC<Props> = ({
  affectedCovidAfterVaccinated,
  rehabilitationSequelae,
  setAffectedCovidAfterVaccinated,
  setRehabilitationSequelae,
  setTreatmentRehabilitationSequelae,
  treatmentRehabilitationSequelae,
  setTreatmentRehabilitationSequelaeError,
  treatmentRehabilitationSequelaeError,
  setRehabilitationSequelaeError,
  rehabilitationSequelaeError,
  setAffectedCovidAfterVaccinatedError,
  affectedCovidAfterVaccinatedError,
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
                value={affectedCovidAfterVaccinated === true}
                onValueChange={value => {
                  if (affectedCovidAfterVaccinated === true) {
                    setAffectedCovidAfterVaccinated(undefined);
                    setRehabilitationSequelaeError('');
                  } else {
                    setAffectedCovidAfterVaccinatedError('');
                    setAffectedCovidAfterVaccinated(value);
                    setRehabilitationSequelaeError('');
                  }
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Não"
                label="Não"
                value={affectedCovidAfterVaccinated === false}
                onValueChange={value => {
                  if (affectedCovidAfterVaccinated === false) {
                    setAffectedCovidAfterVaccinated(undefined);
                  } else {
                    setAffectedCovidAfterVaccinatedError('');
                    setRehabilitationSequelaeError('');
                    setAffectedCovidAfterVaccinated(!value);
                  }
                }}
              />
              <HelperText
                type="error"
                visible={!!affectedCovidAfterVaccinatedError}>
                {affectedCovidAfterVaccinatedError}
              </HelperText>
            </View>
            <Text variant="bodyLarge">
              {' '}
              Você faz algum tratamento para reabilitação de sequelas pós
              COVID-19?{' '}
            </Text>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Sim"
                label="Sim"
                value={rehabilitationSequelae === true}
                onValueChange={value => {
                  if (rehabilitationSequelae === true) {
                    setRehabilitationSequelae(undefined);
                  } else {
                    setRehabilitationSequelae(value);
                    setRehabilitationSequelaeError('');
                    setTreatmentRehabilitationSequelaeError('');
                  }
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Não"
                label="Não"
                value={rehabilitationSequelae === false}
                onValueChange={value => {
                  if (rehabilitationSequelae === false) {
                    setRehabilitationSequelae(undefined);
                  } else {
                    setRehabilitationSequelae(!value);
                    setTreatmentRehabilitationSequelae('');
                    setRehabilitationSequelaeError('');
                  }
                }}
              />
            </View>
            <HelperText type="error" visible={!!rehabilitationSequelaeError}>
              {rehabilitationSequelaeError}
            </HelperText>
            {rehabilitationSequelae === true && (
              <>
                <TextInput
                  mode="outlined"
                  label="Quais tratamentos"
                  placeholder="Digite quais tratamentos"
                  error={!!treatmentRehabilitationSequelaeError}
                  value={treatmentRehabilitationSequelae}
                  onChangeText={text => {
                    setTreatmentRehabilitationSequelae(text);
                    setRehabilitationSequelaeError('');
                  }}
                />
                <HelperText
                  type="error"
                  visible={!!treatmentRehabilitationSequelaeError}>
                  {treatmentRehabilitationSequelaeError}
                </HelperText>
              </>
            )}
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
  subtitle: {
    //fontFamily: theme.fonts.text,
    fontSize: 18,
    marginTop: 32,
    //color: theme.colors.gray10,
  },
  inputWrapper: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
});
