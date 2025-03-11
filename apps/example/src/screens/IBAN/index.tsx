import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import TextInput from "../../components/TextInput";

import styles from "./styles";

const IBAN = () => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <TextInput
        mask="GB[00] [____] [0000] [0000] [0000] [00]"
        placeholder="GB00 ____ 0000 0000 0000 00"
      />
    </KeyboardAwareScrollView>
  );
};

export default IBAN;
