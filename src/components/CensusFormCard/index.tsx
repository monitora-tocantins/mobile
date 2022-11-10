import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

type Props = {
  date: string;
  title: string;
  type: string;
};

export const CensusFormCard: React.FC<Props> = ({ type, date, title }) => {
  const { colors } = useTheme();
  return (
    <Card
      // mode="elevated"
      elevation={1}
      onPress={() => {}}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.marker,
          {
            backgroundColor:
              type === 'complete'
                ? '#00D488'
                : type === 'pending'
                ? '#FF8E4F'
                : type === 'incomplete'
                ? colors.error
                : colors.primary,
          },
        ]}
      />
      <View style={styles.wrapper}>
        <View style={styles.left}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.text2}>
            Criado em: {date ? date : '01 de jan de 2021'}
          </Text>
        </View>
        <View style={styles.right}>
          <Text
            style={[
              styles.text,
              {
                color:
                  type === 'complete'
                    ? '#00D488'
                    : type === 'pending'
                    ? '#FF8E4F'
                    : type === 'incomplete'
                    ? colors.error
                    : colors.primary,
              },
            ]}>
            {type === 'complete'
              ? 'COMPLETO'
              : type === 'pending'
              ? 'PENDENTE'
              : type === 'incomplete'
              ? 'INCOMPLETO'
              : 'COMPLETO'}
          </Text>
          {/* <Text style={styles.text2}>Enviado em: 26 de mai de 2022</Text> */}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    width: '100%',
    // display: 'flex',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  marker: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: 4,
  },
  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
    // color: theme.colors.gray10,
    marginBottom: 10,
    maxWidth: 300,
  },
  text: {
    fontFamily: 'Raleway-regular',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  text2: {
    fontFamily: 'Raleway-regular',
    fontSize: 12,
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  left: {
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  right: {
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingRight: 8,
    alignItems: 'flex-end',
  },
});
