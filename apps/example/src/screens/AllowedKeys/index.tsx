import * as React from 'react';

import { ScrollView, Text } from 'react-native';
import styles from './styles';
import TextInput from '../../components/TextInput';
import BaseTextInput from '../../components/BaseTextInput';

const CustomNotations = () => {
  const [allowedKeys, setAllowedKeys] = React.useState('');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text>Set allowed keys</Text>
      <BaseTextInput
        style={styles.allowedKeysInput}
        onChangeText={setAllowedKeys}
      />
      <TextInput allowedKeys={allowedKeys} mask="[--------------]" />
    </ScrollView>
  );
};

export default CustomNotations;
