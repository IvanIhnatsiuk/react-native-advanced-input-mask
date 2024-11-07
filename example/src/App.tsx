import * as React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';
import { MaskedTextInput } from 'react-native-advanced-input-mask';
import MaskInput from 'react-native-mask-input';

const alphaNumericChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const charAlphaNumerics = [
  {
    character: '$',
    characterSet: alphaNumericChars,
    isOptional: false,
  },
];

const jsMask = [
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export default function App() {
  const [textState, setTextState] = React.useState({
    extracted: '',
    formatted: '',
  });

  const [focused, setFocused] = React.useState(false);

  const [jsMaskState, setJSMaskState] = React.useState({
    extracted: '',
    formatted: '',
  });

  const onChangeText = React.useCallback((formatted, extracted) => {
    console.log('extracted:', extracted, 'formatted:', formatted);
    setTextState({ extracted, formatted });
  }, []);

  const onChangeJSMaskText = React.useCallback((formatted, extracted) => {
    setJSMaskState({ extracted, formatted });
  }, []);

  const onFocus = React.useCallback((e) => {
    console.log(e.nativeEvent);
    setFocused(true);
  }, []);

  const onBlur = React.useCallback(() => setFocused(false), []);

  const clearText = React.useCallback(() => {
    setTextState({ extracted: '', formatted: '' });
  }, []);

  return (
    <View style={styles.container}>
      <Text>extracted value {textState.extracted}</Text>
      <Text>formatted value {textState.formatted}</Text>
      <Text>focused {focused ? 'Yes' : 'No'}</Text>
      <MaskedTextInput
        defaultValue="33333"
        value={textState.formatted}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.textInputMaskInput}
        onChangeText={onChangeText}
        renderTailPlaceholder
        onTailPlaceholderChange={console.log}
        mask="([00]) [000000]-[0000]"
        autocomplete={false}
        allowSuggestions={true}
        autocompleteOnFocus={false}
        autoSkip={false}
        customNotations={charAlphaNumerics}
      />
      <Button title="Clear text" onPress={clearText} />
      <Text>JS Mask</Text>
      <Text>extracted value {jsMaskState.extracted}</Text>
      <Text>formatted value {jsMaskState.formatted}</Text>
      <MaskInput
        style={styles.maskedTextInput}
        value={jsMaskState.formatted}
        onChangeText={onChangeJSMaskText}
        mask={jsMask}
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
    letterSpacing: 10,
  },
  maskedTextInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'orange',
  },
});
