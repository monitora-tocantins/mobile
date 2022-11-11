import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  Keyboard,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { FormIdentification } from './components/FormIdentification';
import { validateCpf, validateEmail } from '../../utils/mask';
import { AppScreensProps } from '../../routes/app.routes';
import { FormCover } from './components/FormCover';
import { FormMoreInformation } from './components/FormMoreInformation';
import { FormAddress } from './components/FormAddress';
import { FormSchool } from './components/FormSchool';
import { FormComorbidity } from './components/FormComorbidity';

const Form: React.FC = () => {
  const theme = useTheme();
  const [isFinish, setIsFinish] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  // estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState<string | undefined>(undefined);
  const [reasonNotCpf, setReasonNotCpf] = useState<string | undefined>(
    undefined,
  );
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [city, setCity] = useState('Cametá');
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [county, setCounty] = useState('');
  const [number, setNumber] = useState('');
  const [region, setRegion] = useState('Norte');
  const [zone, setZone] = useState('Urbana');
  const [uf, setUf] = useState('PA');
  const [zipcode, setZicode] = useState('68400000');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // novo formulário do censo 2022
  const [schollLevel, setSchoolLevel] = useState('');
  const [religion, setReligion] = useState('');
  const [comorbidity, setComorbidity] = useState<boolean | undefined>(
    undefined,
  );
  const [diabetes, setDiabetes] = useState<boolean>(false);
  const [heartProblem, setHeartProblem] = useState<boolean>(false);
  const [kidneyDisease, setKidneyDisease] = useState<boolean>(false);
  const [thyroid, setThyroid] = useState<boolean>(false);
  const [obesity, setObesity] = useState<boolean>(false);
  const [otherComorbidity, setOtherComorbidity] = useState<string>('');
  const [affectedCovid19, setAffectedCovid19] = useState<boolean | undefined>(
    undefined,
  );
  const [diagnosticConfirmation, setDiagnosticConfirmation] = useState<
    boolean | undefined
  >(undefined);
  const [timeInterval, setTimeInterval] = useState<string>('');
  const [diagnosticMethod, setDiagnosticMethod] = useState<string>('');
  const [treatmentPlace, setTreatmentPlace] = useState<string>('');
  const [hospitalTreatment, setHospitalTreatment] = useState<string>('');
  const [covidSequelae, setCovidSequelae] = useState<string>('');

  // news questions
  const [vaccinated, setVaccinated] = useState<boolean | undefined>(undefined);
  const [vaccineDoses, setVaccineDoses] = useState('');
  const [reasonNotToTake, setReasonNotToTake] = useState('');
  const [lostFamilyMember, setLostFamilyMember] = useState<boolean | undefined>(
    undefined,
  );
  const [affectedCovidAfterVaccinated, setAffectedCovidAfterVaccinated] =
    useState<boolean | undefined>(undefined);
  const [rehabilitationSequelae, setRehabilitationSequelae] = useState<
    boolean | undefined
  >(undefined);
  const [treatmentRehabilitationSequelae, setTreatmentRehabilitationSequelae] =
    useState('');
  const [opinionPreventionMeasures, setOpinionPreventionMeasures] =
    useState('');
  const [covidInformation, setCovidInformation] = useState('');
  const [maintainedFamilyIncome, setMaintainedFamilyIncome] = useState<
    boolean | undefined
  >(undefined);
  const [receivedSocialAssistance, setReceivedSocialAssistance] = useState<
    boolean | undefined
  >(undefined);
  const [recoveredFamilyIncome, setRecoveredFamilyIncome] = useState<
    boolean | undefined
  >(undefined);
  const [familyInDebt, setFamilyInDebt] = useState<boolean | undefined>(
    undefined,
  );
  const [nameError, setNameError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ageGroupError, setAgeGroupError] = useState<string>('');
  const [cityError, setCityError] = useState<string>('');
  const [streetError, setStreetError] = useState<string>('');
  const [schoolLevelError, setSchoolLevelError] = useState<string>('');
  const [religionError, setReligionError] = useState<string>('');
  const [toggleCheckBoxCpf, setToggleCheckBoxCpf] = useState(false);

  const navigation = useNavigation<AppScreensProps>();

  const validadeFormIdentification = () => {
    Keyboard.dismiss();
    setNameError('');
    setCpfError('');
    setEmailError('');

    if (name === '') {
      setNameError('O nome é obrigatório');
      return false;
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
  const validadeMoreInformation = () => {
    Keyboard.dismiss();
    setAgeGroupError('');

    if (ageGroup === '') {
      setAgeGroupError('Faixa de idade é obrigatório');
      return false;
    }

    return true;
  };

  const validadeAddress = () => {
    Keyboard.dismiss();
    setCityError('');
    setStreetError('');

    if (city === '') {
      setCityError('Cidade é obrigatório');
      return false;
    }

    if (street === '') {
      setStreetError('Endereço/rua/avenida é obrigatório');
      return false;
    }

    return true;
  };

  const validadeSchool = () => {
    Keyboard.dismiss();

    if (schollLevel === '') {
      setSchoolLevelError('Nível escolar é obrigatório');
      return false;
    }

    if (religion === '') {
      setReligionError('Denominação religiosa é obrigatório');
      return false;
    }

    return true;
  };

  const validadeComorbidity = () => {
    Keyboard.dismiss();

    if (comorbidity === undefined) {
      ToastAndroid.show('Você precisa selecionar uma opção', ToastAndroid.LONG);
      return false;
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

    // finalizar questionário
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
    if (activeStep === 1) {
      if (validadeMoreInformation()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    if (activeStep === 2) {
      if (validadeAddress()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    if (activeStep === 3) {
      if (validadeSchool()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    if (activeStep === 4) {
      if (validadeComorbidity()) {
        if (comorbidity === true) {
          setActiveStep(prevActiveStep => prevActiveStep + 1);
          setSkipped(newSkipped);
        } else if (comorbidity === false) {
          handleStep(6);
        }
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleSubmit = () => {
    console.log('Submit');
  };

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
    {
      key: '2',
      title: 'Informações complementares',
      description: 'Para continuar, complete suas informações',
      form: (
        <FormMoreInformation
          ageGroup={ageGroup}
          gender={gender}
          setAgeGroup={setAgeGroup}
          setGender={setGender}
          ageGroupError={ageGroupError}
        />
      ),
    },
    {
      key: '3',
      title: 'Endereço',
      description: 'Seu endereço não será utilizado publicamente',
      form: (
        <FormAddress
          city={city}
          setCity={setCity}
          street={street}
          setStreet={setStreet}
          district={district}
          setDistrict={setDistrict}
          county={county}
          setCounty={setCounty}
          number={number}
          setNumber={setNumber}
          setZone={setZone}
          zone={zone}
          cityError={cityError}
          streetError={streetError}
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      ),
    },
    {
      key: '4',
      title: 'Qual o nível escolar?',
      description: '',
      form: (
        <FormSchool
          schollLevel={schollLevel}
          setSchoolLevel={setSchoolLevel}
          religion={religion}
          setReligion={setReligion}
          religionError={religionError}
          schollError={schoolLevelError}
        />
      ),
    },
    {
      key: '5',
      title: 'Mapeamento pós covid-19: contágio e sequelas',
      description: 'Possui pelo menos uma comorbidade?',
      form: (
        <FormComorbidity
          comorbidity={comorbidity}
          setComorbidity={setComorbidity}
        />
      ),
    },
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

        if (!isStarted) {
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
    [navigation, isStarted, isFinish],
  );

  if (!isStarted) {
    return <FormCover onPress={() => setIsStarted(true)} />;
  }

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
