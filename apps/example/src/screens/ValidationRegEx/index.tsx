import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import TextInput from "../../components/TextInput";

import styles from "./styles";

const ValidationRegex = () => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <TextInput
        allowedKeys="0123456789,."
        defaultValue="22.11"
        keyboardType="decimal-pad"
        mask="[09999999].[00]"
        placeholder="00000000.00"
        testID="validation-regex.input"
        validationRegex={"^(?!.*[.,].*[.,])\\d*(?:[.,]\\d{0,2})?$"}
      />
    </KeyboardAwareScrollView>
  );
};

export default ValidationRegex;
