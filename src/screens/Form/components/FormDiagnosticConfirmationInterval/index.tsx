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
  timeInterval: string;
  setTimeInterval: (value: string) => void;
  diagnosticMethod: string;
  setDiagnosticMethod: (value: string) => void;
  diagnosticMethodError: string;
  timeIntervalError: string;
};

export const FormDiagnosticConfirmationInterval: React.FC<Props> = ({
  timeInterval,
  setTimeInterval,
  diagnosticMethod,
  setDiagnosticMethod,
  diagnosticMethodError,
  timeIntervalError,
}) => {
  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <Select
                theme={theme}
                label="Qual foi o intervalo de tempo? *"
                mode="outlined"
                error={!!timeIntervalError}
                onSelect={value => setTimeInterval(value)}
                value={timeInterval}
                items={[
                  {
                    id: '0',
                    label: 'Menos de 6 meses',
                    value: 'Menos de 6 meses',
                  },
                  {
                    id: '1',
                    label: '6 - 12 meses',
                    value: '6 - 12 meses',
                  },
                  {
                    id: '2',
                    label: '12 - 24 meses',
                    value: '12 - 24 meses',
                  },
                  {
                    id: '3',
                    label: 'Acima de 24 meses',
                    value: 'acima de 24 meses',
                  },
                ]}
              />
              <HelperText type="error" visible={!!timeIntervalError}>
                {timeIntervalError}
              </HelperText>
            </View>
            <View style={styles.inputWrapper}>
              <Select
                theme={theme}
                label="Como obteve a confirmação/diagnóstico? *"
                mode="outlined"
                error={!!diagnosticMethodError}
                onSelect={value => setDiagnosticMethod(value)}
                value={diagnosticMethod}
                items={[
                  {
                    id: '0',
                    label: 'Pelo teste cotonete basal',
                    value: 'Pelo teste cotonete basal',
                  },
                  {
                    id: '1',
                    label: 'Sorológico (IGG; IGM)',
                    value: 'Sorológico (IGG; IGM)',
                  },
                ]}
              />
              <HelperText type="error" visible={!!diagnosticMethodError}>
                {diagnosticMethodError}
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
