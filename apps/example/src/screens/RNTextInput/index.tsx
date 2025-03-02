import * as React from "react";

import styles from "./styles";
import BaseTextInput from "../../components/BaseTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const RNTextInput = () => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <BaseTextInput style={styles.textInput} />
    </KeyboardAwareScrollView>
  );
};

export default RNTextInput;
