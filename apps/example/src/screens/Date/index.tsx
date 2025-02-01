import * as React from 'react';

import { ScrollView } from 'react-native';
import styles from './styles';
import { MaskedTextInput } from 'react-native-advanced-input-mask';

const affineFormats = ['[00]{/}[00]{/}[0000]'];

const DateScreen = () => {
  console.log(new Date().toISOString());

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MaskedTextInput
        defaultValue={new Date().toISOString()}
        style={styles.maskedTextInput}
        mask="[0000]{/}[00]{/}[00]"
        affinityFormat={affineFormats}
        autocomplete={false}
        allowSuggestions={true}
        autocompleteOnFocus={false}
        autoSkip={false}
      />
    </ScrollView>
  );
};

export default DateScreen;
