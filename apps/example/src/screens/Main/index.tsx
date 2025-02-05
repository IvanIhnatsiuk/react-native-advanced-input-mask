import React from 'react';

import { ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import MenuItem from '../../components/MenuItem';
import { MENU_ITEMS } from './constants';

const Main = () => {
  const { navigate } = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {MENU_ITEMS.map((item) => (
        <MenuItem key={item.title} {...item} onPress={navigate} />
      ))}
    </ScrollView>
  );
};

export default Main;
