import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

type Props = {
  quantity: number;
  label: string;
  type: 'all' | 'pending' | 'complete' | 'incomplete';
  onPress: () => void;
  selected: boolean;
};

const COLORS_BACKGROUND = {
  success: 'rgba(0,212,136,0.2)',
  warning: 'rgba(255,142,79,0.2)',
  error: 'rgba(186, 26, 26, 0.2)',
};
const COLORS_TITLE = {
  success: '#00D488',
  warning: '#FF8E4F',
  error: '#FF4F4F',
};

export const FilterCensusForm: React.FC<Props> = ({
  label,
  quantity,
  type,
  onPress,
  selected,
}) => {
  const theme = useTheme();
  return (
    <>
      <TouchableRipple
        style={[
          styles.container,
          {
            backgroundColor:
              type === 'complete'
                ? COLORS_BACKGROUND.success
                : type === 'pending'
                ? COLORS_BACKGROUND.warning
                : type === 'incomplete'
                ? COLORS_BACKGROUND.error
                : theme.colors.primaryContainer,
            opacity: selected ? 1 : 0.5,
          },
        ]}
        onPress={onPress}>
        <View style={styles.content}>
          <Text
            variant="titleLarge"
            style={[
              styles.title,
              {
                color:
                  type === 'complete'
                    ? COLORS_TITLE.success
                    : type === 'pending'
                    ? COLORS_TITLE.warning
                    : type === 'incomplete'
                    ? COLORS_TITLE.error
                    : theme.colors.primary,
              },
            ]}>
            {quantity}
          </Text>

          <Text
            variant="titleSmall"
            style={[
              {
                color:
                  type === 'complete'
                    ? COLORS_TITLE.success
                    : type === 'pending'
                    ? COLORS_TITLE.warning
                    : type === 'incomplete'
                    ? COLORS_TITLE.error
                    : theme.colors.primary,
              },
            ]}>
            {label}
          </Text>
        </View>
      </TouchableRipple>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    marginRight: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '800',
  },
});
