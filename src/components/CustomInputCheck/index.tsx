import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { heightPercentToDP } from '../../libs';

type Props = TouchableOpacityProps & {
  title: string;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export const CustomInputCheck: React.FC<Props> = ({
  title,
  value,
  onValueChange,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      {...rest}
      onPress={() => onValueChange(!value)}
      style={[
        styles.container,
        {
          backgroundColor: value
            ? theme.colors.primary
            : theme.colors.elevation.level1,
        },
      ]}>
      <Text
        variant="titleMedium"
        style={[
          {
            color: value
              ? theme.colors.onPrimary
              : theme.colors.onPrimaryContainer,
          },
        ]}>
        {title}
      </Text>

      {value && (
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="check-circle"
            color={theme.colors.onPrimary}
            size={14}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: heightPercentToDP('5.5%'),
    // backgroundColor: theme.colors.secundary10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
});
