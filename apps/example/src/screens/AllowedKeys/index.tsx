import * as React from "react";
import { Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import BaseTextInput from "../../components/BaseTextInput";
import TextInput from "../../components/TextInput";

import styles from "./styles";

const CustomNotations = () => {
  const [allowedKeys, setAllowedKeys] = React.useState("1234567890");

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <Text>Set allowed keys</Text>
      <BaseTextInput
        defaultValue="1234567890"
        placeholder="Enter allowed keys"
        style={styles.allowedKeysInput}
        onChangeText={setAllowedKeys}
      />
      <TextInput
        allowedKeys={allowedKeys}
        mask="[--------------]"
        placeholder="--------------"
      />
    </KeyboardAwareScrollView>
  );
};

export default CustomNotations;
