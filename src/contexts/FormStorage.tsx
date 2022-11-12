import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import Realm, { Results } from 'realm';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { getRealm } from '../services/realm';

type Props = {
  storage: Results<StorageSchemaType>;
  loading: boolean;
  saveForm: (data: StorageSchemaType) => Promise<boolean>;
  updateForm: (data: StorageSchemaType) => Promise<boolean>;
  updateFormStatus: (
    data: StorageSchemaType,
    status: string,
  ) => Promise<boolean>;
  syncForm: (data: StorageSchemaType) => Promise<boolean>;
  getStorage: () => Promise<() => void>;
  syncAllPending: () => Promise<void>;
};

// modificar as tipagens
export type StorageSchemaType = {
  uid?: string;
  _id?: number;
  name: string;
  cpf?: string;
  reason_not_cpf?: string;
  age_group: string;
  email: string;
  gender: string;
  city: string;
  street: string;
  district: string;
  number: string;
  region?: string;
  zone: string;
  uf: string;
  zipcode: string;
  latitude: string;
  longitude: string;
  schollLevel: string;
  religion: string;
  comorbidity: boolean | undefined;
  diabetes: boolean | undefined;
  heartProblem: boolean | undefined;
  kidneyDisease: boolean | undefined;
  thyroid: boolean | undefined;
  obesity: boolean | undefined;
  otherComorbidity: string;
  affectedCovid19: boolean | undefined;
  diagnosticConfirmation: boolean | undefined;
  timeInterval: string;
  diagnosticMethod: string;
  treatmentPlace: string;
  hospitalTreatment: string;
  covidSequelae: string;
  vaccinated: boolean | undefined;
  vaccineDoses: string;
  reasonNotToTake: string;
  lostFamilyMember: boolean | undefined;
  affectedCovidAfterVaccinated: boolean | undefined;
  rehabilitationSequelae: boolean | undefined;
  treatmentRehabilitationSequelae: string;
  opinionPreventionMeasures: string;
  covidInformation: string;
  maintainedFamilyIncome: boolean | undefined;
  receivedSocialAssistance: boolean | undefined;
  recoveredFamilyIncome: boolean | undefined;
  familyInDebt: boolean | undefined;
  status: string;
  created_at: Date;
  updated_at: Date;
};

export const FormStorageContext = createContext<Props>({} as Props);

interface IFormStorageProvider {
  children: ReactNode;
}

export const FormStorageProvider: React.FC<IFormStorageProvider> = ({
  children,
}) => {
  const [storage, setStorage] = useState<Results<StorageSchemaType>>([] as any);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const getStorage = useCallback(async () => {
    setLoading(true);
    const realm = await getRealm();
    const data = realm
      .objects<StorageSchemaType>('FormSchema')
      .filtered('uid == $0', user.id)
      .sorted('created_at');
    if (data !== undefined) {
      setStorage(data);
    }
    setLoading(false);
    return () => {
      realm.close();
    };
  }, [user]);

  const seedFormsToTest = async () => {
    const result5 = await saveForm({
      uid: user.id,
      city: 'Cametá',
      district: 'Castanhal',
      email: '',
      gender: 'Masculino',
      latitude: '',
      longitude: '',
      name: 'Teste 12',
      number: '',
      status: 'pending',
      street: 'São benedito',
      uf: 'PA',
      zipcode: '68400000',
      zone: 'Urbana',
      cpf: '98226748720',
      reason_not_cpf: '',
      region: '',
      age_group: 'até 25 anos',
      schollLevel: 'fundamental imcompleto',
      religion: 'Católica',
      comorbidity: false,
      diabetes: false,
      heartProblem: false,
      kidneyDisease: false,
      thyroid: false,
      obesity: false,
      otherComorbidity: '',
      affectedCovid19: false,
      diagnosticConfirmation: false,
      timeInterval: '',
      diagnosticMethod: '',
      treatmentPlace: '',
      hospitalTreatment: '',
      covidSequelae: '',
      vaccinated: true,
      vaccineDoses: 'Dose única',
      reasonNotToTake: '',
      lostFamilyMember: false,
      affectedCovidAfterVaccinated: false,
      rehabilitationSequelae: false,
      treatmentRehabilitationSequelae: '',
      opinionPreventionMeasures: 'Necessário',
      covidInformation: 'Veículo televisivo e rádio',
      maintainedFamilyIncome: true,
      receivedSocialAssistance: true,
      recoveredFamilyIncome: false,
      familyInDebt: false,
      created_at: new Date(),
      updated_at: new Date(),
    });
    console.log('Teste rodou => ', result5);
  };

  useEffect(() => {
    // seedFormsToTest();
  }, []);

  useEffect(() => {
    getStorage();
  }, [getStorage]);

  const saveForm = (data: StorageSchemaType): Promise<boolean> => {
    // console.log('RESPOSTAS >>', data);

    return new Promise(async (resolve, reject) => {
      const realm = await getRealm();
      const lastStorage = realm
        .objects<StorageSchemaType>('FormSchema')
        .sorted('_id', true)[0];
      const highesId = Number(lastStorage === undefined ? 0 : lastStorage._id);
      data._id = highesId === undefined ? 1 : highesId + 1;
      try {
        realm.write(() => {
          realm.create<StorageSchemaType>('FormSchema', data);
        });
        await getStorage();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateFormStatus = (
    data: StorageSchemaType,
    status: string,
  ): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const realm = await getRealm();
      try {
        realm.write(() => {
          const form = realm
            .objects<StorageSchemaType>('FormSchema')
            .find(item => item._id === data._id);
          if (form) {
            form.status = status;
          }
        });
        // await getStorage();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateForm = (data: StorageSchemaType): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const realm = await getRealm();
      try {
        realm.write(() => {
          realm.create<StorageSchemaType>(
            'FormSchema',
            data,
            Realm.UpdateMode.Modified,
          );
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const syncAllPending = async () => {
    Alert.alert(
      'Aguarde!',
      'Os formulários estão sendo sincronizados. Não saia do aplicativo',
    );
    setLoading(true);
    try {
      const realm = await getRealm();
      const storagesPending = realm
        .objects<StorageSchemaType>('FormSchema')
        .filtered('uid == $0', user.id)
        .filtered('status == $0', 'pending')
        .sorted('created_at');
      if (storagesPending !== undefined) {
        for (const item of storagesPending) {
          const resultSync = await syncForm(item);
          console.log('Resultado de sync', resultSync);
          if (resultSync) {
            const resultUpdate = await updateFormStatus(item, 'complete');
            if (resultUpdate) {
              console.log('Resultado de atualizar', resultUpdate);
            } else {
              console.log('Falhou update');
            }
          } else {
            console.log('Falhou sync');
          }
        }
      }
      Alert.alert(
        'Censo IoT Imuniza',
        'Os formulários foram enviados com sucesso',
      );
      setLoading(false);
    } catch (error) {
      console.log('error sync =>', error);
    }
  };

  // modiicar aqui
  const syncForm = async (form: StorageSchemaType) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        await api.post('/user/forms', {
          user: {
            name: form.name,
            gender: form.gender,
            cpf: form.cpf,
            email: form.email,
          },
          address: {
            city: form.city,
            street: form.street,
            number: form.number,
            district: form.district,
            zipcode: form.zipcode,
            region: form.region,
            uf: form.uf,
            zone: form.zone,
            latitude: form.latitude,
            longitude: form.longitude,
          },
          form: {
            age_group: form.age_group,
            reason_not_cpf: form.reason_not_cpf,
            school_level: form.schollLevel,
            religion: form.religion,
            comorbidity: form.comorbidity,
            diabetes: form.diabetes,
            heart_problem: form.heartProblem,
            kidney_disease: form.kidneyDisease,
            thyroid: form.thyroid,
            obesity: form.obesity,
            other_comorbidity: form.otherComorbidity,
            affected_covid_19: form.affectedCovid19,
            diagnostic_confirmation: form.diagnosticConfirmation,
            time_interval: form.timeInterval,
            diagnostic_method: form.diagnosticMethod,
            treatment_place: form.treatmentPlace,
            hospital_treatment: form.hospitalTreatment,
            covid_sequelae: form.covidSequelae,
            vaccinated: form.vaccinated,
            vaccine_doses: form.vaccineDoses,
            reason_not_to_take: form.reasonNotToTake,
            lost_family_member: form.lostFamilyMember,
            affected_covid_after_vaccinated: form.affectedCovidAfterVaccinated,
            rehabilitation_sequelae: form.rehabilitationSequelae,
            treatment_rehabilitation_sequelae:
              form.treatmentRehabilitationSequelae,
            opinion_prevention_measures: form.opinionPreventionMeasures,
            covid_information: form.covidInformation,
            maintained_family_income: form.maintainedFamilyIncome,
            received_social_assistance: form.receivedSocialAssistance,
            recovered_family_income: form.recoveredFamilyIncome,
            family_in_debt: form.familyInDebt,
          },
        });
        resolve(true);
      } catch (error: any) {
        reject(error);
      }
    });
  };

  // const clearStoragePassword = async () => {
  //   const realm = await getRealm();
  //   try {
  //     realm.write(() => {
  //       realm.delete(realm.objects('StorageSchema'));
  //       // realm.objects("Cat")
  //     });
  //   } catch (error) {
  //     console.log('Error ao deletar storage password', error);
  //   }
  // };

  return (
    <FormStorageContext.Provider
      value={{
        storage,
        loading,
        saveForm,
        updateForm,
        updateFormStatus,
        syncForm,
        syncAllPending,
        getStorage,
      }}>
      {children}
    </FormStorageContext.Provider>
  );
};

export const useFormStorage = () => {
  const context = useContext(FormStorageContext);
  if (!context) {
    throw new Error('useStorage must be used within an AuthProvider.');
  }
  return context;
};
