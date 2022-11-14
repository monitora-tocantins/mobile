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
  setOpinionPreventionMeasuresError: (text: string) => void;
  opinionPreventionMeasuresError: string;
  setOpinionPreventionMeasures: (value: string) => void;
  opinionPreventionMeasures: string;
};

export const FormOpinionPreventionMeasures: React.FC<Props> = ({
  setOpinionPreventionMeasuresError,
  opinionPreventionMeasuresError,
  setOpinionPreventionMeasures,
  opinionPreventionMeasures,
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
                mode="outlined"
                label="Selecione uma opção"
                onSelect={value => {
                  setOpinionPreventionMeasures(value);
                  setOpinionPreventionMeasuresError('');
                }}
                disabled={false}
                value={opinionPreventionMeasures}
                error={!!opinionPreventionMeasuresError}
                placeholder="Escolha uma opção"
                items={[
                  {
                    id: '0',
                    label: 'Necessário',
                    value: 'Necessário',
                  },
                  {
                    id: '1',
                    label: 'Eficaz',
                    value: 'Eficaz',
                  },
                  {
                    id: '2',
                    label: 'Desnecessário',
                    value: 'Desnecessário',
                  },
                ]}
              />
            </View>
            <HelperText type="error" visible={!!opinionPreventionMeasuresError}>
              {opinionPreventionMeasuresError}
            </HelperText>
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
