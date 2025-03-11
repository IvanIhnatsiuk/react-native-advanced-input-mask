import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import TextInput from "../../components/TextInput";

import styles from "./styles";

const ControlledInput = () => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <TextInput
        controlled
        initialValue="+1 (111"
        keyboardType="phone-pad"
        mask="+1 ([000]) [000]-[0000]"
        placeholder="+1 (000) 000 0000"
      />
    </KeyboardAwareScrollView>
  );
};

export default ControlledInput;
