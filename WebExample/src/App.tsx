import React from 'react';

import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaskedTextInput } from 'react-native-advanced-input-mask';

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
  const inputRef = React.useRef<TextInput>(null);

  const [textState, setTextState] = React.useState({
    extracted: '',
    formatted: '',
  });

  const [focused, setFocused] = React.useState(false);

  const onChangeText = React.useCallback(
    (formatted: string, extracted: string) => {
      console.log('extracted:', extracted, 'formatted:', formatted);
      setTextState({ extracted, formatted });
    },
    []
  );

  const onFocus = React.useCallback((e) => {
    console.log(e.nativeEvent);
    setFocused(true);
  }, []);

  const onBlur = React.useCallback(() => setFocused(false), []);

  const clearText = React.useCallback(() => {
    setTextState({ extracted: '', formatted: '' });
  }, []);

  const onFocusButtonPress = React.useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <Text>extracted value {textState.extracted}</Text>
      <Text>formatted value {textState.formatted}</Text>
      <Text>focused {focused ? 'Yes' : 'No'}</Text>
      <MaskedTextInput
        ref={inputRef}
        defaultValue=""
        value={textState.formatted}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.maskedTextInput}
        onChangeText={onChangeText}
        onTailPlaceholderChange={console.log}
        mask="[00]-[00]-[00]"
        autocomplete={false}
        allowSuggestions={true}
        autocompleteOnFocus={false}
        autoSkip={false}
        customNotations={charAlphaNumerics}
      />
      <Button title="Clear text" onPress={clearText} />
      <Button title="Focus text input" onPress={onFocusButtonPress} />
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
