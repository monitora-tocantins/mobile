import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, ProgressBar, Text, useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  date: string;
  title: string;
  cpf?: string;
  progress?: number;
  uploaded?: boolean;
  error?: boolean;
};

export const CensusSyncFormCard: React.FC<Props> = ({
  cpf,
  date,
  title,
  progress,
  error,
  uploaded,
}) => {
  const { colors } = useTheme();
  return (
    <Card
      // mode="elevated"
      elevation={1}
      onPress={() => {}}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.wrapper}>
        <View style={styles.left}>
          <View style={styles.right}>
            <View>
              <Text variant="titleMedium" style={styles.title}>
                {title} {cpf && ` - ${cpf}`}
              </Text>
              <Text variant="bodySmall" style={styles.subtitle}>
                Criado em: {date ? date : '01 de jan de 2021'}
              </Text>
            </View>
            {uploaded === true && (
              <MaterialIcons name="check-circle" color="#00D488" size={24} />
            )}
            {error === true && (
              <MaterialIcons name="error" color={colors.error} size={24} />
            )}
          </View>

          <View style={styles.progressWrapper}>
            <View style={styles.progressBarWrapper}>
              <ProgressBar
                progress={progress !== undefined ? progress / 100 : 0}
                color={
                  uploaded !== undefined && uploaded
                    ? '#00D488'
                    : error !== undefined && error
                    ? colors.error
                    : colors.primary
                }
              />
            </View>
            <Text variant="bodyMedium">
              {`${progress !== undefined ? progress / 100 : 0}%` || '100%'}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 16,
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  left: {
    paddingHorizontal: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBarWrapper: {
    width: '90%',
  },
});
