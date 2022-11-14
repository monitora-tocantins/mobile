import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { HelperText, Text } from 'react-native-paper';
import { CustomInputCheck } from '../../../../components/CustomInputCheck';

type Props = {
  maintainedFamilyIncome: boolean | undefined;
  setMaintainedFamilyIncome: (value: boolean | undefined) => void;
  setMaintainedFamilyIncomeError: (text: string) => void;
  maintainedFamilyIncomeError: string;
  receivedSocialAssistance: boolean | undefined;
  setReceivedSocialAssistance: (value: boolean | undefined) => void;
  receivedSocialAssistanceError: string;
  setReceivedSocialAssistanceError: (text: string) => void;
  recoveredFamilyIncome: boolean | undefined;
  setRecoveredFamilyIncome: (value: boolean | undefined) => void;
  recoveredFamilyIncomeError: string;
  setRecoveredFamilyIncomeError: (text: string) => void;
  familyInDebt: boolean | undefined;
  setFamilyInDebt: (value: boolean | undefined) => void;
  familyInDebtError: string;
  setFamilyInDebtError: (text: string) => void;
};

export const FormFamilyIncome: React.FC<Props> = ({
  maintainedFamilyIncome,
  setMaintainedFamilyIncome,
  setMaintainedFamilyIncomeError,
  maintainedFamilyIncomeError,
  receivedSocialAssistance,
  setReceivedSocialAssistance,
  receivedSocialAssistanceError,
  setReceivedSocialAssistanceError,
  recoveredFamilyIncome,
  setRecoveredFamilyIncome,
  recoveredFamilyIncomeError,
  setRecoveredFamilyIncomeError,
  familyInDebt,
  setFamilyInDebt,
  familyInDebtError,
  setFamilyInDebtError,
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
                value={maintainedFamilyIncome === true}
                onValueChange={value => {
                  if (maintainedFamilyIncome === true) {
                    setMaintainedFamilyIncome(undefined);
                  } else {
                    setMaintainedFamilyIncome(value);
                    setRecoveredFamilyIncome(false);
                    setFamilyInDebt(false);
                    setMaintainedFamilyIncomeError('');
                  }
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Não"
                label="Não"
                value={maintainedFamilyIncome === false}
                onValueChange={value => {
                  if (maintainedFamilyIncome === false) {
                    setMaintainedFamilyIncome(undefined);
                  } else {
                    setMaintainedFamilyIncome(!value);
                    setMaintainedFamilyIncomeError('');
                    setRecoveredFamilyIncome(undefined);
                    setFamilyInDebt(undefined);
                  }
                }}
              />
              <HelperText type="error" visible={!!maintainedFamilyIncomeError}>
                {maintainedFamilyIncomeError}
              </HelperText>
            </View>

            <Text variant="bodyLarge">
              {' '}
              Durante a pandemia de COVID-19 sua família recebeu algum tipo de
              auxilio social?
            </Text>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Sim"
                label="Sim"
                value={receivedSocialAssistance === true}
                onValueChange={value => {
                  if (receivedSocialAssistance === true) {
                    setReceivedSocialAssistance(undefined);
                  } else {
                    setReceivedSocialAssistance(value);
                    setReceivedSocialAssistanceError('');
                  }
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Não"
                label="Nao"
                value={receivedSocialAssistance === false}
                onValueChange={value => {
                  if (receivedSocialAssistance === false) {
                    setReceivedSocialAssistance(undefined);
                  } else {
                    setReceivedSocialAssistance(!value);
                    setReceivedSocialAssistanceError('');
                  }
                }}
              />
              <HelperText
                type="error"
                visible={!!receivedSocialAssistanceError}>
                {receivedSocialAssistanceError}
              </HelperText>
            </View>

            <View style={styles.inputWrapper}>
              {maintainedFamilyIncome === false &&
                receivedSocialAssistance !== undefined && (
                  <>
                    <Text>
                      Atualmente sua família recuperou a renda familiar?
                    </Text>
                    <View style={styles.inputWrapper}>
                      <CustomInputCheck
                        label="Sim"
                        title="Sim"
                        value={recoveredFamilyIncome === true}
                        onValueChange={value => {
                          if (recoveredFamilyIncome === true) {
                            setRecoveredFamilyIncome(undefined);
                          } else {
                            setRecoveredFamilyIncome(value);
                            setReceivedSocialAssistanceError('');
                            setRecoveredFamilyIncomeError('');
                          }
                        }}
                      />
                    </View>
                    <View style={styles.inputWrapper}>
                      <CustomInputCheck
                        label="Não"
                        title="Não"
                        value={recoveredFamilyIncome === false}
                        onValueChange={value => {
                          if (recoveredFamilyIncome === false) {
                            setRecoveredFamilyIncome(undefined);
                          } else {
                            setRecoveredFamilyIncome(!value);
                            setReceivedSocialAssistanceError('');
                            setRecoveredFamilyIncomeError('');
                          }
                        }}
                      />
                      <HelperText
                        type="error"
                        visible={!!recoveredFamilyIncomeError}>
                        {recoveredFamilyIncomeError}
                      </HelperText>
                    </View>
                    <View style={styles.inputWrapper}>
                      <Text>
                        Você considera que a pandemia de COVID-19 levou sua
                        família ao endividamento?
                      </Text>
                      <View style={styles.inputWrapper}>
                        <CustomInputCheck
                          title="Sim"
                          label="Sim"
                          value={familyInDebt === true}
                          onValueChange={value => {
                            if (familyInDebt === true) {
                              setFamilyInDebt(undefined);
                            } else {
                              setFamilyInDebt(value);
                              setFamilyInDebtError('');
                            }
                          }}
                        />
                      </View>
                      <View style={styles.inputWrapper}>
                        <CustomInputCheck
                          title="Não"
                          label="Não"
                          value={familyInDebt === false}
                          onValueChange={value => {
                            if (familyInDebt === false) {
                              setFamilyInDebt(undefined);
                            } else {
                              setFamilyInDebt(!value);
                              setFamilyInDebtError('');
                            }
                          }}
                        />
                        <HelperText type="error" visible={!!familyInDebtError}>
                          {familyInDebtError}
                        </HelperText>
                      </View>
                    </View>
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
