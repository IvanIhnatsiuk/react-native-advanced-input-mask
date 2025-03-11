import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import ScreenNames from "../../navigation/screenNames";

import styles from "./styles";

const Phone = () => {
  const { reset, navigate } = useNavigation();

  const navigateToRNTextInputWithReset = React.useCallback(() => {
    reset({ index: 0, routes: [{ name: ScreenNames.RNTextInput }] });
  }, [reset]);

  const navigateToRNTextInput = React.useCallback(() => {
    navigate(ScreenNames.RNTextInput);
  }, [navigate]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <TextInput
        autoSkip
        allowSuggestions={true}
        keyboardType="phone-pad"
        mask="+1 ([000]) [000]-[0000]"
        placeholder="+1 (000) 000-0000"
        onTailPlaceholderChange={console.log}
      />
      <Button
        style={styles.button}
        title="Navigate to RN text input"
        onPress={navigateToRNTextInput}
      />
      <Button
        style={styles.button}
        title="Navigate to RN text input screen with reset"
        onPress={navigateToRNTextInputWithReset}
      />
    </KeyboardAwareScrollView>
  );
};

export default Phone;
