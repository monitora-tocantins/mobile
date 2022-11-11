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
  setAgeGroup: (text: string) => void;
  ageGroup: string;
  setGender: (text: string) => void;
  gender: string;
  ageGroupError: string;
};

export const FormMoreInformation: React.FC<Props> = ({
  ageGroup,
  gender,
  setAgeGroup,
  setGender,
  ageGroupError,
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
                label="Qual a faixa de idade? *"
                mode="outlined"
                error={!!ageGroupError}
                placeholder="Informe a faixa de idade"
                onSelect={value => setAgeGroup(value)}
                value={ageGroup}
                items={[
                  {
                    id: '1',
                    label: 'Até 25',
                    value: 'Até 25 anos',
                  },
                  {
                    id: '2',
                    label: '25-35',
                    value: '25-35',
                  },
                  {
                    id: '3',
                    label: '36-50',
                    value: '36-50',
                  },
                  {
                    id: '4',
                    label: '51-70',
                    value: '51-70',
                  },
                  {
                    id: '5',
                    label: 'Acima de 70',
                    value: 'Acima de 70',
                  },
                ]}
              />
              <HelperText type="error" visible={false}>
                {ageGroupError}
              </HelperText>
            </View>
            <View style={styles.inputWrapper}>
              <Select
                theme={theme}
                label="Gênero"
                mode="outlined"
                placeholder="Informe o gênero"
                onSelect={value => setGender(value)}
                value={gender}
                items={[
                  {
                    id: '1',
                    label: 'Masculino',
                    value: 'Masculino',
                  },
                  {
                    id: '2',
                    label: 'Feminino',
                    value: 'Feminino',
                  },
                  {
                    id: '3',
                    label: 'Outro',
                    value: 'Outro',
                  },
                ]}
              />
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
