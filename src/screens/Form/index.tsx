import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  Dimensions,
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
import { FormComorbidityOptions } from './components/FormComorbidityOptions';
import { FormContactCovid } from './components/FormContactCovid';
import { FormDiagnosticConfirmation } from './components/FormDiagnosticConfirmation';
import { FormDiagnosticConfirmationInterval } from './components/FormDiagnosticConfirmationInterval';
import { FormTratamentPlace } from './components/FormTratamentPlace';
import { FormTratamentPlaceOptions } from './components/FormTratamentPlaceOptions';
import { FormCovidSequelae } from './components/FormCovidSequelae';
import { FormVaccinated } from './components/FormVaccinated';
import { FormLostFamilyMember } from './components/FormLostFamilyMember';
import { FormAffectedCovidAfterVaccinated } from './components/FormAffectedCovidAfterVaccinated';
import { FormOpinionPreventionMeasures } from './components/FormOpinionPreventionMeasures';
import { FormCovidInformation } from './components/FormCovidInformation';
import { FormFamilyIncome } from './components/FormFamilyIncome';
import { FormSummary } from './components/FormSummary';
import { useFormStorage } from '../../contexts/FormStorage';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { showMessage } from 'react-native-flash-message';
import { Modalize } from 'react-native-modalize';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Form: React.FC = () => {
  const theme = useTheme();
  const { isConnected, user } = useAuth();
  const { saveForm, storage, updateForm } = useFormStorage();
  const { height: initialHeight } = Dimensions.get('window');
  const [height, setHeight] = useState(initialHeight);

  const [isSubmiting, setIsSubmiting] = useState(false);

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
  const [timeIntervalError, setTimeIntervalError] = useState<string>('');
  const [diagnosticMethodError, setDiagnosticMethodError] =
    useState<string>('');
  const [treatmentPlaceError, setTreatmentPlaceError] = useState<string>('');
  const [hospitalTreatmentError, setHospitalTreatmentError] =
    useState<string>('');
  const [covidSequelaeError, setCovidSequelaeError] = useState<string>('');
  const [comorbidityOptionsNone, setComorbidityOptionsNone] = useState(false);
  const [otherComorbidityError, setOtherComorbidityError] = useState('');
  const [toggleCheckBoxCpf, setToggleCheckBoxCpf] = useState(false);
  const [covidSequelaeNone, setCovidSequelaeNone] = useState(false);
  const [otherCovidSequelae, setOtherCovidSequelae] = useState('');
  const [otherCovidSequelaeError, setOtherCovidSequelaeError] = useState('');
  const [reasonNotToTakeError, setReasonNotToTakeError] = useState('');
  const [vaccineDosesError, setVaccineDosesError] = useState<string>('');
  const [vaccinetedError, setVaccinetedError] = useState<string>('');
  const [lostFamilyMemberError, setLostFamilyMemberError] =
    useState<string>('');
  const [opinionPreventionMeasuresError, setOpinionPreventionMeasuresError] =
    useState<string>('');
  const [covidInformationError, setCovidInformationError] =
    useState<string>('');

  const [maintainedFamilyIncomeError, setMaintainedFamilyIncomeError] =
    useState<string>('');
  const [receivedSocialAssistanceError, setReceivedSocialAssistanceError] =
    useState<string>('');
  const [recoveredFamilyIncomeError, setRecoveredFamilyIncomeError] =
    useState<string>('');
  const [familyInDebtError, setFamilyInDebtError] = useState<string>('');

  const [
    affectedCovidAfterVaccinatedError,
    setAffectedCovidAfterVaccinatedError,
  ] = useState<string>('');

  const navigation = useNavigation<AppScreensProps>();
  const [rehabilitationSequelaeError, setRehabilitationSequelaeError] =
    useState<string>('');

  const [
    treatmentRehabilitationSequelaeError,
    setTreatmentRehabilitationSequelaeError,
  ] = useState<string>('');

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

  const validadeComorbidityOptions = () => {
    Keyboard.dismiss();

    if (
      !diabetes &&
      !heartProblem &&
      !kidneyDisease &&
      !thyroid &&
      !obesity &&
      !comorbidityOptionsNone
    ) {
      ToastAndroid.show('Você precisa selecionar uma opção', ToastAndroid.LONG);
      return false;
    }

    if (comorbidityOptionsNone && otherComorbidity === '') {
      setOtherComorbidityError('Informe as outras comorbidades');
      return false;
    }

    return true;
  };

  const validadeContactCovid = () => {
    Keyboard.dismiss();

    if (affectedCovid19 === undefined) {
      ToastAndroid.show('Você precisa selecionar uma opção', ToastAndroid.LONG);
      return false;
    }

    return true;
  };

  const validadeDiagnosticConfirmation = () => {
    Keyboard.dismiss();

    if (diagnosticConfirmation === undefined) {
      ToastAndroid.show('Você precisa selecionar uma opção', ToastAndroid.LONG);
      return false;
    }

    return true;
  };

  const validadeDiagnosticConfirmationInterval = () => {
    Keyboard.dismiss();
    setTimeIntervalError('');
    setDiagnosticMethodError('');

    if (timeInterval === '') {
      setTimeIntervalError('Intervalo de tempo é obrigatório');
      return false;
    }

    if (diagnosticMethod === '') {
      setDiagnosticMethodError('Método de diagnóstico é obrigatório');
      return false;
    }

    return true;
  };

  const validadeTratamentPlace = () => {
    Keyboard.dismiss();

    if (treatmentPlace === '') {
      setTreatmentPlaceError('Local de tratamento é obrigatório');
      return false;
    }

    return true;
  };

  const validadeHospitalTreatment = () => {
    Keyboard.dismiss();

    if (hospitalTreatment === '') {
      setHospitalTreatmentError('Campo obrigatório! Escolha uma opção');
      return false;
    }

    return true;
  };

  const validadeCovidSequelae = () => {
    Keyboard.dismiss();

    if (covidSequelae === '') {
      setCovidSequelaeError('Campo obrigatório! Escolha uma opção');
      return false;
    }
    if (covidSequelaeNone) {
      if (otherCovidSequelae === '') {
        setOtherCovidSequelaeError('É preciso descrever as outras sequelas!');
        return false;
      }
    }

    return true;
  };

  const validadeVaccinated = () => {
    Keyboard.dismiss();

    if (vaccinated === undefined) {
      setVaccinetedError('Você precisa selecionar uma opção.');
      return false;
    }
    if (vaccinated === true && vaccineDoses === '') {
      setVaccineDosesError('É preciso escolher uma opção.');
      return false;
    }
    if (vaccinated === false && reasonNotToTake === '') {
      setReasonNotToTakeError('É preciso escolher uma opção.');
      return false;
    }

    return true;
  };

  const validadeLostFamilyMember = () => {
    Keyboard.dismiss();

    if (lostFamilyMember === undefined) {
      setLostFamilyMemberError('Você precisa escolher uma opção.');
      return false;
    }
    return true;
  };

  const validadeAffectedCovidAfterVaccinated = () => {
    Keyboard.dismiss();

    if (affectedCovidAfterVaccinated === undefined) {
      setAffectedCovidAfterVaccinatedError(
        'Você precisa selecionar uma opção.',
      );
      return false;
    }
    if (
      (affectedCovidAfterVaccinated === true ||
        affectedCovidAfterVaccinated === false) &&
      rehabilitationSequelae === undefined
    ) {
      setRehabilitationSequelaeError('É preciso escolher uma opção.');
      return false;
    }
    if (
      (affectedCovidAfterVaccinated === true ||
        affectedCovidAfterVaccinated === false) &&
      rehabilitationSequelae === true &&
      treatmentRehabilitationSequelae === ''
    ) {
      setTreatmentRehabilitationSequelaeError(
        'É preciso descrever os tratamentos feitos.',
      );
      return false;
    }

    return true;
  };

  const validadeOpinionPreventionMeasures = () => {
    Keyboard.dismiss();

    if (opinionPreventionMeasures === '') {
      setOpinionPreventionMeasuresError('Você precisa escolher uma opção.');
      return false;
    }
    return true;
  };

  const validadeCovidInformation = () => {
    Keyboard.dismiss();

    if (covidInformation === '') {
      setCovidInformationError('Você precisa escolher uma opção.');
      return false;
    }
    return true;
  };

  const validadeFamilyIncome = () => {
    Keyboard.dismiss();

    if (maintainedFamilyIncome === undefined) {
      setMaintainedFamilyIncomeError('Você precisa selecionar uma opção.');
      return false;
    }
    if (receivedSocialAssistance === undefined) {
      setReceivedSocialAssistanceError('Você precisa selecionar uma opção.');
      return false;
    }

    if (recoveredFamilyIncome === undefined) {
      setRecoveredFamilyIncomeError('Você precisa selecionar uma opção.');
      return false;
    }

    if (familyInDebt === undefined) {
      setFamilyInDebtError('Você precisa selecionar uma opção.');
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
          setSkipped(newSkipped);
          setDiabetes(false);
          setKidneyDisease(false);
          setHeartProblem(false);
          setObesity(false);
          setThyroid(false);
          setComorbidityOptionsNone(false);
          setOtherComorbidity('');
          setActiveStep(prevActiveStep => prevActiveStep + 2);
        }
      }
    }
    if (activeStep === 5) {
      if (validadeComorbidityOptions()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    if (activeStep === 6) {
      if (validadeContactCovid()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    if (activeStep === 7) {
      if (validadeDiagnosticConfirmation()) {
        if (diagnosticConfirmation === true) {
          setActiveStep(prevActiveStep => prevActiveStep + 1);
          setSkipped(newSkipped);
        } else {
          setTimeInterval('');
          setDiagnosticMethod('');
          setTreatmentPlace('');
          setHospitalTreatment('');
          setOtherCovidSequelae('');
          setCovidSequelae('');
          setCovidSequelaeNone(false);
          setSkipped(newSkipped);
          setActiveStep(12);
        }
      }
    }
    if (activeStep === 8) {
      if (validadeDiagnosticConfirmationInterval()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    if (activeStep === 9) {
      if (validadeTratamentPlace()) {
        if (treatmentPlace === 'Casa') {
          setActiveStep(11);
          setSkipped(newSkipped);
        } else {
          setActiveStep(prevActiveStep => prevActiveStep + 1);
          setSkipped(newSkipped);
        }
      }
    }
    if (activeStep === 10) {
      if (validadeHospitalTreatment()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }

    if (activeStep === 11) {
      if (validadeCovidSequelae()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    if (activeStep === 12) {
      if (validadeVaccinated()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }

    if (activeStep === 13) {
      if (validadeLostFamilyMember()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }

    if (activeStep === 14) {
      if (validadeAffectedCovidAfterVaccinated()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }

    if (activeStep === 15) {
      if (validadeOpinionPreventionMeasures()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }

    if (activeStep === 16) {
      if (validadeCovidInformation()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }

    if (activeStep === 17) {
      if (validadeFamilyIncome()) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
  };

  const handleBack = () => {
    if (activeStep === 6) {
      if (comorbidity === true) {
        return setActiveStep(prevActiveStep => prevActiveStep - 1);
      }
      return setActiveStep(prevActiveStep => prevActiveStep - 2);
    }

    if (activeStep === 12) {
      if (diagnosticConfirmation === true) {
        return setActiveStep(prevActiveStep => prevActiveStep - 1);
      }
      return setActiveStep(prevActiveStep => prevActiveStep - 5);
    }

    if (activeStep === 11) {
      if (treatmentPlace !== 'Casa') {
        return setActiveStep(prevActiveStep => prevActiveStep - 1);
      }
      return setActiveStep(prevActiveStep => prevActiveStep - 2);
    }
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmiting(true);

    if (isConnected === true) {
      try {
        await api.post(
          '/user/forms',
          {
            user: {
              name,
              gender,
              cpf,
              type: 2,
              email,
            },
            address: {
              city,
              street,
              number,
              district,
              zipcode,
              region,
              uf,
              zone,
              latitude,
              longitude,
            },
            form: {
              age_group: ageGroup,
              reason_not_cpf: reasonNotCpf,
              school_level: schollLevel,
              religion,
              comorbidity,
              diabetes,
              heart_problem: heartProblem,
              kidney_disease: kidneyDisease,
              thyroid,
              obesity,
              other_comorbidity: otherComorbidity,
              affected_covid_19: affectedCovid19,
              diagnostic_confirmation: diagnosticConfirmation,
              time_interval: timeInterval,
              diagnostic_method: diagnosticMethod,
              treatment_place: treatmentPlace,
              hospital_treatment: hospitalTreatment,
              covid_sequelae: covidSequelae,
              vaccinated,
              vaccine_doses: vaccineDoses,
              reason_not_to_take: reasonNotToTake,
              lost_family_member: lostFamilyMember,
              affected_covid_after_vaccinated: affectedCovidAfterVaccinated,
              rehabilitation_sequelae: rehabilitationSequelae,
              treatment_rehabilitation_sequelae:
                treatmentRehabilitationSequelae,
              opinion_prevention_measures: opinionPreventionMeasures,
              covid_information: covidInformation,
              maintained_family_income: maintainedFamilyIncome,
              received_social_assistance: receivedSocialAssistance,
              recovered_family_income: recoveredFamilyIncome,
              family_in_debt: familyInDebt,
            },
          },
          {
            timeout: 10000, // 10 segundos
          },
        );

        if (cpf) {
          const formAlreadyExists = storage.find(item => item.cpf === cpf);
          if (formAlreadyExists !== undefined) {
            await updateForm({
              _id: formAlreadyExists._id,
              uid: user.id,
              name,
              cpf,
              reason_not_cpf: reasonNotCpf,
              email,
              age_group: ageGroup,
              gender,
              city,
              street,
              district,
              number,
              region,
              zone,
              uf,
              zipcode,
              latitude,
              longitude,
              schollLevel,
              religion,
              comorbidity,
              diabetes,
              heartProblem,
              kidneyDisease,
              thyroid,
              obesity,
              otherComorbidity,
              affectedCovid19,
              diagnosticConfirmation,
              timeInterval,
              diagnosticMethod,
              treatmentPlace,
              hospitalTreatment,
              covidSequelae,
              vaccinated,
              vaccineDoses,
              reasonNotToTake,
              lostFamilyMember,
              affectedCovidAfterVaccinated,
              rehabilitationSequelae,
              treatmentRehabilitationSequelae,
              opinionPreventionMeasures,
              covidInformation,
              maintainedFamilyIncome,
              receivedSocialAssistance,
              recoveredFamilyIncome,
              familyInDebt,
              status: 'complete',
              created_at: formAlreadyExists.created_at,
              updated_at: new Date(),
            });
            showMessage({
              message: 'IoT Imuniza - Censo 2022',
              description: 'O formulário foi atualizado com sucesso',
              type: 'success',
              animated: true,
              position: 'top',
              floating: true,
            });
            setIsSubmiting(false);
            setIsFinish(true);
            onOpen();
          } else {
            await saveForm({
              uid: user.id,
              name,
              cpf,
              email,
              reason_not_cpf: reasonNotCpf,
              age_group: ageGroup,
              gender,
              city,
              street,
              district,
              number,
              region,
              zone,
              uf,
              zipcode,
              latitude,
              longitude,
              schollLevel,
              religion,
              comorbidity,
              diabetes,
              heartProblem,
              kidneyDisease,
              thyroid,
              obesity,
              otherComorbidity,
              affectedCovid19,
              diagnosticConfirmation,
              timeInterval,
              diagnosticMethod,
              treatmentPlace,
              hospitalTreatment,
              covidSequelae,
              vaccinated,
              vaccineDoses,
              reasonNotToTake,
              lostFamilyMember,
              affectedCovidAfterVaccinated,
              rehabilitationSequelae,
              treatmentRehabilitationSequelae,
              opinionPreventionMeasures,
              covidInformation,
              maintainedFamilyIncome,
              receivedSocialAssistance,
              recoveredFamilyIncome,
              familyInDebt,
              status: 'complete',
              created_at: new Date(),
              updated_at: new Date(),
            });

            showMessage({
              message: 'IoT Imuniza - Censo 2022',
              description: 'O formulário foi cadastrado com sucesso',
              type: 'success',
              animated: true,
              position: 'top',
              floating: true,
            });
            setIsSubmiting(false);
            setIsFinish(true);
            onOpen();
          }
        } else {
          await saveForm({
            uid: user.id,
            name,
            cpf,
            email,
            reason_not_cpf: reasonNotCpf,
            age_group: ageGroup,
            gender,
            city,
            street,
            district,
            number,
            region,
            zone,
            uf,
            zipcode,
            latitude,
            longitude,
            schollLevel,
            religion,
            comorbidity,
            diabetes,
            heartProblem,
            kidneyDisease,
            thyroid,
            obesity,
            otherComorbidity,
            affectedCovid19,
            diagnosticConfirmation,
            timeInterval,
            diagnosticMethod,
            treatmentPlace,
            hospitalTreatment,
            covidSequelae,
            vaccinated,
            vaccineDoses,
            reasonNotToTake,
            lostFamilyMember,
            affectedCovidAfterVaccinated,
            rehabilitationSequelae,
            treatmentRehabilitationSequelae,
            opinionPreventionMeasures,
            covidInformation,
            maintainedFamilyIncome,
            receivedSocialAssistance,
            recoveredFamilyIncome,
            familyInDebt,
            status: 'complete',
            created_at: new Date(),
            updated_at: new Date(),
          });

          showMessage({
            message: 'IoT Imuniza - Censo 2022',
            description: 'O formulário foi cadastrado com sucesso',
            type: 'success',
            animated: true,
            position: 'top',
            floating: true,
          });
          setIsSubmiting(false);
          setIsFinish(true);
          onOpen();
        }
      } catch (error: any) {
        if (cpf) {
          const formAlreadyExists = storage.find(item => item.cpf === cpf);
          if (formAlreadyExists !== undefined) {
            await updateForm({
              _id: formAlreadyExists._id,
              uid: user.id,
              name,
              cpf,
              reason_not_cpf: reasonNotCpf,
              email,
              age_group: ageGroup,
              gender,
              city,
              street,
              district,
              number,
              region,
              zone,
              uf,
              zipcode,
              latitude,
              longitude,
              schollLevel,
              religion,
              comorbidity,
              diabetes,
              heartProblem,
              kidneyDisease,
              thyroid,
              obesity,
              otherComorbidity,
              affectedCovid19,
              diagnosticConfirmation,
              timeInterval,
              diagnosticMethod,
              treatmentPlace,
              hospitalTreatment,
              covidSequelae,
              vaccinated,
              vaccineDoses,
              reasonNotToTake,
              lostFamilyMember,
              affectedCovidAfterVaccinated,
              rehabilitationSequelae,
              treatmentRehabilitationSequelae,
              opinionPreventionMeasures,
              covidInformation,
              maintainedFamilyIncome,
              receivedSocialAssistance,
              recoveredFamilyIncome,
              familyInDebt,
              status: 'pending',
              created_at: formAlreadyExists.created_at,
              updated_at: new Date(),
            });
            showMessage({
              message: 'IoT Imuniza - Censo 2022',
              description: 'O formulário foi salvo no dispositivo',
              type: 'info',
              animated: true,
              position: 'top',
              floating: true,
            });
            setIsSubmiting(false);
            setIsFinish(true);
            onOpen();
          } else {
            await saveForm({
              uid: user.id,
              name,
              cpf,
              email,
              reason_not_cpf: reasonNotCpf,
              age_group: ageGroup,
              gender,
              city,
              street,
              district,
              number,
              region,
              zone,
              uf,
              zipcode,
              latitude,
              longitude,
              schollLevel,
              religion,
              comorbidity,
              diabetes,
              heartProblem,
              kidneyDisease,
              thyroid,
              obesity,
              otherComorbidity,
              affectedCovid19,
              diagnosticConfirmation,
              timeInterval,
              diagnosticMethod,
              treatmentPlace,
              hospitalTreatment,
              covidSequelae,
              vaccinated,
              vaccineDoses,
              reasonNotToTake,
              lostFamilyMember,
              affectedCovidAfterVaccinated,
              rehabilitationSequelae,
              treatmentRehabilitationSequelae,
              opinionPreventionMeasures,
              covidInformation,
              maintainedFamilyIncome,
              receivedSocialAssistance,
              recoveredFamilyIncome,
              familyInDebt,
              status: 'pending',
              created_at: new Date(),
              updated_at: new Date(),
            });
            showMessage({
              message: 'IoT Imuniza - Censo 2022',
              description: 'O formulário foi salvo no dispositivo',
              type: 'info',
              animated: true,
              position: 'top',
              floating: true,
            });
            setIsSubmiting(false);
            setIsFinish(true);
            onOpen();
          }
        } else {
          await saveForm({
            uid: user.id,
            name,
            cpf,
            email,
            reason_not_cpf: reasonNotCpf,
            age_group: ageGroup,
            gender,
            city,
            street,
            district,
            number,
            region,
            zone,
            uf,
            zipcode,
            latitude,
            longitude,
            schollLevel,
            religion,
            comorbidity,
            diabetes,
            heartProblem,
            kidneyDisease,
            thyroid,
            obesity,
            otherComorbidity,
            affectedCovid19,
            diagnosticConfirmation,
            timeInterval,
            diagnosticMethod,
            treatmentPlace,
            hospitalTreatment,
            covidSequelae,
            vaccinated,
            vaccineDoses,
            reasonNotToTake,
            lostFamilyMember,
            affectedCovidAfterVaccinated,
            rehabilitationSequelae,
            treatmentRehabilitationSequelae,
            opinionPreventionMeasures,
            covidInformation,
            maintainedFamilyIncome,
            receivedSocialAssistance,
            recoveredFamilyIncome,
            familyInDebt,
            status: 'pending',
            created_at: new Date(),
            updated_at: new Date(),
          });
          showMessage({
            message: 'IoT Imuniza - Censo 2022',
            description: 'O formulário foi salvo no dispositivo',
            type: 'info',
            animated: true,
            position: 'top',
            floating: true,
          });
          setIsSubmiting(false);
          setIsFinish(true);
          onOpen();
        }
      }
    } else {
      try {
        // salvar o formulário offline
        if (cpf) {
          const formAlreadyExists = storage.find(item => item.cpf === cpf);
          if (formAlreadyExists !== undefined) {
            await updateForm({
              _id: formAlreadyExists._id,
              uid: user.id,
              name,
              cpf,
              reason_not_cpf: reasonNotCpf,
              email,
              age_group: ageGroup,
              gender,
              city,
              street,
              district,
              number,
              region,
              zone,
              uf,
              zipcode,
              latitude,
              longitude,
              schollLevel,
              religion,
              comorbidity,
              diabetes,
              heartProblem,
              kidneyDisease,
              thyroid,
              obesity,
              otherComorbidity,
              affectedCovid19,
              diagnosticConfirmation,
              timeInterval,
              diagnosticMethod,
              treatmentPlace,
              hospitalTreatment,
              covidSequelae,
              vaccinated,
              vaccineDoses,
              reasonNotToTake,
              lostFamilyMember,
              affectedCovidAfterVaccinated,
              rehabilitationSequelae,
              treatmentRehabilitationSequelae,
              opinionPreventionMeasures,
              covidInformation,
              maintainedFamilyIncome,
              receivedSocialAssistance,
              recoveredFamilyIncome,
              familyInDebt,
              status: 'pending',
              created_at: formAlreadyExists.created_at,
              updated_at: new Date(),
            });

            showMessage({
              message: 'IoT Imuniza - Censo 2022',
              description: 'O formulário foi salvo no dispositivo',
              type: 'info',
              animated: true,
              position: 'top',
              floating: true,
            });
            setIsSubmiting(false);
            setIsFinish(true);
            onOpen();
          } else {
            await saveForm({
              uid: user.id,
              name,
              cpf,
              email,
              reason_not_cpf: reasonNotCpf,
              age_group: ageGroup,
              gender,
              city,
              street,
              district,
              number,
              region,
              zone,
              uf,
              zipcode,
              latitude,
              longitude,
              schollLevel,
              religion,
              comorbidity,
              diabetes,
              heartProblem,
              kidneyDisease,
              thyroid,
              obesity,
              otherComorbidity,
              affectedCovid19,
              diagnosticConfirmation,
              timeInterval,
              diagnosticMethod,
              treatmentPlace,
              hospitalTreatment,
              covidSequelae,
              vaccinated,
              vaccineDoses,
              reasonNotToTake,
              lostFamilyMember,
              affectedCovidAfterVaccinated,
              rehabilitationSequelae,
              treatmentRehabilitationSequelae,
              opinionPreventionMeasures,
              covidInformation,
              maintainedFamilyIncome,
              receivedSocialAssistance,
              recoveredFamilyIncome,
              familyInDebt,
              status: 'pending',
              created_at: new Date(),
              updated_at: new Date(),
            });

            showMessage({
              message: 'IoT Imuniza - Censo 2022',
              description: 'O formulário foi salvo no dispositivo',
              type: 'info',
              animated: true,
              position: 'top',
              floating: true,
            });
            setIsSubmiting(false);
            setIsFinish(true);
            onOpen();
          }
        } else {
          await saveForm({
            uid: user.id,
            name,
            cpf,
            email,
            reason_not_cpf: reasonNotCpf,
            age_group: ageGroup,
            gender,
            city,
            street,
            district,
            number,
            region,
            zone,
            uf,
            zipcode,
            latitude,
            longitude,
            schollLevel,
            religion,
            comorbidity,
            diabetes,
            heartProblem,
            kidneyDisease,
            thyroid,
            obesity,
            otherComorbidity,
            affectedCovid19,
            diagnosticConfirmation,
            timeInterval,
            diagnosticMethod,
            treatmentPlace,
            hospitalTreatment,
            covidSequelae,
            vaccinated,
            vaccineDoses,
            reasonNotToTake,
            lostFamilyMember,
            affectedCovidAfterVaccinated,
            rehabilitationSequelae,
            treatmentRehabilitationSequelae,
            opinionPreventionMeasures,
            covidInformation,
            maintainedFamilyIncome,
            receivedSocialAssistance,
            recoveredFamilyIncome,
            familyInDebt,
            status: 'pending',
            created_at: new Date(),
            updated_at: new Date(),
          });

          showMessage({
            message: 'IoT Imuniza - Censo 2022',
            description: 'O formulário foi salvo no dispositivo',
            type: 'info',
            animated: true,
            position: 'top',
            floating: true,
          });
          setIsSubmiting(false);
          setIsFinish(true);
          onOpen();
        }
      } catch (error: any) {
        if (error.response) {
          showMessage({
            message: 'IoT Imuniza - Censo 2022',
            description: error.response.data.error.message,
            type: 'danger',
            animated: true,
            position: 'top',
            floating: true,
          });
        }
        setIsSubmiting(false);
      }
    }
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
    {
      key: '6',
      title: 'Comorbidade',
      description: 'Quais comorbidades você possui?',
      form: (
        <FormComorbidityOptions
          diabetes={diabetes}
          setDiabetes={setDiabetes}
          heartProblem={heartProblem}
          setHeartProblem={setHeartProblem}
          kidneyDisease={kidneyDisease}
          setKidneyDisease={setKidneyDisease}
          thyroid={thyroid}
          setThyroid={setThyroid}
          obesity={obesity}
          setObesity={setObesity}
          otherComorbidity={otherComorbidity}
          setOtherComorbidity={setOtherComorbidity}
          comorbidityOptionsNone={comorbidityOptionsNone}
          setComorbidityOptionsNone={setComorbidityOptionsNone}
          otherComorbidityError={otherComorbidityError}
          setOtherComorbidityError={setOtherComorbidityError}
        />
      ),
    },
    {
      key: '7',
      title: 'Contato com o Covid-19',
      description: 'Você foi acometido pela COVID-19 nos últimos anos?',
      form: (
        <FormContactCovid
          affectedCovid19={affectedCovid19}
          setAffectedCovid19={setAffectedCovid19}
        />
      ),
    },
    {
      key: '8',
      title: 'Confirmação do diagnóstico',
      description: 'Você obteve confirmação por diagnóstico?',
      form: (
        <FormDiagnosticConfirmation
          diagnosticConfirmation={diagnosticConfirmation}
          setDiagnosticConfirmation={setDiagnosticConfirmation}
        />
      ),
    },
    {
      key: '9',
      title: 'Confirmação do diagnóstico',
      description: 'Intervalo de tempo do dignóstico',
      form: (
        <FormDiagnosticConfirmationInterval
          timeInterval={timeInterval}
          setTimeInterval={setTimeInterval}
          diagnosticMethod={diagnosticMethod}
          diagnosticMethodError={diagnosticMethodError}
          setDiagnosticMethod={setDiagnosticMethod}
          timeIntervalError={timeIntervalError}
        />
      ),
    },
    {
      key: '10',
      title: 'Local de tratamento',
      description: '',
      form: (
        <FormTratamentPlace
          setTreatmentPlace={setTreatmentPlace}
          treatmentPlace={treatmentPlace}
          treatmentPlaceError={treatmentPlaceError}
        />
      ),
    },
    {
      key: '11',
      title: 'Tratamento no hospital',
      description: '',
      form: (
        <FormTratamentPlaceOptions
          hospitalTreatment={hospitalTreatment}
          hospitalTreatmentError={hospitalTreatmentError}
          setHospitalTreatment={setHospitalTreatment}
        />
      ),
    },
    {
      key: '12',
      title: 'Sequelas da Covid-19',
      description: '',
      form: (
        <FormCovidSequelae
          covidSequelae={covidSequelae}
          treatmentPlace={treatmentPlace}
          covidSequelaeNone={covidSequelaeNone}
          setOtherCovidSequelae={setOtherCovidSequelae}
          otherCovidSequelae={otherCovidSequelae}
          setCovidSequelaeNone={setCovidSequelaeNone}
          covidSequelaeError={covidSequelaeError}
          setOtherCovidSequelaeError={setOtherCovidSequelaeError}
          otherCovidSequelaeError={otherCovidSequelaeError}
          setCovidSequelae={setCovidSequelae}
        />
      ),
    },
    {
      key: '13',
      title:
        'Mapeamento pos covid-19: campanha x consequências socio-econômicas.',
      description: 'Você está vacinado contra COVID-19?',
      form: (
        <FormVaccinated
          diagnosticConfirmation={diagnosticConfirmation}
          vaccinated={vaccinated}
          setVaccinetedError={setVaccinetedError}
          vaccinetedError={vaccinetedError}
          setVaccinated={setVaccinated}
          reasonNotToTake={reasonNotToTake}
          reasonNotToTakeError={reasonNotToTakeError}
          setReasonNotToTakeError={setReasonNotToTakeError}
          setReasonNotToTake={setReasonNotToTake}
          vaccineDoses={vaccineDoses}
          setVaccineDoses={setVaccineDoses}
          setVaccineDosesError={setVaccineDosesError}
          vaccineDosesError={vaccineDosesError}
        />
      ),
    },
    {
      key: '14',
      title: 'Você perdeu algum familiar por conta da COVID-19?',
      description: '',
      form: (
        <FormLostFamilyMember
          setLostFamilyMemberError={setLostFamilyMemberError}
          lostFamilyMemberError={lostFamilyMemberError}
          lostFamilyMember={lostFamilyMember}
          setLostFamilyMember={setLostFamilyMember}
        />
      ),
    },
    {
      key: '15',
      title: 'Você pegou COVID-19 após estar vacinado?',
      description: '',
      form: (
        <FormAffectedCovidAfterVaccinated
          setAffectedCovidAfterVaccinatedError={
            setAffectedCovidAfterVaccinatedError
          }
          affectedCovidAfterVaccinatedError={affectedCovidAfterVaccinatedError}
          affectedCovidAfterVaccinated={affectedCovidAfterVaccinated}
          treatmentRehabilitationSequelaeError={
            treatmentRehabilitationSequelaeError
          }
          setTreatmentRehabilitationSequelaeError={
            setTreatmentRehabilitationSequelaeError
          }
          setAffectedCovidAfterVaccinated={setAffectedCovidAfterVaccinated}
          rehabilitationSequelae={rehabilitationSequelae}
          setRehabilitationSequelae={setRehabilitationSequelae}
          rehabilitationSequelaeError={rehabilitationSequelaeError}
          setRehabilitationSequelaeError={setRehabilitationSequelaeError}
          treatmentRehabilitationSequelae={treatmentRehabilitationSequelae}
          setTreatmentRehabilitationSequelae={
            setTreatmentRehabilitationSequelae
          }
        />
      ),
    },
    {
      key: '16',
      title:
        'O que você acha das medidas de prevenção como distanciamento social, uso de máscara, álcool 70º,  etc?',
      description: '',
      form: (
        <FormOpinionPreventionMeasures
          setOpinionPreventionMeasuresError={setOpinionPreventionMeasuresError}
          opinionPreventionMeasuresError={opinionPreventionMeasuresError}
          opinionPreventionMeasures={opinionPreventionMeasures}
          setOpinionPreventionMeasures={setOpinionPreventionMeasures}
        />
      ),
    },
    {
      key: '17',
      title:
        'Como você obteve as informações sobre COVID-19 (prevenção e tratamento)?',
      description: '',
      form: (
        <FormCovidInformation
          covidInformationError={covidInformationError}
          setCovidInformationError={setCovidInformationError}
          setVaccineDosesError={setVaccineDosesError}
          vaccineDosesError={vaccineDosesError}
          covidInformation={covidInformation}
          setCovidInformation={setCovidInformation}
        />
      ),
    },
    {
      key: '18',
      title:
        'Durante a pandemia de COVID-19 sua família conseguiu manter a renda familiar?',
      description: '',
      form: (
        <FormFamilyIncome
          maintainedFamilyIncome={maintainedFamilyIncome}
          setMaintainedFamilyIncome={setMaintainedFamilyIncome}
          maintainedFamilyIncomeError={maintainedFamilyIncomeError}
          setMaintainedFamilyIncomeError={setMaintainedFamilyIncomeError}
          receivedSocialAssistance={receivedSocialAssistance}
          setReceivedSocialAssistance={setReceivedSocialAssistance}
          receivedSocialAssistanceError={receivedSocialAssistanceError}
          setReceivedSocialAssistanceError={setReceivedSocialAssistanceError}
          recoveredFamilyIncome={recoveredFamilyIncome}
          setRecoveredFamilyIncome={setRecoveredFamilyIncome}
          recoveredFamilyIncomeError={recoveredFamilyIncomeError}
          setRecoveredFamilyIncomeError={setRecoveredFamilyIncomeError}
          familyInDebt={familyInDebt}
          setFamilyInDebt={setFamilyInDebt}
          familyInDebtError={familyInDebtError}
          setFamilyInDebtError={setFamilyInDebtError}
        />
      ),
    },
    {
      key: '19',
      title: 'Resumo do questionário',
      description: '',
      form: (
        <FormSummary
          name={name}
          cpf={cpf}
          reasonNotCpf={reasonNotCpf}
          toggleCheckBoxCpf={toggleCheckBoxCpf}
          email={email}
          age_group={ageGroup}
          gender={gender}
          city={city}
          street={street}
          district={district}
          number={number}
          region={region}
          zone={zone}
          schollLevel={schollLevel}
          religion={religion}
          comorbidity={comorbidity}
          diabetes={diabetes}
          heartProblem={heartProblem}
          kidneyDisease={kidneyDisease}
          thyroid={thyroid}
          obesity={obesity}
          otherComorbidity={otherComorbidity}
          affectedCovid19={affectedCovid19}
          diagnosticConfirmation={diagnosticConfirmation}
          timeInterval={timeInterval}
          diagnosticMethod={diagnosticMethod}
          treatmentPlace={treatmentPlace}
          hospitalTreatment={hospitalTreatment}
          covidSequelae={covidSequelae}
          vaccinated={vaccinated}
          vaccineDoses={vaccineDoses}
          reasonNotToTake={reasonNotToTake}
          lostFamilyMember={lostFamilyMember}
          affectedCovidAfterVaccinated={affectedCovidAfterVaccinated}
          rehabilitationSequelae={rehabilitationSequelae}
          treatmentRehabilitationSequelae={treatmentRehabilitationSequelae}
          opinionPreventionMeasures={opinionPreventionMeasures}
          covidInformation={covidInformation}
          maintainedFamilyIncome={maintainedFamilyIncome}
          receivedSocialAssistance={receivedSocialAssistance}
          recoveredFamilyIncome={recoveredFamilyIncome}
          familyInDebt={familyInDebt}
        />
      ),
    },
  ];

  const handleLayout = ({ layout }: any) => {
    setHeight(layout.height);
  };

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

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
    <>
      <Modalize ref={modalizeRef} onLayout={handleLayout}>
        <View style={[styles.centeredView, { height: height }]}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 48,
            }}>
            <MaterialCommunityIcons
              name="clipboard-check-outline"
              size={48}
              color={theme.colors.primary}
            />
            <Text
              style={{
                fontSize: 24,
                color: theme.colors.onPrimaryContainer,
              }}>
              Questionário finalizado
            </Text>
          </View>
          <View style={styles.buttons}>
            <Button
              mode="contained-tonal"
              onPress={() => {
                onClose();
                navigation.navigate('dashboard');
              }}>
              Voltar ao dashboard
            </Button>
            {/* <Button
              mode="contained"
              onPress={() => {
                setIsStarted(false);
                onClose();
                navigation.navigate('form');
              }}>
              Novo questionário
            </Button> */}
          </View>
        </View>
      </Modalize>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
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
            disabled={activeStep === 0 || isSubmiting}
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
            disabled={isSubmiting}
            mode="contained">
            {activeStep === FORMS.length - 1 ? 'Finalizar' : 'Próxima'}
          </Button>
        </View>
      </View>
    </>
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: { height: 46 },
});
