import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import ButtonAction from '../ButtonAction';

type Props = {
  data: Item[];
};
type Item = {
  key: string;
  title: string;
  image: React.FC<SvgProps>;
};

const ListInfo: React.FC<Props> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.key}
      renderItem={({ item }) => (
        <ButtonAction title={item.title} avatar={item.image} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.enviromentList}
    />
  );
};

export default ListInfo;

const styles = StyleSheet.create({
  enviromentList: {
    justifyContent: 'center',
    paddingBottom: 5,
    marginTop: 10,
    marginBottom: 30,
    // marginLeft: 20,
    paddingRight: 30,
  },
});
