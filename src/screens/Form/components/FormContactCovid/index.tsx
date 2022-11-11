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
  affectedCovid19: boolean | undefined;
  setAffectedCovid19: (value: boolean | undefined) => void;
};

export const FormContactCovid: React.FC<Props> = ({
  affectedCovid19,
  setAffectedCovid19,
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
                value={affectedCovid19 === true}
                onValueChange={value => {
                  if (affectedCovid19 === true) {
                    setAffectedCovid19(undefined);
                  } else {
                    setAffectedCovid19(value);
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
                value={affectedCovid19 === false}
                onValueChange={value => {
                  if (affectedCovid19 === false) {
                    setAffectedCovid19(undefined);
                  } else {
                    setAffectedCovid19(!value);
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
