import React, { useCallback, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

import styles from "./styles";

const ConditionalRendering = () => {
  const [isVisible, setVisible] = useState(true);

  const handleHideShowPress = useCallback(
    () => setVisible((prev) => !prev),
    [],
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      {isVisible && (
        <TextInput
          mask="GB[00] [____] [0000] [0000] [0000] [00]"
          placeholder="GB00 ____ 0000 0000 0000 00"
        />
      )}
      <Button
        title={`${isVisible ? "Hide" : "Show"} text input`}
        onPress={handleHideShowPress}
      />
    </KeyboardAwareScrollView>
  );
};

export default ConditionalRendering;
