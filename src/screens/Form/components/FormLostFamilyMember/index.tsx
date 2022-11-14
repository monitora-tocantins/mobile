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
  setLostFamilyMemberError: (value: string) => void;
  lostFamilyMemberError: string;
  lostFamilyMember: boolean | undefined;
  setLostFamilyMember: (value: boolean | undefined) => void;
};

export const FormLostFamilyMember: React.FC<Props> = ({
  setLostFamilyMemberError,
  lostFamilyMember,
  lostFamilyMemberError,
  setLostFamilyMember,
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
                value={lostFamilyMember === true}
                onValueChange={value => {
                  if (lostFamilyMember === true) {
                    setLostFamilyMemberError('');
                    setLostFamilyMember(undefined);
                  } else {
                    setLostFamilyMemberError('');
                    setLostFamilyMember(value);
                  }
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputCheck
                title="Não"
                label="Não"
                value={lostFamilyMember === false}
                onValueChange={value => {
                  if (lostFamilyMember === false) {
                    setLostFamilyMemberError('');
                    setLostFamilyMember(undefined);
                  } else {
                    setLostFamilyMemberError('');
                    setLostFamilyMember(!value);
                  }
                }}
              />
              <HelperText type="error" visible={!!lostFamilyMemberError}>
                {lostFamilyMemberError}
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
