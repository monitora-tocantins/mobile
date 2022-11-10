import React from 'react';
import { View, Text, StyleSheet, ColorValue } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { SvgProps } from 'react-native-svg';

import { heightPercentToDP, widthPercentToDP } from '../../../../libs';

import CorongaSvg from '../../../../assets/coronavirus.svg';
import { Button } from 'react-native-paper';
import { theme } from '../../../../theme';

type Props = {
  title: string;
  description: string;
  disable?: boolean;
  backgroundColor: ColorValue;
  Icon: React.FC<SvgProps>;
  onPress: () => void;
};

const CardQuestions: React.FC<Props> = ({
  title,
  description,
  backgroundColor,
  Icon,
  disable = false,
  onPress,
}) => {
  return (
    <Button
      disabled={disable}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme.colors.primary,
        },
      ]}
      onPress={onPress}>
      {Icon ? (
        <Icon style={styles.imgCoronga} />
      ) : (
        <CorongaSvg style={styles.imgCoronga} />
      )}
      <View style={styles.wrapperText}>
        <Text style={styles.title}>
          {title ? title : 'Auto verificação Covid-19'}
        </Text>
        <Text style={styles.caption}>
          {description
            ? description
            : 'Contém uma lista de várias perguntas para verificar sua condição física'}
        </Text>
      </View>
      <SimpleLineIcons
        name="arrow-right"
        size={25}
        color={theme.colors.onPrimary}
      />
    </Button>
  );
};

export default CardQuestions;

const styles = StyleSheet.create({
  container: {
    width: widthPercentToDP('90%'),
    height: heightPercentToDP('18%'), // equivale a 105
    // maxHeight: 130,
    maxHeight: 160,
    // backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: -5,
      height: 5,
    },
    elevation: 10,
  },
  imgCoronga: {
    position: 'absolute',
    bottom: -21,
    left: -5,
    resizeMode: 'cover',
    zIndex: 0,
  },
  wrapperText: {
    zIndex: 1,
    marginLeft: '15%',
    width: '75%',
  },
  title: {
    fontSize: widthPercentToDP('4.4%'),
    // marginBottom: 10,
    marginBottom: 5,
  },
  caption: {
    fontSize: widthPercentToDP('3.2%'),
    //lineHeight: 20,
    height: '60%',
    // width: '70%',
  },
});
