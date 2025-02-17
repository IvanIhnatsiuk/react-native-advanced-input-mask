import * as React from "react";

import { ScrollView } from "react-native";
import styles from "./styles";
import TextInput from "../../components/TextInput";

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput
        mask="[$$$$$$$$$$$$$]"
        autocomplete={false}
        autoSkip={false}
        customNotations={customNotations}
      />
    </ScrollView>
  );
};

export default CustomNotations;
