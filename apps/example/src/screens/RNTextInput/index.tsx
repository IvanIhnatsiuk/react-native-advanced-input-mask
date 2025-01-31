import * as React from 'react';

import { TextInput, View } from 'react-native';
import styles from './styles';

const RNTextInput = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} />
    </View>
  );
};

export default RNTextInput;
