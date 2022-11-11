import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { CustomInputCheck } from '../../../../components/CustomInputCheck';

type Props = {
  diabetes: boolean;
  setDiabetes: (value: boolean) => void;
  heartProblem: boolean;
  setHeartProblem: (value: boolean) => void;
  kidneyDisease: boolean;
  setKidneyDisease: (value: boolean) => void;
  thyroid: boolean;
  setThyroid: (value: boolean) => void;
  obesity: boolean;
  setObesity: (value: boolean) => void;
  otherComorbidity: string;
  setOtherComorbidity: (value: string) => void;
  comorbidityOptionsNone: boolean;
  setComorbidityOptionsNone: (value: boolean) => void;
  otherComorbidityError: string;
  setOtherComorbidityError: (value: string) => void;
};

export const FormComorbidityOptions: React.FC<Props> = ({
  diabetes,
  setDiabetes,
  heartProblem,
  setHeartProblem,
  kidneyDisease,
  setKidneyDisease,
  thyroid,
  setThyroid,
  obesity,
  setObesity,
  otherComorbidity,
  setOtherComorbidity,
  comorbidityOptionsNone,
  otherComorbidityError,
  setComorbidityOptionsNone,
  setOtherComorbidityError,
}) => {
  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Diabetes"
                label="Diabetes"
                value={diabetes}
                onValueChange={value => {
                  setDiabetes(value);
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Problema cardíaco"
                label="Problema cardíaco"
                value={heartProblem}
                onValueChange={value => {
                  setHeartProblem(value);
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Doença renal"
                label="Doença renal"
                value={kidneyDisease}
                onValueChange={value => {
                  setKidneyDisease(value);
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Problemas de tireóide"
                label="Problemas de tireóide"
                value={thyroid}
                onValueChange={value => {
                  setThyroid(value);
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Obesidade"
                label="Obesidade"
                value={obesity}
                onValueChange={value => {
                  setObesity(value);
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Outras comorbidades"
                label="Outras"
                value={comorbidityOptionsNone}
                onValueChange={value => {
                  setComorbidityOptionsNone(value);
                  setOtherComorbidity('');
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              {comorbidityOptionsNone && (
                <>
                  <TextInput
                    label="Outras comorbidades"
                    placeholder="Outras comorbidades"
                    value={otherComorbidity}
                    error={!!otherComorbidityError}
                    mode="outlined"
                    multiline
                    numberOfLines={3}
                    onChangeText={text => {
                      setOtherComorbidity(text);
                      setOtherComorbidityError('');
                    }}
                  />
                  <HelperText type="error" visible={!!otherComorbidityError}>
                    {otherComorbidityError}
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
