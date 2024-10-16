import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import MaskedTextInput from 'react-native-advanced-input-mask';

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
  const [textState, setTextState] = React.useState({
    extracted: '',
    formatted: '',
  });

  const onChangeText = React.useCallback((extracted, formatted) => {
    console.log('extracted:', extracted, 'formatted:', formatted);
    setTextState({ extracted, formatted });
  }, []);

  return (
    <View style={styles.container}>
      <Text>extracted value {textState.extracted}</Text>
      <Text>formatted value {textState.formatted}</Text>
      <MaskedTextInput
        defaultValue=""
        style={styles.maskedTextInput}
        onChangeText={onChangeText}
        value={textState.formatted}
        primaryMaskFormat="[00]-[00]-[00]"
        autocomplete={true}
        allowSuggestions={false}
        autocompleteOnFocus={false}
        autoSkip={false}
        customNotations={charAlphaNumerics}
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
