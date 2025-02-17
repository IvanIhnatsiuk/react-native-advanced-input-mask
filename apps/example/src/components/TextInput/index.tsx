import React, { memo, type FC } from "react";
import { TextInput as RNTextInput, Text } from "react-native";
import {
  MaskedTextInput,
  type MaskedTextInputProps,
} from "react-native-advanced-input-mask";
import styles from "./styles";
import Button from "../Button";
import BaseTextInput from "../BaseTextInput";

type Props = MaskedTextInputProps & {
  controlled?: boolean;
  initialValue?: string;
};

const TextInput: FC<Props> = (props) => {
  const {
    controlled,
    initialValue,
    onChangeText,
    onFocus,
    onBlur,
    style,
    ...rest
  } = props;

  const inputRef = React.useRef<RNTextInput>(null);

  const [textState, setTextState] = React.useState({
    extracted: initialValue,
    formatted: initialValue,
  });

  const [focused, setFocused] = React.useState(false);

  const handleTextChange = React.useCallback(
    (formatted: string, extracted: string) => {
      onChangeText?.(formatted, extracted);
      setTextState({ extracted, formatted });
    },
    [onChangeText],
  );

  const handleFocus = React.useCallback(
    (e) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = React.useCallback(
    (e) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const handleClearTextButtonPress = React.useCallback(() => {
    if (!controlled) {
      inputRef.current?.clear();
    }
    setTextState({ extracted: "", formatted: "" });
  }, [controlled]);

  const handleFocusButtonPress = React.useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Text style={styles.text}>extracted value {textState.extracted}</Text>
      <Text style={styles.text}>formatted value {textState.formatted}</Text>
      <Text style={styles.text}>focused {focused ? "Yes" : "No"}</Text>
      <MaskedTextInput
        ref={inputRef}
        {...rest}
        renderTextInputComponent={BaseTextInput}
        style={style}
        onBlur={handleBlur}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
        value={controlled ? textState.formatted : undefined}
      />
      <Button
        style={styles.button}
        title="Clear text"
        onPress={handleClearTextButtonPress}
      />
      <Button
        style={styles.button}
        title="Focus text input"
        onPress={handleFocusButtonPress}
      />
    </>
  );
};

export default memo(TextInput);
