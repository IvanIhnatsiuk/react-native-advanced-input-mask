import * as React from "react";

import styles from "./styles";
import TextInput from "../../components/TextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const IBAN = () => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput
        placeholder="GB00 ____ 0000 0000 0000 00"
        mask="GB[00] [____] [0000] [0000] [0000] [00]"
      />
    </KeyboardAwareScrollView>
  );
};

export default IBAN;
