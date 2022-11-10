import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { widthPercentToDP } from '../../../../libs';
import CardCase from '../../../../components/CardCase';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { useTheme } from 'react-native-paper';
//import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Covid-19 em Cametá</Text>
          {loading ? (
            <View style={styles.dateUpdateCaseLoad} />
          ) : (
            <Text style={styles.caption}>
              {`Atualizado em ${format(updateDate, "dd 'de' MMMM 'de' yyyy", {
                locale: pt,
              })}`}
              {console.log(format(updateDate, 'dd MMMM yyyy'))}
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
    width: widthPercentToDP('90%'),
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
    // fontSize: 16,
    fontSize: widthPercentToDP('4.8%'),
  },
  caption: {
    fontSize: widthPercentToDP('3.3%'),
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
