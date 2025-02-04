import * as React from 'react';

import { ScrollView } from 'react-native';
import styles from './styles';
import BaseTextInput from '../../components/BaseTextInput';

const RNTextInput = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <BaseTextInput style={styles.textInput} />
    </ScrollView>
  );
};

export default RNTextInput;
