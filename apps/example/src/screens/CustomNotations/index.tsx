import * as React from "react";

import styles from "./styles";
import TextInput from "../../components/TextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const alphaNumericChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const customNotations = [
  {
    character: "$",
    characterSet: alphaNumericChars,
    isOptional: false,
  },
];

const CustomNotations = () => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput
        placeholder="Enter a string"
        mask="[$$$$$$$$$$$$$]"
        autocomplete={false}
        autoSkip={false}
        customNotations={customNotations}
      />
    </KeyboardAwareScrollView>
  );
};

export default CustomNotations;
