import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { FAB, ProgressBar, Text, useTheme } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { FilterCensusForm } from '../../components/FilterCensusForm';
import { CensusFormCard } from '../../components/CensusFormCard';
import { useFormStorage } from '../../contexts/FormStorage';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { AppScreensProps } from '../../routes/app.routes';
import { api } from '../../services/api';

const Dashboard: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isFetchingForms, setIsFetchingForms] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [totalSync, setTotalSync] = useState('');
  const { storage, loading, getStorage } = useFormStorage();
  const navigation = useNavigation<AppScreensProps>();

  const onStateChange = (value: boolean) => setIsOpen(value);

  const onSelectedFilter = (value: string) => setSelectedFilter(value);

  const getFormsTotal = useCallback(async () => {
    try {
      setIsFetchingForms(true);
      const res = await api.get(`/user/forms?user_id=${user.id}&limit=99999`);
      setTotalSync(res.data.data.total);
      setIsFetchingForms(false);
    } catch (error) {
      setIsFetchingForms(false);
    }
  }, [user]);

  useEffect(() => {
    getStorage();
    getFormsTotal();
  }, [getStorage, getFormsTotal]);

  const filtered =
    selectedFilter === 'all'
      ? storage
      : storage.filtered('status == $0', selectedFilter);

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text
                variant="titleLarge"
                style={[{ color: colors.onPrimaryContainer }]}>
                Olá,
              </Text>
              <Text variant="titleMedium" style={[{ color: colors.secondary }]}>
                {user.name}
              </Text>
            </View>
            {!isFetchingForms && totalSync !== '' && (
              <View>
                <Text
                  variant="titleMedium"
                  style={[{ color: colors.onPrimaryContainer }]}>
                  Total sincronizados
                </Text>
                <Text
                  variant="titleMedium"
                  style={[styles.formTitle, { color: colors.secondary }]}>
                  {totalSync === '' ? 0 : totalSync}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.areaList}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.horizontalList}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.filterItem}>
                <FilterCensusForm
                  label="Todos"
                  quantity={storage.length}
                  onPress={() => onSelectedFilter('all')}
                  selected={selectedFilter === 'all'}
                  type="all"
                />
              </View>
              <View style={styles.filterItem}>
                <FilterCensusForm
                  label="Completo"
                  quantity={storage.filtered('status == $0', 'complete').length}
                  onPress={() => onSelectedFilter('complete')}
                  selected={selectedFilter === 'complete'}
                  type="complete"
                />
              </View>
              <View style={styles.filterItem}>
                <FilterCensusForm
                  label="Pendentes"
                  quantity={storage.filtered('status == $0', 'pending').length}
                  onPress={() => onSelectedFilter('pending')}
                  selected={selectedFilter === 'pending'}
                  type="pending"
                />
              </View>
            </ScrollView>
          </View>
        </View>

        <ScrollView>
          <View style={styles.verticalList}>
            {loading ? (
              <>
                <ProgressBar indeterminate />
                <Text variant="bodyLarge" style={styles.loaderTitle}>
                  Carregando formulários
                </Text>
              </>
            ) : (
              filtered.map(item => (
                <CensusFormCard
                  date={format(item.created_at, "dd 'de' MMM 'de' y", {
                    locale: ptBR,
                  })}
                  title={item.name}
                  type={item.status}
                  key={item._id}
                />
              ))
            )}
            {filtered.length === 0 && (
              <Text style={styles.loaderTitle} variant="bodyLarge">
                Nenhum formulário cadastrado
              </Text>
            )}
          </View>
        </ScrollView>

        <FAB.Group
          open={isOpen}
          icon={() =>
            isOpen ? (
              <MaterialCommunityIcons
                name="file-settings"
                size={24}
                color={colors.onPrimaryContainer}
              />
            ) : (
              <MaterialCommunityIcons
                name="file-settings-outline"
                size={24}
                color={colors.onPrimaryContainer}
              />
            )
          }
          visible
          actions={[
            {
              icon: 'plus',
              label: 'Novo formulário',
              size: 'medium',
              onPress: () => navigation.navigate('form'),
            },
            {
              icon: 'sync',
              label: 'Sincronizar formulários',
              size: 'medium',
              onPress: () => navigation.navigate('syncForms'),
            },
          ]}
          onStateChange={({ open }) => onStateChange(open)}
          onPress={() => {
            if (isOpen) {
              // do something if the speed dial is open
            }
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 32,
    // alignItems: 'center',
  },
  content: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginBottom: 32,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerSection: {},
  filterTitle: {
    textAlign: 'center',
    marginBottom: 4,
  },
  loaderTitle: {
    textAlign: 'center',
    marginTop: 8,
  },
  filterItem: { marginRight: 16 },
  horizontalList: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 36,
  },
  verticalList: {
    marginBottom: 100,
    paddingHorizontal: 16,
    marginTop: 8,
    width: '100%',
  },
  areaList: {
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  formTitle: { textAlign: 'center' },
});
