import * as React from "react";

import styles from "./styles";
import TextInput from "../../components/TextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const ControlledInput = () => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput
        controlled
        initialValue="1111"
        keyboardType="phone-pad"
        placeholder="+1 (000) 000 0000"
        mask="+1 ([000]) [000]-[0000]"
      />
    </KeyboardAwareScrollView>
  );
};

export default ControlledInput;
