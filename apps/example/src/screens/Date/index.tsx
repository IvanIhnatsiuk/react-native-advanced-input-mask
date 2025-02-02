import * as React from 'react';

import { ScrollView } from 'react-native';
import styles from './styles';
import { MaskedTextInput } from 'react-native-advanced-input-mask';

const affineFormats = ['[00]{/}[00]{/}[00]'];

const DateScreen = () => {
  const defaultValue = React.useMemo(() => new Date().toISOString(), []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <MaskedTextInput
        defaultValue={defaultValue}
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
