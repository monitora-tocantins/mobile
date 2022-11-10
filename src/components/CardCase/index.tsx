import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentToDP, widthPercentToDP } from '../../libs';
import { formatCurrency } from '../../utils/mask';

interface CardCaseProps {
  title: string;
  type: typeCard;
  caseNumber: number;
  hasIcon?: boolean;
  loading: boolean;
}
type typeCard = 'save' | 'infect' | 'death';

const COLORS_TITLE = {
  success: '#00D488',
  warning: '#FF8E4F',
  error: '#FF4F4F',
};

const CardCase: React.FC<CardCaseProps> = ({
  title,
  type,
  caseNumber,
  hasIcon,
  loading,
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.iconLoad} />
        <View style={styles.numberLoad} />
        <View style={styles.captionLoad} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {hasIcon && (
        <Ionicons
          name={
            type === 'save'
              ? 'md-heart-circle-outline'
              : type === 'infect'
              ? 'md-add-circle-outline'
              : 'md-close-circle-outline'
          }
          size={20}
          color={
            type === 'save'
              ? COLORS_TITLE.success
              : type === 'infect'
              ? COLORS_TITLE.warning
              : COLORS_TITLE.error
          }
        />
      )}
      <Text
        style={[
          styles.title,
          type === 'save'
            ? { color: COLORS_TITLE.success }
            : type === 'infect'
            ? { color: COLORS_TITLE.warning }
            : { color: COLORS_TITLE.error },
        ]}>
        {formatCurrency(caseNumber)}
      </Text>
      <Text style={styles.caption}>{title}</Text>
    </View>
  );
};

export default CardCase;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    width: widthPercentToDP('24%'),
    height: heightPercentToDP('16%'), // equivale a 90
    maxHeight: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,

    // shadowColor: theme.colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 5,
    elevation: 1,
  },
  title: {
    textAlign: 'center',
    // fontSize: 24,
    fontSize: widthPercentToDP('5%'),
  },
  caption: {
    // fontSize: 12,
    fontSize: widthPercentToDP('3%'),
  },
  // Effect load
  iconLoad: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numberLoad: {
    width: widthPercentToDP('18%'),
    height: 30,
    borderRadius: 2,
  },
  captionLoad: {
    width: widthPercentToDP('18%'),
    height: 10,
    borderRadius: 2,
  },
});
