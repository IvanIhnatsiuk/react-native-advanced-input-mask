import * as React from 'react';

import { ScrollView, TextInput } from 'react-native';
import styles from './styles';

const RNTextInput = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput style={styles.textInput} />
    </ScrollView>
  );
};

export default RNTextInput;
