import * as React from 'react';

import { ScrollView } from 'react-native';
import styles from './styles';
import TextInput from '../../components/TextInput';

const IBAN = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput mask="GB[00] [____] [0000] [0000] [0000] [00]" />
    </ScrollView>
  );
};

export default IBAN;
