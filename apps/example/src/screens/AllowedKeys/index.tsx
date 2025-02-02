import * as React from 'react';

import { ScrollView, TextInput as RNTextInput, Text } from 'react-native';
import styles from './styles';
import TextInput from '../../components/TextInput';

const CustomNotations = () => {
  const [allowedKeys, setAllowedKeys] = React.useState('');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text>Set allowed keys</Text>
      <RNTextInput
        style={styles.allowedKeysInput}
        onChangeText={setAllowedKeys}
      />
      <TextInput allowedKeys={allowedKeys} mask="[--------------]" />
    </ScrollView>
  );
};

export default CustomNotations;
