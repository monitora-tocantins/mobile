import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ToastAndroid,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { hasLocationPermission } from '../../libs';

import CardInfor from './components/CardInfor';
import CardQuestions from './components/CardQuestions';
// import ListInfo from './components/ListInfo';
// import TitleApp from '../../components/TitleApp';
// import { preventions, symptoms } from '../../data';
import axios from 'axios';
import { Avatar, Text, Title, useTheme } from 'react-native-paper';
import { AppScreensProps } from '../../routes/app.routes';
import { useAuth } from '../../hooks/useAuth';
import { stringToColor } from '../../utils/mask';
import { CardNews, INews } from '../../components/CardNews';
import { format } from 'date-fns';
import ListInfo from './components/ListInfo';
import { preventions, symptoms } from '../../data';
import { CardNewsLoading } from '../../components/CardNewsLoading';

type CovidCases = {
  updatedDate: string;
  recovered: number;
  infected: number;
  death: number;
};

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [covidError, setCovidError] = useState('');
  const [news, setNews] = useState<INews[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [covidCases, setCovidCases] = useState<CovidCases>({
    updatedDate: '',
    death: 0,
    infected: 0,
    recovered: 0,
  });
  const navigation = useNavigation<AppScreensProps>();

  const theme = useTheme();
  const mounted = useRef(true);
  const { user } = useAuth();

  const handleGetCovidCases = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.brasil.io/v1/dataset/covid19/caso/data?search=&format=json&epidemiological_week=&state=PA&city=Cametá&order_for_place=&is_repeated=true',
        {
          headers: {
            Authorization: 'Token 99337598071ecfe5dac04eb1da005f7e2749af03',
          },
        },
      );
      if (mounted.current) {
        setCovidCases({
          updatedDate: response.data.results[0].date,
          death: response.data.results[0].deaths,
          infected: response.data.results[0].confirmed,
          recovered: response.data.results[0].estimated_population,
        });

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      if (error.response) {
        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
        setCovidError(error.message);
      } else {
        console.log('Error', error.message);
        setCovidError(error.message);
      }
    }
  };
  const handleGetNews = async () => {
    setIsLoadingNews(true);
    const now = format(new Date(), 'yyyy-MM-dd');
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?language=pt&q=coronav%C3%ADrus&from=${now}&sortBy=publishedAt&pageSize=5&apiKey=3a060234bdaf4fba99633baf09b905c9`,
      );
      if (mounted.current) {
        setNews(response.data.articles);
        setIsLoadingNews(false);
      } else {
        setIsLoadingNews(false);
      }
    } catch (error: any) {
      console.log('Error', error);
    }
  };

  const handleRefresh = async () => {
    setCovidError('');
    await handleGetCovidCases();
  };

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await handleGetCovidCases();
      await handleGetNews();
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const callLocation = async () => {
      const permission = await hasLocationPermission();
      if (!permission) {
        ToastAndroid.show(
          'Permissão ao acesso a localização negado',
          ToastAndroid.LONG,
        );
      }
    };

    callLocation();
    handleGetCovidCases();
    handleGetNews();

    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.background}
        />
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              progressBackgroundColor={theme.colors.background}
            />
          }>
          <View style={styles.header}>
            <Image
              source={require('../../assets/logo-transp.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onPrimaryContainer }}>
              Monitora Tocantins
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('profile');
              }}>
              <Avatar.Text
                size={46}
                label={`${
                  user.name
                    .replace(/\s(de|da|dos|das)\s/g, ' ')
                    .split(' ')[0][0]
                }`}
                style={{
                  backgroundColor: stringToColor(user.name),
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <CardInfor
              updatedDate={covidCases.updatedDate}
              death={covidCases.death}
              infected={covidCases.infected}
              recovered={covidCases.recovered}
              loading={loading}
              error={covidError}
              onRefresh={() => handleRefresh()}
            />
            {user.type === 1 ? (
              <CardQuestions
                title="Censo 2022"
                description="Aplique o questionário referente ao coronavírus na região"
                onPress={() => navigation.navigate('dashboard')}
              />
            ) : (
              <CardQuestions
                title="Censo 2022"
                description="Responda o questionário referente ao coronavírus"
                onPress={() =>
                  Alert.alert(
                    'CENSO 2022',
                    'Em breve você poderá responder o questionário do censo 2022',
                  )
                }
              />
            )}
          </View>
          <View style={styles.contentNews}>
            <Title style={styles.title}>Últimas notícias</Title>
            {isLoadingNews && (
              <>
                <CardNewsLoading />
                <CardNewsLoading />
              </>
            )}
            {news.map(item => (
              <CardNews key={item.url} news={item} />
            ))}
          </View>

          <View style={styles.contentInfo}>
            <Title style={styles.title}>Como se prevenir?</Title>
            <ListInfo data={preventions} />
          </View>

          <View style={styles.contentInfo}>
            <Title style={styles.title}>Quais são os sintomas?</Title>
            <ListInfo data={symptoms} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contentNews: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 48,
  },
  contentInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  logo: {
    width: 50,
    height: 50,
  },
  titleArea: {
    flexDirection: 'row',
  },
  titleApp: {
    fontSize: 18,
  },
  titleApp2: {
    fontSize: 18,
  },
  footer: {
    paddingBottom: 30,
  },
  modalContent: {
    paddingHorizontal: 30,
    paddingVertical: 45,
  },
  modalHeader: {
    width: '100%',
    marginBottom: 40,
  },
  modalTitle: {
    fontSize: 22,
  },
  modalSubtitle: {
    fontSize: 14,
  },
  modalFooter: {
    marginBottom: 20,
  },
  title: {
    fontWeight: '600',
  },
});

export default Home;
