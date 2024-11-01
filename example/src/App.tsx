import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import MaskInput from './components/MaskInput';
import PhoneInput from './components/PhineInput';

const alphaNumericChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const charAlphaNumerics = [
  {
    character: '$',
    characterSet: alphaNumericChars,
    isOptional: false,
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <MaskInput
        title="Masked input"
        defaultValue=""
        style={styles.maskedTextInput}
        onTailPlaceholderChange={console.log}
        mask="[00]-[$$]-[00]"
        autocomplete={false}
        allowSuggestions={true}
        autocompleteOnFocus={false}
        autoSkip={false}
        customNotations={charAlphaNumerics}
      />
      <PhoneInput
        title="Phone input"
        defaultValue=""
        style={styles.maskedTextInput}
        autocomplete={false}
        allowSuggestions={true}
        autocompleteOnFocus={false}
        autoSkip={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  textInputMaskInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'lightblue',
  },
  maskedTextInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'orange',
  },
});
