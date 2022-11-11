import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { HelperText } from 'react-native-paper';
import { CustomInputCheck } from '../../../../components/CustomInputCheck';

type Props = {
  diagnosticConfirmation: boolean | undefined;
  setDiagnosticConfirmation: (value: boolean | undefined) => void;
};

export const FormDiagnosticConfirmation: React.FC<Props> = ({
  diagnosticConfirmation,
  setDiagnosticConfirmation,
}) => {
  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Sim"
                label="Sim"
                value={diagnosticConfirmation === true}
                onValueChange={value => {
                  if (diagnosticConfirmation === true) {
                    setDiagnosticConfirmation(undefined);
                  } else {
                    setDiagnosticConfirmation(value);
                  }
                }}
              />
              <HelperText type="error" visible={false}>
                error
              </HelperText>
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Não"
                label="Não"
                value={diagnosticConfirmation === false}
                onValueChange={value => {
                  if (diagnosticConfirmation === false) {
                    setDiagnosticConfirmation(undefined);
                  } else {
                    setDiagnosticConfirmation(!value);
                  }
                }}
              />
              <HelperText type="error" visible={false}>
                error
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
