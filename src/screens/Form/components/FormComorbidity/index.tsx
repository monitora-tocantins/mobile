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
  comorbidity: boolean | undefined;
  setComorbidity: (value: boolean | undefined) => void;
};

export const FormComorbidity: React.FC<Props> = ({
  comorbidity,
  setComorbidity,
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
                value={comorbidity === true}
                onValueChange={value => {
                  if (comorbidity === true) {
                    setComorbidity(undefined);
                  } else {
                    setComorbidity(value);
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
                value={comorbidity === false}
                onValueChange={value => {
                  if (comorbidity === false) {
                    setComorbidity(undefined);
                  } else {
                    setComorbidity(!value);
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
