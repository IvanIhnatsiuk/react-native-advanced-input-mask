import * as React from 'react';

import { ScrollView } from 'react-native';
import styles from './styles';
import TextInput from '../../components/TextInput';

const ControlledInput = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput controlled mask="[--------------]" />
    </ScrollView>
  );
};

export default ControlledInput;
