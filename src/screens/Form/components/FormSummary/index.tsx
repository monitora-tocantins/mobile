import React, { createContext } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  //ToastAndroid,
} from 'react-native';
import { Button } from 'react-native-paper';
import { CustomInputCheck } from '../../../../components/CustomInputCheck';
//import { CensusFormAffectedCovidAfterVaccinated } from '../CensusFormAffectedCovidAfterVaccinated';
//import { CensusFormLostFamilyMember } from '../CensusFormLostFamilyMember';
//import { CensusFormOpinionPreventionMeasures } from '../CensusFormOpinionPreventionMeasures';

type Props = {
  name: string;
  cpf?: string;
  reasonNotCpf?: string;
  toggleCheckBoxCpf: boolean;
  age_group: string;
  email: string;
  gender: string;
  city: string;
  street: string;
  district: string;
  number: string;
  region?: string;
  zone: string;
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
};
export const FormStorageContext = createContext<Props>({} as Props);

export const FormSummary: React.FC<Props> = ({
  name,
  cpf,
  reasonNotCpf,
  toggleCheckBoxCpf,
  age_group,
  email,
  gender,
  city,
  street,
  district,
  number,
  region,
  zone,
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
  //setFormsSummary,
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
}) => {
  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView style={{ marginBottom: 40 }}>
          <View>
            <Text style={styles.text}>Nome:</Text>
            {name === '' ? (
              <Text style={styles.textNo}>Nome de usuário não informado</Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={name.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            {/* <Text style={styles.text}>CPF:</Text> */}
            {toggleCheckBoxCpf === true ? (
              <>
                <Text style={styles.text}>CPF de usuário não informado</Text>
                <CustomInputCheck
                  onValueChange={() => {}}
                  title={
                    reasonNotCpf !== undefined ? reasonNotCpf : ''.toUpperCase()
                  }
                  label="Sim"
                  value={true}
                  disabled
                />
              </>
            ) : (
              <>
                <Text style={styles.text}>CPF:</Text>
                <CustomInputCheck
                  onValueChange={() => {}}
                  title={cpf !== undefined ? cpf : ''}
                  label="Sim"
                  value={true}
                  disabled
                />
              </>
            )}
            <Text style={styles.text}>Grupo de idade: </Text>
            {age_group === '' ? (
              <Text style={styles.textNo}>Grupo de idade não informado</Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={age_group.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>E-mail: </Text>
            {email === '' ? (
              <Text style={styles.textNo}>E-mail não informado</Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={email}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>Gênero: </Text>
            {gender === '' ? (
              <Text style={styles.textNo}>Nenhum gênero selecionado </Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={gender.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}

            <Text style={styles.text}>Cidade: </Text>
            {city === '' ? (
              <Text style={styles.textNo}>Nenhuma cidade informada </Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={city.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>Rua: </Text>
            {street === '' ? (
              <Text style={styles.textNo}>Rua não informada </Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={street.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>Distrito: </Text>
            {district === '' ? (
              <Text style={styles.textNo}>Distrito não informado </Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={district.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>Número: </Text>
            {number === '' ? (
              <Text style={styles.textNo}>Nenhum número cadastrado</Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={number}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>Região: </Text>
            {region === '' ? (
              <Text style={styles.textNo}>Não informada</Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={'Norte'.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>Zona: </Text>
            {zone === '' ? (
              <Text style={styles.textNo}>Não informada</Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={zone.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>Nível escolar: </Text>
            {schollLevel === '' ? (
              <Text style={styles.textNo}>Não informado</Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={schollLevel.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>Religião: </Text>
            {religion === '' ? (
              <Text style={styles.textNo}>Não informada</Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={religion.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}

            <Text style={styles.text}>Comorbidade do usuário: </Text>
            {comorbidity === false ? (
              <Text style={styles.textNo}>Nenhuma comorbidade selecionada</Text>
            ) : (
              <>
                {/* {diabetes === false ? (
                  <Text style={styles.textNo}>Não possui comorbidade</Text>
                ) : (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={diabetes.toUpperCase()}
                    label="Sim"
                    value={comorbidity === true ? true : false}
                    disabled
                  />
                )} */}
                {diabetes === false ? (
                  <Text style={styles.textNo}>Não possui diabetes</Text>
                ) : (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Possui Diabetes'.toUpperCase()}
                    label="Sim"
                    value={diabetes === true ? true : false}
                    disabled
                  />
                )}

                {heartProblem === false ? (
                  <Text style={styles.textNo}>
                    Não possui problema cardíaco
                  </Text>
                ) : (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Possui problema cardíaco'.toUpperCase()}
                    label="Sim"
                    value={heartProblem === true ? true : false}
                    disabled
                  />
                )}

                {kidneyDisease === false ? (
                  <Text style={styles.textNo}>Não possui problema renal</Text>
                ) : (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Possui problema reanal'.toUpperCase()}
                    label="Sim"
                    value={kidneyDisease === true ? true : false}
                    disabled
                  />
                )}
                {thyroid === false ? (
                  <Text style={styles.textNo}>
                    Não possui problema tireoide
                  </Text>
                ) : (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Possui problema de tireoide'.toUpperCase()}
                    label="Sim"
                    value={thyroid === true ? true : false}
                    disabled
                  />
                )}
                {obesity === false ? (
                  <Text style={styles.textNo}>
                    Não possui problema de obesidade
                  </Text>
                ) : (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Possui problema de obesidade'.toUpperCase()}
                    label="Sim"
                    value={obesity === true ? true : false}
                    disabled
                  />
                )}
                <Text style={styles.text}>Outras comorbidades: </Text>
                {otherComorbidity === '' ? (
                  <Text style={styles.textNo}>Não informada</Text>
                ) : (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={otherComorbidity.toUpperCase()}
                    label="Sim"
                    value={otherComorbidity !== '' ? true : false}
                    disabled
                  />
                )}
              </>
            )}
            <Text style={styles.text}>Se foi afetado pela Covid 19:</Text>
            {affectedCovid19 === false ? (
              <Text style={styles.textNo}>Não Contraiu o COVID-19</Text>
            ) : (
              <>
                {affectedCovid19 === true && (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Sim, foi afetado pelo COVID-19'.toUpperCase()}
                    label="Sim"
                    value={true}
                    disabled
                  />
                )}
                <Text style={styles.textNo}>Não informou</Text>
              </>
            )}
            <Text style={styles.text}>Confirmação do diagnostico:</Text>
            {diagnosticConfirmation === false ? (
              <Text style={styles.textNo}>Não obteve confirmação</Text>
            ) : (
              <>
                {diagnosticConfirmation === true && (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Sim, obteve confirmação'.toUpperCase()}
                    label="Sim"
                    value={true}
                    disabled
                  />
                )}
                <Text style={styles.textNo}>Não informou diagnostico</Text>
              </>
            )}
            <Text style={styles.text}>
              Método utilizado para obter confirmação do COVID-19:{' '}
            </Text>
            {diagnosticMethod === '' ? (
              <Text style={styles.textNo}>
                Não utilizou nenhuma método para obter a confirmação do COVID-19
              </Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={diagnosticMethod.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>
              Intervalo de tempo que foi acometido pela COVID-19:
            </Text>
            {timeInterval === '' ? (
              <Text style={styles.textNo}>
                Não informou o periodo em que possivelmente foi acometido pelo
                COVID-19
              </Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={timeInterval.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>Local de tratamento:</Text>
            {treatmentPlace === '' ? (
              <Text style={styles.textNo}>
                Usuário não informou o local de seu tratamento
              </Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={treatmentPlace.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>Tratamento hospitalar:</Text>
            {hospitalTreatment === '' ? (
              <Text style={styles.textNo}>
                Usuário não informou qual foi o tratamento hospitalar
              </Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={hospitalTreatment.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            )}
            <Text style={styles.text}>Sequelas:</Text>
            {covidSequelae === '' ? (
              <Text style={styles.textNo}>Usuário não informou as squelas</Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={covidSequelae.toUpperCase()}
                label="Sim"
                value={covidSequelae === 'true' ? false : true}
                disabled
              />
            )}
            {/* FOI IMPLEMENTADO APENAS A RESPOSTA DA TELA 14 */}
            <Text style={styles.text}>
              Vacinação do usuário contra o COVID-19:{' '}
            </Text>
            {vaccinated === true ? (
              <>
                {vaccinated === true && (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={vaccineDoses.toUpperCase()}
                    label="Sim"
                    value={vaccineDoses !== '' ? true : false}
                    disabled
                  />
                )}
                <Text style={styles.textNo}> 1 Não informou</Text>
              </>
            ) : (
              <>
                {vaccinated === false && (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={reasonNotToTake.toUpperCase()}
                    label="Sim"
                    value={reasonNotToTake !== '' ? true : false}
                    disabled
                  />
                )}
                <Text style={styles.textNo}> Não informou</Text>
              </>
            )}
            <Text style={styles.text}>
              Perda de algum familiar por conta da Covid 19:
            </Text>
            {lostFamilyMember === false ? (
              <Text style={styles.textNo}>Não</Text>
            ) : (
              <>
                {lostFamilyMember && (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Sim'.toUpperCase()}
                    label="Sim"
                    value={lostFamilyMember === true ? true : false}
                    disabled
                  />
                )}
                <Text style={styles.textNo}>Não informou</Text>
              </>
            )}

            <Text style={styles.text}>
              O entrevistado pegou COVID-19 após estar vacinado:{' '}
            </Text>
            {affectedCovidAfterVaccinated === false ? (
              <Text style={styles.textNo}>Não</Text>
            ) : (
              <>
                {affectedCovidAfterVaccinated && (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Sim'.toUpperCase()}
                    label="Sim"
                    value={affectedCovidAfterVaccinated === true ? true : false}
                    disabled
                  />
                )}
                <Text style={styles.textNo}>Não informou</Text>
              </>
            )}
            <Text style={styles.text}>
              Tratamento de reabilitação contra as sequelas pós COVID-19:{' '}
            </Text>
            {treatmentRehabilitationSequelae === '' ? (
              <Text style={styles.textNo}>Não realizou nenhum tratamento</Text>
            ) : (
              <CustomInputCheck
                onValueChange={() => {}}
                title={treatmentRehabilitationSequelae.toUpperCase()}
                label="Sim"
                value={treatmentRehabilitationSequelae !== '' ? true : false}
                disabled
              />
            )}
            <Text style={styles.text}>
              O que o entrevistado acha sobre as medidas de prevenção:
            </Text>
            {opinionPreventionMeasures !== '' ? (
              <CustomInputCheck
                onValueChange={() => {}}
                title={opinionPreventionMeasures.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            ) : (
              <Text style={styles.textNo}>Não informou</Text>
            )}
            <Text style={styles.text}>
              Como o entrevistado obteve informações de (prevenção e
              tratamento):
            </Text>
            {covidInformation !== '' ? (
              <CustomInputCheck
                onValueChange={() => {}}
                title={covidInformation.toUpperCase()}
                label="Sim"
                value={true}
                disabled
              />
            ) : (
              <Text style={styles.textNo}>Não informou</Text>
            )}

            <Text style={styles.text}>
              O entrevistado conseguiu manter a renda familiar durante a
              pandemia:{' '}
            </Text>
            {maintainedFamilyIncome === true ? (
              <>
                <CustomInputCheck
                  onValueChange={() => {}}
                  title={'Sim'.toUpperCase()}
                  label="Sim"
                  value={maintainedFamilyIncome === true ? true : false}
                  disabled
                />

                <Text style={styles.text}>
                  O entrevistado recebeu algum tipo de auxílio social para
                  manter sua família durante a pandemia:{' '}
                </Text>
                {receivedSocialAssistance === false ? (
                  <Text style={styles.textNo}>
                    Não recebeu nenhum auxílio social
                  </Text>
                ) : (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Sim'.toUpperCase()}
                    label="Sim"
                    value={receivedSocialAssistance === true ? true : false}
                    disabled
                  />
                )}
              </>
            ) : (
              <>
                <Text style={styles.textNo}>Não </Text>

                <Text style={styles.text}>
                  O entrevistado recebeu algum tipo de auxílio social para
                  manter sua família durante a pandemia:{' '}
                </Text>
                {receivedSocialAssistance === false ? (
                  <Text style={styles.textNo}>
                    Não recebeu nenhum auxílio social
                  </Text>
                ) : (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Sim'.toUpperCase()}
                    label="Sim"
                    value={receivedSocialAssistance === true ? true : false}
                    disabled
                  />
                )}

                <Text style={styles.text}>
                  Atualmente o entrevistado recuperou a renda famíliar:
                </Text>
                {recoveredFamilyIncome === true ? (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Sim, recuperou!'.toUpperCase()}
                    label="Sim"
                    value={recoveredFamilyIncome === true ? true : false}
                    disabled
                  />
                ) : (
                  <Text style={styles.textNo}>
                    Não recuperou a renda familiar
                  </Text>
                )}

                <Text style={styles.text}>
                  O entrevistado considera que a pandemia levou sua família ao
                  endividamento:
                </Text>

                {familyInDebt === false ? (
                  <Text style={styles.textNo}>Não.</Text>
                ) : (
                  <CustomInputCheck
                    onValueChange={() => {}}
                    title={'Sim'.toUpperCase()}
                    label="Sim"
                    value={familyInDebt === true ? true : false}
                    disabled
                  />
                )}
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    fontSize: 22,
    marginTop: 15,
    fontWeight: 'bold',
  },
  textNo: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
