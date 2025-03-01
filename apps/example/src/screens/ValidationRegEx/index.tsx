import React from "react";
import { ScrollView } from "react-native";
import TextInput from "../../components/TextInput";
import styles from "./styles";

const ValidationRegex = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput
        mask="[09999999].[00]"
        testID="validation-regex.input"
        defaultValue="22.11"
        allowedKeys="0123456789,."
        validationRegex={"^(?!.*[.,].*[.,])\\d*(?:[.,]\\d{0,2})?$"}
        keyboardType="decimal-pad"
      />
    </ScrollView>
  );
};

export default ValidationRegex;
