import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, ProgressBar, Text, Title, useTheme } from 'react-native-paper';
import { CensusFormCard } from '../../../components/CensusFormCard';
import { CensusSyncFormCard } from '../../../components/CensusSyncFormCard';
import {
  StorageSchemaType,
  useFormStorage,
} from '../../../contexts/FormStorage';
import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/api';

interface ICurrentSyncForm {
  form: StorageSchemaType;
  progress?: number;
  uploaded?: boolean;
  error?: boolean;
}

const SyncForms: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { storage, loading, updateFormStatus, getStorage } = useFormStorage();
  const [currentSyncForm, setCurrentSyncForm] =
    useState<ICurrentSyncForm | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const filtered = storage.filtered('status == $0', 'pending');

  const handleSyncAllSelectedForms = async () => {
    try {
      setIsSyncing(true);
      showMessage({
        message: 'IoT Imuniza - Censo 2022',
        description:
          'Não saia ou feche o aplicativo enquanto os formulários são sincronizados',
        type: 'info',
        autoHide: true,
        duration: 1000,
        animated: true,
        position: 'top',
        floating: true,
      });
      if (filtered !== undefined) {
        for (const form of filtered) {
          setCurrentSyncForm({
            form,
            progress: 0,
            uploaded: false,
          });
          try {
            await api.post(
              '/user/forms',
              {
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
                  affected_covid_after_vaccinated:
                    form.affectedCovidAfterVaccinated,
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
              },
              {
                onUploadProgress: progressEvent => {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total,
                  );
                  setCurrentSyncForm({
                    form,
                    progress: percentCompleted,
                    uploaded: false,
                  });
                },
              },
            );
            setCurrentSyncForm({
              form,
              progress: 100,
              uploaded: true,
              error: false,
            });
            await updateFormStatus(form, 'complete');
            await new Promise(resolve => {
              setTimeout(() => {
                setCurrentSyncForm(null);
                resolve(true);
              }, 1000);
            });
          } catch (error: any) {
            setCurrentSyncForm({
              form,
              uploaded: false,
              error: true,
            });
            showMessage({
              message: 'Erro ao sincronizar',
              description: error.response.data.error.message,
              type: 'danger',
              animated: true,
              position: 'top',
              floating: true,
            });
            console.log('Resultado de sync', error.response.data.error.message);
          }
        }
      }
      showMessage({
        message: 'IoT Imuniza - Censo 2022',
        description: 'Os formulários foram sincronizados com sucesso',
        type: 'success',
        animated: true,
        position: 'top',
        floating: true,
      });
      setIsSyncing(false);
    } catch (error) {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    getStorage();
  }, [getStorage]);

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text
              variant="titleLarge"
              style={[{ color: colors.onPrimaryContainer }]}>
              Olá,
            </Text>
            <Text variant="titleMedium" style={[{ color: colors.secondary }]}>
              {user.name}
            </Text>
          </View>
        </View>
        {currentSyncForm && (
          <View style={styles.content}>
            <CensusSyncFormCard
              date={format(
                currentSyncForm.form.created_at,
                "dd 'de' MMM 'de' y",
                {
                  locale: ptBR,
                },
              )}
              title={currentSyncForm.form.name}
              cpf={currentSyncForm.form.cpf}
              progress={currentSyncForm.progress}
              uploaded={currentSyncForm.uploaded}
              error={currentSyncForm.error}
            />
          </View>
        )}
        {/* <View style={styles.content}>
          <CensusSyncFormCard
            date={format(new Date(), "dd 'de' MMM 'de' y", {
              locale: ptBR,
            })}
            title="Ilannildo"
            cpf="70181477270"
            progress={90}
            uploaded={false}
            error={true}
          />
        </View> */}
        <ScrollView>
          <View style={styles.verticalList}>
            <Title style={styles.title}>Formulários pendentes</Title>
            {loading ? (
              <>
                <ProgressBar indeterminate />
                <Text variant="bodyLarge" style={styles.loaderTitle}>
                  Carregando formulários
                </Text>
              </>
            ) : (
              <>
                {filtered.map(item => (
                  <CensusFormCard
                    date={format(item.created_at, "dd 'de' MMM 'de' y", {
                      locale: ptBR,
                    })}
                    title={item.name}
                    type={item.status}
                    key={item._id}
                  />
                ))}
              </>
            )}
            {filtered.length === 0 && (
              <Text style={styles.loaderTitle} variant="bodyLarge">
                Nenhum formulário pendente
              </Text>
            )}
          </View>
        </ScrollView>
        {filtered.length !== 0 && (
          <View style={styles.buttons}>
            <Button
              onPress={() => handleSyncAllSelectedForms()}
              disabled={isSyncing}
              contentStyle={styles.button}
              loading={isSyncing}
              mode="contained">
              Sincronizar
            </Button>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default SyncForms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: '100%',
    padding: 16,
  },
  header: {
    width: '100%',
    marginBottom: 16,
  },
  verticalList: {
    marginBottom: 100,
    padding: 16,
  },
  loaderTitle: {
    textAlign: 'center',
    marginTop: 8,
  },
  title: {
    fontWeight: '600',
    marginBottom: 24,
  },
  buttons: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  button: {
    height: 46,
  },
});
