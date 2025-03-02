import * as React from "react";

import styles from "./styles";
import TextInput from "../../components/TextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const affineFormats = ["[00]{/}[00]{/}[00]"];

const DateScreen = () => {
  const defaultValue = React.useMemo(() => new Date().toISOString(), []);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput
        defaultValue={defaultValue}
        placeholder="0000/00/00"
        mask="[0000]{/}[00]{/}[00]"
        affinityFormat={affineFormats}
        keyboardType="numeric"
        autocomplete={false}
        allowSuggestions={true}
        autocompleteOnFocus={false}
        autoSkip={false}
      />
    </KeyboardAwareScrollView>
  );
};

export default DateScreen;
