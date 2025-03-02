import React from "react";
import TextInput from "../../components/TextInput";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const ValidationRegex = () => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput
        placeholder="00000000.00"
        mask="[09999999].[00]"
        testID="validation-regex.input"
        defaultValue="22.11"
        allowedKeys="0123456789,."
        validationRegex={"^(?!.*[.,].*[.,])\\d*(?:[.,]\\d{0,2})?$"}
        keyboardType="decimal-pad"
      />
    </KeyboardAwareScrollView>
  );
};

export default ValidationRegex;
