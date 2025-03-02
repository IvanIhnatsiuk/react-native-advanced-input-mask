import * as React from "react";

import { Text } from "react-native";
import styles from "./styles";
import TextInput from "../../components/TextInput";
import BaseTextInput from "../../components/BaseTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const CustomNotations = () => {
  const [allowedKeys, setAllowedKeys] = React.useState("1234567890");

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text>Set allowed keys</Text>
      <BaseTextInput
        defaultValue="1234567890"
        placeholder="Enter allowed keys"
        style={styles.allowedKeysInput}
        onChangeText={setAllowedKeys}
      />
      <TextInput
        placeholder="--------------"
        allowedKeys={allowedKeys}
        mask="[--------------]"
      />
    </KeyboardAwareScrollView>
  );
};

export default CustomNotations;
