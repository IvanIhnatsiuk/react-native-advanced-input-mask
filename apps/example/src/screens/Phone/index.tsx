import * as React from "react";

import { ScrollView } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../navigation";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

const Phone = () => {
  const { reset, navigate } = useNavigation();

  const navigateToRNTextInputWithReset = React.useCallback(() => {
    reset({ index: 0, routes: [{ name: ScreenNames.RNTextInput }] });
  }, [reset]);

  const navigateToRNTextInput = React.useCallback(() => {
    navigate(ScreenNames.RNTextInput);
  }, [navigate]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput
        placeholderTextColor="gray"
        onTailPlaceholderChange={console.log}
        placeholder="+1 (000) 000-0000"
        mask="+1 ([000]) [000]-[0000]"
        allowSuggestions={true}
        autoSkip
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
    </ScrollView>
  );
};

export default Phone;
