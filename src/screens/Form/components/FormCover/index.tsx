import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Modalize } from 'react-native-modalize';
import { Button, Checkbox, Text, useTheme } from 'react-native-paper';
import { useAuth } from '../../../../hooks/useAuth';
import CoverImg from '../../../../assets/img_initial_symptom.svg';

interface IFormCover {
  onPress: () => void;
}

export const FormCover: React.FC<IFormCover> = ({ onPress }) => {
  const theme = useTheme();
  const { isConnected, user } = useAuth();
  const [toggleCheckBoxTwo, setToggleCheckBoxTwo] = useState(false);

  const modalizeRef = useRef<Modalize>(null);
  const modalizeRefTwo = useRef<Modalize>(null);

  useEffect(() => {
    if (isConnected === false) {
      Alert.alert(
        'Censo 2022',
        'Você está sem conexão com a internet, por isso, o formulário será salvo localmente e você poderá sincronizar ao finalizar',
      );
    }
  }, [isConnected]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <CoverImg width={300} height={300} />
      <View style={styles.viewText}>
        <Text
          variant="titleLarge"
          style={[styles.title, { color: theme.colors.onPrimaryContainer }]}>
          Mapeamento pós covid-19
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.conteudo, { color: theme.colors.onPrimaryContainer }]}>
          Objetivo Geral: mapear no pos covid-19 como a sociedade está vivendo
          neste cenário; gerenciar as sequelas; analisar o impacto social,
          econômico e cultural das famílias.
        </Text>
      </View>
      <View>
        <View style={styles.check}>
          <Checkbox status="checked" />
          <TouchableOpacity
            style={styles.viewText}
            onPress={() => modalizeRef.current?.open()}>
            <Text
              variant="bodyLarge"
              style={[
                styles.textCheck,
                { color: theme.colors.onPrimaryContainer },
              ]}>
              O recenseador, {user.name}, concorda com o{' '}
              <Text
                variant="titleMedium"
                style={[
                  styles.bold,
                  { color: theme.colors.onPrimaryContainer },
                ]}>
                TERMO DE CONFIDENCIALIDADE E SIGILO
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.check}>
          <Checkbox
            status={toggleCheckBoxTwo ? 'checked' : 'unchecked'}
            onPress={() => setToggleCheckBoxTwo(!toggleCheckBoxTwo)}
          />
          <TouchableOpacity
            style={styles.viewText}
            onPress={() => modalizeRefTwo.current?.open()}>
            <Text
              variant="bodyLarge"
              style={[
                styles.textCheck,
                { color: theme.colors.onPrimaryContainer },
              ]}>
              O entrevistado concorda com o{' '}
              <Text
                variant="titleMedium"
                style={[
                  styles.bold,
                  { color: theme.colors.onPrimaryContainer },
                ]}>
                TERMO DE CONSENTIMENTO PARA TRATAMENTO DE DADOS PESSOAIS LEI
                GERAL DE PROTEÇÃO DE DADOS PESSOAIS – LGPD
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewText}>
        <Button
          mode="contained"
          onPress={onPress}
          contentStyle={styles.button}
          disabled={!toggleCheckBoxTwo}>
          Iniciar formulário
        </Button>
      </View>
      <Modalize
        ref={modalizeRef}
        snapPoint={800}
        modalHeight={800}
        HeaderComponent={
          <View
            style={[
              styles.headerView,
              { backgroundColor: theme.colors.background },
            ]}>
            <Text style={styles.titleTerms}>
              TERMO DE CONFIDENCIALIDADE E SIGILO
            </Text>
          </View>
        }>
        <View
          style={[
            styles.centeredView,
            { backgroundColor: theme.colors.background },
          ]}>
          <Text style={styles.textBold}>
            O projeto Aplicando Iot e censo para monitoramento de COVID-19 e
            imunização na região do Baixo-Tocantins, desenvolvido pela Faculdade
            de Sistemas de Informação, da Universidade Federal do Pará do Campus
            do Tocantins/Cametá.
          </Text>
          <Text style={styles.text}>Por este termo, compromete-se:</Text>
          <Text style={styles.text}>
            1. A não utilizar as informações confidenciais, as quais tiver
            acesso, para gerar benefício próprio exclusivo e/ou unilateral,
            presente ou futuro, ou para uso de terceiros, bem como a não
            repassar o conhecimento das informações confidenciais,
            responsabilizando-se por todos aqueles que vierem a ter acesso às
            informações, por seu intermédio.
          </Text>
          <Text style={styles.text}>
            2. A não efetuar nenhuma gravação ou cópia da documentação
            confidencial relacionada às tecnologias, dados ou informações
            apresentadas no, ou por meio do vínculo, ao projeto acima
            mencionado, a qual que tiver acesso, respeitando a Lei nº
            13.709/2018 (Lei Geral de Proteção de Dados Pessoais).
          </Text>
          <Text style={styles.text}>
            3. A não se apropriar para si ou para outrem de material
            confidencial ou sigiloso que venha a ser disponibilizado por meio do
            projeto acima mencionado.
          </Text>
          <Text style={styles.text}>
            4. A não repassar o conhecimento das informações, por seu
            intermédio.
          </Text>
          <Text style={styles.text}>
            A obrigação de sigilo ora assumida não prevalece sobre informações
            que estejam sob domínio público, antes da data de assinatura deste
            termo, ou que se tornem públicas pelo Instituto Nacional da
            Propriedade Industrial-INPI ou por instituição competente em âmbito
            internacional.
          </Text>
          <Text style={styles.text}>
            Neste termo, as seguintes expressões serão assim definidas:
          </Text>
          <Text style={styles.text}>
            1. “Informação Confidencial” significará toda informação revelada
            relacionada às tecnologias de que tratam os projetos do (nome do
            projeto aqui), apresentadas e associadas com a bolsa concedida, sob
            a forma escrita, verbal ou por quaisquer outros meios. A informação
            confidencial inclui, mas não se limita às informações relativas a
            operações, processos, planos ou intenções, informações sobre
            produção, instalações, equipamentos, segredos de negócio, segredos
            de fábrica, dados, habilidades especializadas, projetos, métodos,
            metodologia, fluxogramas, especificações, componentes, fórmulas,
            produtos, amostras, diagramas, desenhos, desenhos de esquema
            industrial, patentes, oportunidades de mercado e questões relativas
            a negócios revelados durante a execução do projeto;
          </Text>
          <Text style={styles.text}>
            2. “Avaliação” significará todas e quaisquer discussões,
            conversações ou negociações entre, ou com as partes, de alguma forma
            relacionada ou associada ao projeto acima mencionado.
          </Text>
          <Text style={styles.text}>
            O presente compromisso será válido até que os direitos dos
            envolvidos tenham sido devidamente protegidos sob as cautelas legais
            exigíveis, ou tornado público pela Faculdade de Sistemas de
            Informação ou pelo Instituto Nacional da Propriedade Industrial –
            INPI.
          </Text>
          <Text style={styles.text}>
            Caso o receptor da informação descumpra quaisquer obrigações
            previstas no presente documento estará sujeito às implicações e
            sanções de cunho civil e criminal cabíveis.
          </Text>
          <Text style={styles.textBold}>
            E, PARA TODOS OS EFEITOS, firma o presente termo na presença das
            testemunhas abaixo assinadas
          </Text>
          <View style={styles.check}>
            <Checkbox status="checked" />
            <TouchableOpacity
              style={styles.viewText}
              onPress={() => modalizeRef.current?.close()}>
              <Text variant="bodyLarge" style={styles.textCheck}>
                O recenseador, {user.name}, concorda com o{' '}
                <Text variant="titleMedium" style={styles.bold}>
                  TERMO DE CONFIDENCIALIDADE E SIGILO
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>

      <Modalize
        ref={modalizeRefTwo}
        snapPoint={800}
        modalHeight={800}
        HeaderComponent={
          <View
            style={[
              styles.headerView,
              { backgroundColor: theme.colors.background },
            ]}>
            <Text style={styles.titleTerms}>
              TERMO DE CONSENTIMENTO PARA TRATAMENTO DE DADOS PESSOAIS
            </Text>
          </View>
        }>
        <View
          style={[
            styles.centeredView,
            { backgroundColor: theme.colors.background },
          ]}>
          <Text style={styles.textBold}>
            Por meio deste instrumento, o TITULAR concorda, de maneira livre,
            informada e inequívoca, com o tratamento de seus dados pessoais para
            as finalidades aqui delineadas.
          </Text>
          <Text style={styles.textBold}>CLÁUSULA 1ª - Dados Pessoais</Text>
          <Text style={styles.text}>
            O Titular autoriza a Controlador(a) a realizar o tratamento, ou
            seja, a utilizar os seguintes dados pessoais, para os fins que serão
            relacionados na cláusula segunda:
          </Text>
          <Text style={styles.text}>– Nome completo – Data de nascimento;</Text>
          <Text style={styles.text}>
            – Número e imagem da Carteira de Identidade (RG);
          </Text>
          <Text style={styles.text}>– Profissão</Text>
          <Text style={styles.text}>– Endereço completo;</Text>
          <Text style={styles.text}>
            – Números de telefone, WhatsApp e endereços de e-mail;
          </Text>
          <Text style={styles.text}>
            – Comunicação, verbal e escrita, mantida entre o Titular e o
            Controlador;
          </Text>
          <Text style={styles.textBold}>
            CLÁUSULA 2 ª - Finalidade do Tratamento dos Dados
          </Text>
          <Text style={styles.text}>
            O Titular autoriza que a Controlador(a) utilize os dados pessoais e
            dados pessoais sensíveis listados neste termo para as seguintes
            finalidades:
          </Text>
          <Text style={styles.text}>
            – Permitir que a Controladora identifique e entre em contato com o
            titular, em razão do contrato de trabalho;
          </Text>
          <Text style={styles.text}>
            – Quando necessário para atender aos interesses legítimos do
            controlador ou de terceiros, exceto no caso de prevalecerem direitos
            e liberdades fundamentais do titular que exijam a proteção dos dados
            pessoais;
          </Text>
          <Text style={styles.text}>
            Parágrafo Primeiro: Caso seja necessário o compartilhamento de dados
            com terceiros que não tenham sido relacionados nesse termo será
            ajustado novo termo de consentimento para este fim (§ 6° do artigo
            8° e § 2° do artigo 9° da Lei n° 13.709/2018).
          </Text>
          <Text style={styles.text}>
            Parágrafo Segundo: Em caso de alteração na finalidade, que esteja em
            desacordo com o consentimento original, a Controladora deverá
            comunicar o Titular, que poderá revogar o consentimento, conforme
            previsto na cláusula sexta.
          </Text>
          <Text style={styles.textBold}>
            CLÁUSULA 3ª - Da possibilidade de não consentir e das consequências
            da negativa
          </Text>
          <Text style={styles.text}>
            O TITULAR declara que, antes de assinar o presente, foi informado
            pelo CONTROLADOR de que poderia não consentir com o tratamento de
            seus dados pessoais nos termos deste instrumento, sendo que sua
            negativa lhe geraria as seguintes consequências:
          </Text>
          <Text style={styles.text}>- Não haverá consequências;</Text>
          <Text style={styles.textBold}>
            CLÁUSULA 3 ª - Compartilhamento de Dados
          </Text>
          <Text style={styles.text}>
            A Controladora fica autorizada a compartilhar os dados pessoais do
            Titular com outros agentes de tratamento de dados, caso seja
            necessário para as finalidades listadas neste instrumento, desde
            que, sejam respeitados os princípios da boa-fé, finalidade,
            adequação, necessidade, livre acesso, qualidade dos dados,
            transparência, segurança, prevenção, não discriminação e
            responsabilização e prestação de contas.
          </Text>
          <Text style={styles.textBold}>
            CLÁUSULA 4 ª - Responsabilidade pela Segurança dos Dados
          </Text>
          <Text style={styles.text}>
            A Controladora se responsabiliza por manter medidas de segurança,
            técnicas e administrativas suficientes a proteger os dados pessoais
            do Titular e à Autoridade Nacional de Proteção de Dados (ANPD),
            comunicando ao Titular, caso ocorra algum incidente de segurança que
            possa acarretar risco ou dano relevante, conforme artigo 48 da Lei
            n° 13.709/2020.
          </Text>
          <Text style={styles.textBold}>
            CLÁUSULA 5 ª- Término do Tratamento dos Dados
          </Text>
          <Text style={styles.text}>
            À Controladora, é permitido manter e utilizar os dados pessoais do
            Titular durante todo o período contratualmente firmado para as
            finalidades relacionadas nesse termo ou impostas por órgãos de
            fiscalização, nos termos do artigo 16 da Lei n° 13.709/2018.
          </Text>
          <Text style={styles.textBold}>
            CLÁUSULA 6 ª - Direito de Revogação do Consentimento
          </Text>
          <Text style={styles.text}>
            O Titular poderá revogar seu consentimento, a qualquer tempo, por
            e-mail ou por carta escrita, conforme o artigo 8°, § 5°, da Lei n°
            13.709/2020.
          </Text>
          <Text style={styles.text}>
            O Titular fica ciente de que a Controladora poderá permanecer
            utilizando os dados para as seguintes finalidades:
          </Text>
          <Text style={styles.text}>
            – Para cumprimento, pela Controladora, de obrigações impostas por
            órgãos de fiscalização;
          </Text>
          <Text style={styles.text}>
            – Para a tutela da saúde, exclusivamente, em procedimento realizado
            por profissionais de saúde, serviços de saúde ou autoridade
            sanitária;
          </Text>
          <Text style={styles.text}>
            – Quando necessário para atender aos interesses legítimos do
            controlador ou de terceiros, exceto no caso de prevalecerem direitos
            e liberdades fundamentais do titular que exijam a proteção dos dados
            pessoais.
          </Text>
          <Text style={styles.textBold}>
            CLÁUSULA 7ª - Tempo de Permanência dos Dados Recolhidos
          </Text>
          <Text style={styles.text}>
            O titular fica ciente de que a Controladora deverá permanecer com os
            seus dados pelo período mínimo estipulado pela duração do projeto,
            mesmo após o encerramento do projeto.
          </Text>
          <Text style={styles.textBold}>
            CLÁUSULA 8ª - Vazamento de Dados ou Acessos Não Autorizados –
            Penalidades
          </Text>
          <Text style={styles.text}>
            As partes poderão entrar em acordo, quanto aos eventuais danos
            causados, caso exista o vazamento de dados pessoais ou acessos não
            autorizados, e caso não haja acordo, a Controladora tem ciência que
            estará sujeita às penalidades previstas no artigo 52 da Lei n°
            13.709/2018:
          </Text>
          <Text style={styles.textBold}>
            Cametá, {format(new Date(), 'dd, MMMM, yyyy', { locale: ptBR })}
          </Text>
          <View style={styles.check}>
            <Checkbox
              status={toggleCheckBoxTwo ? 'checked' : 'unchecked'}
              onPress={() => setToggleCheckBoxTwo(!toggleCheckBoxTwo)}
            />
            <TouchableOpacity
              // style={styles.viewText}
              onPress={() => modalizeRefTwo.current?.close()}>
              <Text variant="bodyLarge" style={styles.textCheck}>
                O entrevistado concorda com o{' '}
                <Text variant="titleMedium" style={styles.bold}>
                  TERMO DE CONSENTIMENTO PARA TRATAMENTO DE DADOS PESSOAIS LEI
                  GERAL DE PROTEÇÃO DE DADOS PESSOAIS – LGPD
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  viewText: {
    width: '100%',
  },
  check: {
    flexDirection: 'row',
    marginBottom: 8,
    margin: '0%',
    alignItems: 'flex-start',
    maxWidth: '100%',
  },
  title: {
    fontWeight: '800',
    marginBottom: 5,
  },
  conteudo: {
    textAlign: 'justify',
    marginBottom: '2%',
  },
  textCheck: {
    textAlign: 'justify',
    marginLeft: 8,
    // textAlign: 'left',
    maxWidth: '85%',
  },
  bold: { fontWeight: '800' },
  centeredView: {
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  headerView: {
    marginTop: 16,
    paddingBottom: 8,
    // paddingHorizontal: 16,
  },
  titleTerms: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  text: {
    textAlign: 'justify',
    fontSize: 16,
    marginBottom: 16,
  },
  textBold: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    margin: '1%',
    height: 46,
  },
});
