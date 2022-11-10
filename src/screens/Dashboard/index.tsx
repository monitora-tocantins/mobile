import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Chip, FAB, Portal, Text, useTheme } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LogoImg from '../../assets/icon.png';

const Dashboard: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const onStateChange = (value: boolean) => setIsOpen(value);

  const onSelectedFilter = (value: string) => setSelectedFilter(value);

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <Image source={LogoImg} style={styles.logo} resizeMode="contain" />
          <View style={styles.header}>
            <Text
              variant="titleLarge"
              style={[
                styles.headerTitle,
                { color: colors.onPrimaryContainer },
              ]}>
              Monitora Tocantins
            </Text>
            <Text
              variant="titleMedium"
              style={[styles.headerSubtitle, { color: colors.secondary }]}>
              Bem vindo, {user.name}
            </Text>
          </View>
          <View style={styles.areaList}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.horizontalList}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.filterItem}>
                <Text
                  variant="titleSmall"
                  style={[
                    styles.headerTitle,
                    styles.filterTitle,
                    { color: colors.onPrimaryContainer },
                  ]}>
                  Total
                </Text>
                <Chip
                  icon="inbox"
                  onPress={() => onSelectedFilter('all')}
                  selected={selectedFilter === 'all' && true}
                  mode={selectedFilter === 'all' ? 'flat' : 'outlined'}>
                  10
                </Chip>
              </View>
              <View style={styles.filterItem}>
                <Text
                  variant="titleSmall"
                  style={[
                    styles.headerTitle,
                    styles.filterTitle,
                    { color: colors.onPrimaryContainer },
                  ]}>
                  Pendentes
                </Text>
                <Chip
                  icon={() => (
                    <MaterialIcons
                      name="pending-actions"
                      color="#FF8E4F"
                      size={18}
                    />
                  )}
                  onPress={() => onSelectedFilter('pending')}
                  selected={selectedFilter === 'pending' && true}
                  mode={selectedFilter === 'pending' ? 'flat' : 'outlined'}>
                  10
                </Chip>
              </View>
              <View style={styles.filterItem}>
                <Text
                  variant="titleSmall"
                  style={[
                    styles.headerTitle,
                    styles.filterTitle,
                    { color: colors.onPrimaryContainer },
                  ]}>
                  Completos
                </Text>
                <Chip
                  icon={() => (
                    <MaterialIcons
                      name="cloud-done"
                      color="#00D488"
                      size={18}
                    />
                  )}
                  selected={selectedFilter === 'complete' && true}
                  mode={selectedFilter === 'complete' ? 'flat' : 'outlined'}
                  onPress={() => onSelectedFilter('complete')}>
                  10
                </Chip>
              </View>
            </ScrollView>
          </View>
        </View>

        <ScrollView>
          <View style={styles.verticalList}>
            {/* <CensusFormCard date="testes" title="Testes" type="complete" /> */}
          </View>
        </ScrollView>

        <Portal>
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
                onPress: () => console.log('Pressed add'),
              },
              {
                icon: 'sync',
                label: 'Sincronizar formulários',
                size: 'medium',
                onPress: () => console.log('Pressed star'),
              },
            ]}
            onStateChange={({ open }) => onStateChange(open)}
            onPress={() => {
              if (isOpen) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
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
    marginTop: 16,
    marginBottom: 32,
  },
  headerTitle: {
    fontFamily: 'Raleway-Bold',
    // fontSize: 20,
  },
  filterTitle: {
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Raleway-Regular',
  },
  filterItem: { marginRight: 16 },
  horizontalList: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 24,
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
});
