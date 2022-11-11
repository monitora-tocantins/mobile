import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { HelperText } from 'react-native-paper';
import Select from '../../../../components/Select';
import { theme } from '../../../../theme';

type Props = {
  treatmentPlace: string;
  setTreatmentPlace: (value: string) => void;
  treatmentPlaceError: string;
};

export const FormTratamentPlace: React.FC<Props> = ({
  treatmentPlace,
  setTreatmentPlace,
  treatmentPlaceError,
}) => {
  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <Select
                theme={theme}
                label="Onde foi seu tratamento? *"
                mode="outlined"
                error={!!treatmentPlaceError}
                onSelect={value => setTreatmentPlace(value)}
                value={treatmentPlace}
                items={[
                  {
                    id: '0',
                    label: 'Em Casa',
                    value: 'Casa',
                  },
                  {
                    id: '1',
                    label: 'No Hospital',
                    value: 'Hospital',
                  },
                  {
                    id: '2',
                    label: 'Unidade de ponto atendimento - UPA',
                    value: 'Unidade de ponto atendimento - UPA',
                  },
                ]}
              />
              <HelperText type="error" visible={!!treatmentPlaceError}>
                {treatmentPlaceError}
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
