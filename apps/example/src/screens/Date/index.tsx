import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import TextInput from "../../components/TextInput";

import styles from "./styles";

const affineFormats = ["[00]{/}[00]{/}[00]"];

const DateScreen = () => {
  const defaultValue = React.useMemo(() => new Date().toISOString(), []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <TextInput
        affinityFormat={affineFormats}
        allowSuggestions={true}
        autocomplete={false}
        autocompleteOnFocus={false}
        autoSkip={false}
        defaultValue={defaultValue}
        keyboardType="numeric"
        mask="[0000]{/}[00]{/}[00]"
        placeholder="0000/00/00"
      />
    </KeyboardAwareScrollView>
  );
};

export default DateScreen;
