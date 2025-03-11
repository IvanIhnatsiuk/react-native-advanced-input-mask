import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import TextInput from "../../components/TextInput";

import styles from "./styles";

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
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <TextInput
        autocomplete={false}
        autoSkip={false}
        customNotations={customNotations}
        mask="[$$$$$$$$$$$$$]"
        placeholder="Enter a string"
      />
    </KeyboardAwareScrollView>
  );
};

export default CustomNotations;
