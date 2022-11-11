import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SvgProps } from 'react-native-svg';

import { widthPercentToDP } from '../../../../libs';

interface Props {
  title: string;
  avatar: React.FC<SvgProps>;
}

const ButtonAction: React.FC<Props> = ({ title, avatar: Avatar }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.elevation.level1 },
      ]}>
      <Avatar width={80} height={80} />
      <Text style={[styles.title, { color: theme.colors.onPrimaryContainer }]}>
        {title}
      </Text>
    </View>
  );
};

export default ButtonAction;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: widthPercentToDP('35%'),
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    resizeMode: 'contain',
  },
  title: {
    fontSize: widthPercentToDP('3.5%'),
    textAlign: 'center',
  },
});
