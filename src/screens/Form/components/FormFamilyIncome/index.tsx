import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { CustomInputCheck } from '../../../../components/CustomInputCheck';

type Props = {
  maintainedFamilyIncome: boolean | undefined;
  setMaintainedFamilyIncome: (value: boolean | undefined) => void;
  receivedSocialAssistance: boolean | undefined;
  setReceivedSocialAssistance: (value: boolean | undefined) => void;
  recoveredFamilyIncome: boolean | undefined;
  setRecoveredFamilyIncome: (value: boolean | undefined) => void;
  familyInDebt: boolean | undefined;
  setFamilyInDebt: (value: boolean | undefined) => void;
};

export const FormFamilyIncome: React.FC<Props> = ({
  maintainedFamilyIncome,
  setMaintainedFamilyIncome,
  receivedSocialAssistance,
  setReceivedSocialAssistance,
  recoveredFamilyIncome,
  setRecoveredFamilyIncome,
  familyInDebt,
  setFamilyInDebt,
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
                    setRecoveredFamilyIncome(undefined);
                    setFamilyInDebt(undefined);
                  }
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text>
                {' '}
                Durante a pandemia de COVID-19 sua família recebeu algum tipo de
                auxilio social?
              </Text>
              <CustomInputCheck
                title="Sim"
                label="Sim"
                value={receivedSocialAssistance === true}
                onValueChange={value => {
                  if (receivedSocialAssistance === true) {
                    setReceivedSocialAssistance(undefined);
                  } else {
                    setReceivedSocialAssistance(value);
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
                  }
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              {maintainedFamilyIncome === false &&
                receivedSocialAssistance !== undefined && (
                  <>
                    <View style={styles.inputWrapper}>
                      <Text>
                        Atualmente sua família recuperou a renda familiar?
                      </Text>
                      <CustomInputCheck
                        label="Sim"
                        title="Sim"
                        value={recoveredFamilyIncome === true}
                        onValueChange={value => {
                          if (recoveredFamilyIncome === true) {
                            setRecoveredFamilyIncome(undefined);
                          } else {
                            setRecoveredFamilyIncome(value);
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
                          }
                        }}
                      />
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
                            }
                          }}
                        />
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
