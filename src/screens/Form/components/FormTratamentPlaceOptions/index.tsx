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
  setHospitalTreatment: (text: string) => void;
  hospitalTreatment: string;
  hospitalTreatmentError: string;
};

export const FormTratamentPlaceOptions: React.FC<Props> = ({
  setHospitalTreatment,
  hospitalTreatment,
  hospitalTreatmentError,
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
                label="No hospital você recebeu qual tratamento?"
                mode="outlined"
                error={!!hospitalTreatmentError}
                placeholder="Selecione uma opção"
                onSelect={value => setHospitalTreatment(value)}
                value={hospitalTreatment}
                items={[
                  {
                    id: '0',
                    label: 'Ambulatorial',
                    value: 'Ambulatorial',
                  },
                  {
                    id: '1',
                    label: 'Unidade de terapia intensiva - UTI',
                    value: 'Unidade de terapia intensiva - UTI',
                  },
                ]}
              />
              <HelperText type="error" visible={!!hospitalTreatmentError}>
                {hospitalTreatmentError}
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
