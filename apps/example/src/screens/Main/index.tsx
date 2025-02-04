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
    extracted: '',
    formatted: '',
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
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
        mask="[0999999].[09]"
        // - mom, can we have a neural network at home?
        // - we already have a neural network at home.
        // neural network at home:
        affinityFormat={[
          '[0].[00]',
          '[00].[00]',
          '[000].[00]',
          '[0000].[00]',
          '[00000].[00]',
          '[000000].[00]',
          '[0000000].[00]',
        ]}
        transformation={[{ set: ',', to: '.' }]}
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
