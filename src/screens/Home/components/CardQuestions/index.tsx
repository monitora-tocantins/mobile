import React from 'react';
import { View, StyleSheet } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { heightPercentToDP } from '../../../../libs';

import CorongaSvg from '../../../../assets/coronavirus.svg';
import { Text, TouchableRipple } from 'react-native-paper';
import { theme } from '../../../../theme';

type Props = {
  title: string;
  description: string;
  disable?: boolean;
  onPress: () => void;
};

const CardQuestions: React.FC<Props> = ({
  title,
  description,
  disable = false,
  onPress,
}) => {
  return (
    <TouchableRipple
      disabled={disable}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.primary,
        },
      ]}
      onPress={onPress}>
      <>
        <CorongaSvg style={styles.imgCoronga} />
        <View style={styles.wrapperText}>
          <Text
            variant="titleLarge"
            style={[styles.title, { color: theme.colors.onPrimary }]}>
            {title ? title : 'IoT Imuniza - 2022'}
          </Text>
          <Text
            variant="bodyLarge"
            style={[styles.caption, { color: theme.colors.onPrimary }]}>
            {description ? description : 'Aplique o questionário na sua região'}
          </Text>
        </View>
        <SimpleLineIcons
          name="arrow-right"
          size={25}
          color={theme.colors.onPrimary}
        />
      </>
    </TouchableRipple>
  );
};

export default CardQuestions;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: heightPercentToDP('18%'), // equivale a 105
    maxHeight: 160,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
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
    marginBottom: 5,
    fontWeight: '800',
  },
  caption: {
    height: '60%',
  },
});
