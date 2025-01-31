import * as React from 'react';

import { Button, ScrollView, Text, TextInput } from 'react-native';
import { MaskedTextInput } from 'react-native-advanced-input-mask';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../navigation';

const alphaNumericChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const charAlphaNumerics = [
  {
    character: '$',
    characterSet: alphaNumericChars,
    isOptional: false,
  },
];

const Main = () => {
  const { reset, navigate } = useNavigation();

  const inputRef = React.useRef<TextInput>(null);

  const [textState, setTextState] = React.useState({
    extracted: '0000',
    formatted: '00-00',
  });

  const [focused, setFocused] = React.useState(false);

  const onChangeText = React.useCallback(
    (formatted: string, extracted: string) => {
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

  const handleNavigateToRNTextInputButtonPress = React.useCallback(() => {
    navigate(ScreenNames.RNTextInput);
  }, [navigate]);

  const navigateToRNTextInputWithReset = React.useCallback(() => {
    reset({ index: 0, routes: [{ name: ScreenNames.RNTextInput }] });
  }, [reset]);

  const navigateToDateScreen = React.useCallback(() => {
    navigate(ScreenNames.Date);
  }, [navigate]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>extracted value {textState.extracted}</Text>
      <Text>formatted value {textState.formatted}</Text>
      <Text>focused {focused ? 'Yes' : 'No'}</Text>
      <MaskedTextInput
        ref={inputRef}
        value={textState.formatted}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.maskedTextInput}
        onChangeText={onChangeText}
        onTailPlaceholderChange={console.log}
        mask="[00]-[$$]-[00]"
        autocomplete={false}
        allowSuggestions={true}
        autocompleteOnFocus={false}
        autoSkip={false}
        customNotations={charAlphaNumerics}
      />
      <Button title="Clear text" onPress={clearText} />
      <Button title="Focus text input" onPress={onFocusButtonPress} />
      <Button
        title="Navigate to RN text input screen"
        onPress={handleNavigateToRNTextInputButtonPress}
      />
      <Button
        title="Navigate to RN text input screen with reset"
        onPress={navigateToRNTextInputWithReset}
      />
      <Button
        title="Navigate to screen with date mask"
        onPress={navigateToDateScreen}
      />
    </ScrollView>
  );
};

export default Main;
