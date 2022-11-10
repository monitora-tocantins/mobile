import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Keyboard, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { FormIdentification } from './components/FormIdentification';
import { validateCpf, validateEmail } from '../../utils/mask';
import { AppScreensProps } from '../../routes/app.routes';

const Form: React.FC = () => {
  const theme = useTheme();
  const [isFinish, setIsFinish] = useState(false);
  const [isStated, setIsStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  // estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState<string | undefined>(undefined);
  const [reasonNotCpf, setReasonNotCpf] = useState<string | undefined>(
    undefined,
  );
  const [nameError, setNameError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [toggleCheckBoxCpf, setToggleCheckBoxCpf] = useState(false);

  const navigation = useNavigation<AppScreensProps>();

  const validadeFormIdentification = () => {
    Keyboard.dismiss();

    if (name === '') {
      return setNameError('O nome é obrigatório');
    }
    if (toggleCheckBoxCpf === false) {
      if (cpf === undefined || cpf === '') {
        setCpfError('CPf é obrigatório');
        return false;
      }
      if (!validateCpf(cpf)) {
        setCpfError('Digite um CPF válido');
        return false;
      }
    } else {
      if (reasonNotCpf === '' || reasonNotCpf === undefined) {
        setCpfError('Digite o motivo');
        return false;
      }
    }

    if (email !== '') {
      if (!validateEmail(email)) {
        setEmailError('Digite um e-mail válido');
        return false;
      }
    }

    return true;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === FORMS.length - 1) {
      handleSubmit();
      return;
    }

    if (activeStep === 0) {
      if (validadeFormIdentification()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleSubmit = () => {};

  const FORMS = [
    {
      key: '1',
      title: 'Identificação',
      description: 'Insira os dados pessoais',
      form: (
        <FormIdentification
          setName={setName}
          name={name}
          setCpf={setCpf}
          cpf={cpf}
          setEmail={setEmail}
          email={email}
          setReasonNotCpf={setReasonNotCpf}
          reasonNotCpf={reasonNotCpf}
          nameError={nameError}
          setNameError={setNameError}
          cpfError={cpfError}
          setCpfError={setCpfError}
          emailError={emailError}
          setEmailError={setEmailError}
          toggleCheckBoxCpf={toggleCheckBoxCpf}
          setToggleCheckBoxCpf={setToggleCheckBoxCpf}
        />
      ),
    },
    // {
    //   key: '2',
    //   title: 'Informações complementares',
    //   description:
    //     'Para continuar, complete o seu perfil com mais algumas informações',
    //   form: (
    //     <CensusFormMoreInformation
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       ageGroup={ageGroup}
    //       gender={gender}
    //       setAgeGroup={setAgeGroup}
    //       setGender={setGender}
    //     />
    //   ),
    // },
    // {
    //   key: '3',
    //   title: 'Endereço',
    //   description: 'Seu endereço não será utilizado publicamente',
    //   form: (
    //     <CensusFormAddress
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       city={city}
    //       setCity={setCity}
    //       street={street}
    //       setStreet={setStreet}
    //       district={district}
    //       setDistrict={setDistrict}
    //       county={county}
    //       setCounty={setCounty}
    //       number={number}
    //       setNumber={setNumber}
    //       region={region}
    //       setRegion={setRegion}
    //       zipcode={zipcode}
    //       setZicode={setZicode}
    //       setZone={setZone}
    //       zone={zone}
    //       latitude={latitude}
    //       setLatitude={setLatitude}
    //       longitude={longitude}
    //       setLongitude={setLongitude}
    //       uf={uf}
    //       setUf={setUf}
    //     />
    //   ),
    // },
    // {
    //   key: '4',
    //   title: 'Qual o nível escolar?',
    //   description: '',
    //   form: (
    //     <CensusFormSchool
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       schollLevel={schollLevel}
    //       setSchoolLevel={setSchoolLevel}
    //       religion={religion}
    //       setReligion={setReligion}
    //     />
    //   ),
    // },
    // {
    //   key: '5',
    //   title: 'Mapeamento pós covid-19: contágio e sequelas',
    //   description: 'Possui pelo menos uma comorbidade?',
    //   form: (
    //     <CensusFormComorbidity
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       comorbidity={comorbidity}
    //       setComorbidity={setComorbidity}
    //     />
    //   ),
    // },
    // {
    //   key: '6',
    //   title: 'Mapeamento pós covid-19: contágio e sequelas',
    //   description: 'Possui pelo menos uma comorbidade?',
    //   form: (
    //     <CensusFormComorbidityOptions
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       diabetes={diabetes}
    //       setDiabetes={setDiabetes}
    //       heartProblem={heartProblem}
    //       setHeartProblem={setHeartProblem}
    //       kidneyDisease={kidneyDisease}
    //       setKidneyDisease={setKidneyDisease}
    //       thyroid={thyroid}
    //       setThyroid={setThyroid}
    //       obesity={obesity}
    //       setObesity={setObesity}
    //       otherComorbidity={otherComorbidity}
    //       setOtherComorbidity={setOtherComorbidity}
    //     />
    //   ),
    // },
    // {
    //   key: '7',
    //   title: 'Contato com o Covid-19',
    //   description: 'Você foi acometido pela COVID-19 nos últimos anos?',
    //   form: (
    //     <CensusFormContactCovid
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       affectedCovid19={affectedCovid19}
    //       setAffectedCovid19={setAffectedCovid19}
    //       comorbidity={comorbidity}
    //     />
    //   ),
    // },
    // {
    //   key: '8',
    //   title: 'Confirmação do diagnóstico',
    //   description: 'Você obteve confirmação por diagnóstico?',
    //   form: (
    //     <CensusFormDiagnosticConfirmation
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       diagnosticConfirmation={diagnosticConfirmation}
    //       setDiagnosticConfirmation={setDiagnosticConfirmation}
    //     />
    //   ),
    // },
    // {
    //   key: '9',
    //   title: 'Intervalo de tempo',
    //   description: '',
    //   form: (
    //     <CensusFormDiagnosticConfirmationInterval
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       timeInterval={timeInterval}
    //       setTimeInterval={setTimeInterval}
    //     />
    //   ),
    // },
    // {
    //   key: '10',
    //   title: 'Método de diagnóstico',
    //   description: '',
    //   form: (
    //     <CensusFormDiagnosticConfirmationOptions
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       diagnosticMethod={diagnosticMethod}
    //       setDiagnosticMethod={setDiagnosticMethod}
    //     />
    //   ),
    // },
    // {
    //   key: '11',
    //   title: 'Local de tratamento',
    //   description: '',
    //   form: (
    //     <CensusFormTratamentPlace
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       setTreatmentPlace={setTreatmentPlace}
    //       treatmentPlace={treatmentPlace}
    //     />
    //   ),
    // },
    // {
    //   key: '12',
    //   title: 'Tratamento no hospital',
    //   description: '',
    //   form: (
    //     <CensusFormTratamentPlaceOptions
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       hospitalTreatment={hospitalTreatment}
    //       setHospitalTreatment={setHospitalTreatment}
    //     />
    //   ),
    // },
    // {
    //   key: '13',
    //   title: 'Sequelas da Covid-19',
    //   description: '',
    //   form: (
    //     <CensusFormCovidSequelae
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       covidSequelae={covidSequelae}
    //       treatmentPlace={treatmentPlace}
    //       setCovidSequelae={setCovidSequelae}
    //     />
    //   ),
    // },
    // {
    //   key: '14',
    //   title:
    //     'Mapeamento pos covid-19: campanha x consequências socio-econômicas.',
    //   description: 'Você está vacinado contra COVID-19?',
    //   form: (
    //     <CensusFormVaccinated
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       diagnosticConfirmation={diagnosticConfirmation}
    //       vaccinated={vaccinated}
    //       setVaccinated={setVaccinated}
    //       reasonNotToTake={reasonNotToTake}
    //       setReasonNotToTake={setReasonNotToTake}
    //       vaccineDoses={vaccineDoses}
    //       setVaccineDoses={setVaccineDoses}
    //     />
    //   ),
    // },
    // {
    //   key: '15',
    //   title: 'Você perdeu algum familiar por conta da COVID-19?',
    //   description: '',
    //   form: (
    //     <CensusFormLostFamilyMember
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       lostFamilyMember={lostFamilyMember}
    //       setLostFamilyMember={setLostFamilyMember}
    //     />
    //   ),
    // },
    // {
    //   key: '16',
    //   title: 'Você pegou COVID-19 após estar vacinado?',
    //   description: '',
    //   form: (
    //     <CensusFormAffectedCovidAfterVaccinated
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       affectedCovidAfterVaccinated={affectedCovidAfterVaccinated}
    //       setAffectedCovidAfterVaccinated={setAffectedCovidAfterVaccinated}
    //       rehabilitationSequelae={rehabilitationSequelae}
    //       setRehabilitationSequelae={setRehabilitationSequelae}
    //       treatmentRehabilitationSequelae={treatmentRehabilitationSequelae}
    //       setTreatmentRehabilitationSequelae={
    //         setTreatmentRehabilitationSequelae
    //       }
    //     />
    //   ),
    // },
    // {
    //   key: '17',
    //   title:
    //     'O que você acha das medidas de prevenção como distanciamento social, uso de máscara, álcool 70º,  etc?',
    //   description: '',
    //   form: (
    //     <CensusFormOpinionPreventionMeasures
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       opinionPreventionMeasures={opinionPreventionMeasures}
    //       setOpinionPreventionMeasures={setOpinionPreventionMeasures}
    //     />
    //   ),
    // },
    // {
    //   key: '18',
    //   title:
    //     'Como você obteve as informações sobre COVID-19 (prevenção e tratamento)?',
    //   description: '',
    //   form: (
    //     <CensusFormCovidInformation
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       covidInformation={covidInformation}
    //       setCovidInformation={setCovidInformation}
    //     />
    //   ),
    // },
    // {
    //   key: '19',
    //   title:
    //     'Durante a pandemia de COVID-19 sua família conseguiu manter a renda familiar?',
    //   description: '',
    //   form: (
    //     <CensusFormFamilyIncome
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       maintainedFamilyIncome={maintainedFamilyIncome}
    //       setMaintainedFamilyIncome={setMaintainedFamilyIncome}
    //       receivedSocialAssistance={receivedSocialAssistance}
    //       setReceivedSocialAssistance={setReceivedSocialAssistance}
    //       recoveredFamilyIncome={recoveredFamilyIncome}
    //       setRecoveredFamilyIncome={setRecoveredFamilyIncome}
    //       familyInDebt={familyInDebt}
    //       setFamilyInDebt={setFamilyInDebt}
    //     />
    //   ),
    // },
    // {
    //   key: '20',
    //   title: 'Resumo do questionário',
    //   description: '',
    //   form: (
    //     <CensusFormSummary
    //       handleNextForm={handleNextForm}
    //       handleBackForm={handleBackForm}
    //       name={name}
    //       cpf={cpf}
    //       email={email}
    //       age_group={ageGroup}
    //       gender={gender}
    //       city={city}
    //       street={street}
    //       district={district}
    //       number={number}
    //       region={region}
    //       zone={zone}
    //       schollLevel={schollLevel}
    //       religion={religion}
    //       comorbidity={comorbidity}
    //       diabetes={diabetes}
    //       heartProblem={heartProblem}
    //       kidneyDisease={kidneyDisease}
    //       thyroid={thyroid}
    //       obesity={obesity}
    //       otherComorbidity={otherComorbidity}
    //       affectedCovid19={affectedCovid19}
    //       diagnosticConfirmation={diagnosticConfirmation}
    //       timeInterval={timeInterval}
    //       diagnosticMethod={diagnosticMethod}
    //       treatmentPlace={treatmentPlace}
    //       hospitalTreatment={hospitalTreatment}
    //       covidSequelae={covidSequelae}
    //       vaccinated={vaccinated}
    //       vaccineDoses={vaccineDoses}
    //       reasonNotToTake={reasonNotToTake}
    //       lostFamilyMember={lostFamilyMember}
    //       affectedCovidAfterVaccinated={affectedCovidAfterVaccinated}
    //       rehabilitationSequelae={rehabilitationSequelae}
    //       treatmentRehabilitationSequelae={treatmentRehabilitationSequelae}
    //       opinionPreventionMeasures={opinionPreventionMeasures}
    //       covidInformation={covidInformation}
    //       maintainedFamilyIncome={maintainedFamilyIncome}
    //       receivedSocialAssistance={receivedSocialAssistance}
    //       recoveredFamilyIncome={recoveredFamilyIncome}
    //       familyInDebt={familyInDebt}
    //     />
    //   ),
    // },
  ];

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (isFinish) {
          return;
        }

        if (!isStated) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        if (!isFinish) {
          // Prevent default behavior of leaving the screen
          e.preventDefault();
          // Prompt the user before leaving the screen
          Alert.alert(
            'Descartar formulário?',
            'Se você voltar, os dados preenchidos serão perdidos. Deseja cancelar?',
            [
              { text: 'Não', style: 'cancel', onPress: () => {} },
              {
                text: 'Sim',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => navigation.dispatch(e.data.action),
              },
            ],
          );
        }
      }),
    [navigation, isStated, isFinish],
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        animated
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      <View style={styles.header}>
        <Text
          variant="titleLarge"
          style={[styles.title, { color: theme.colors.onPrimaryContainer }]}>
          {FORMS[activeStep].title}
        </Text>
        <Text
          variant="bodyLarge"
          style={[{ color: theme.colors.onPrimaryContainer }]}>
          {FORMS[activeStep].description}
        </Text>
      </View>
      {FORMS[activeStep].form}
      <View style={styles.stepWrapper}>
        <Button
          onPress={() => handleBack()}
          contentStyle={styles.button}
          disabled={activeStep === 0}
          mode="contained-tonal">
          Anterior
        </Button>
        {/* <ProgressBar progress={(activeStep + 1) / 10} /> */}
        <Text variant="titleLarge">
          {activeStep + 1} / {FORMS.length}
        </Text>
        <Button
          onPress={() => handleNext()}
          contentStyle={styles.button}
          mode="contained">
          {activeStep === FORMS.length - 1 ? 'Finalizar' : 'Próximo'}
        </Button>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    display: 'flex',
    flex: 1,
  },
  header: {
    marginTop: 5,
    width: '100%',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: '800',
    marginBottom: 8,
  },
  stepWrapper: {
    marginBottom: 16,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  indicator: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 30,
  },
  indicatorActiveForm: {
    fontSize: 16,
  },
  indicatorTotalForm: {
    fontSize: 16,
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: { height: 46 },
});
