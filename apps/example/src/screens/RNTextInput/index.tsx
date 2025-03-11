import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import BaseTextInput from "../../components/BaseTextInput";

import styles from "./styles";

const RNTextInput = () => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <BaseTextInput style={styles.textInput} />
    </KeyboardAwareScrollView>
  );
};

export default RNTextInput;
