import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Text, useTheme } from 'react-native-paper';

import CardCase from '../../../../components/CardCase';
import { widthPercentToDP } from '../../../../libs';
import pt from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';

type Props = {
  updatedDate: string;
  recovered: number;
  infected: number;
  death: number;
  loading: boolean;
  error: string;
  onRefresh: () => void;
};

const CardInfor: React.FC<Props> = ({
  death,
  updatedDate,
  infected,
  recovered,
  loading,
  error,
  onRefresh,
}) => {
  const date = updatedDate.split(' ');
  const updateDate = new Date(date[0]);
  //const storageData = AsyncStorage

  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.elevation.level1 },
      ]}>
      <View style={styles.header}>
        <View>
          <Text
            variant="titleLarge"
            style={[styles.title, { color: theme.colors.onPrimaryContainer }]}>
            Covid-19 em Cametá
          </Text>
          {loading ? (
            <View style={styles.dateUpdateCaseLoad} />
          ) : (
            <Text variant="titleMedium" style={{ color: theme.colors.outline }}>
              <>
                {`Atualizado em ${format(updateDate, "dd 'de' MMMM 'de' yyyy", {
                  locale: pt,
                })}`}
              </>
            </Text>
          )}
        </View>
        {!!error && (
          <TouchableOpacity onPress={onRefresh}>
            <MaterialIcons name="refresh" size={30} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.wrapperCardCase}>
        <CardCase
          title="População"
          type="save"
          caseNumber={recovered}
          loading={loading}
          hasIcon
        />
        <CardCase
          title="Infectados"
          type="infect"
          caseNumber={infected}
          loading={loading}
          hasIcon
        />
        <CardCase
          title="Óbitos"
          type="death"
          caseNumber={death}
          hasIcon
          loading={loading}
        />
      </View>
    </View>
  );
};

export default CardInfor;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontWeight: '800',
  },
  wrapperCardCase: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Effect load
  dateUpdateCaseLoad: {
    width: widthPercentToDP('50%'),
    height: 15,
    borderRadius: 2,
  },
});
