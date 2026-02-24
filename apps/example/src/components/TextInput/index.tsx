import React, { type FC, memo } from "react";
import { Text, type TextInputFocusEvent } from "react-native";
import {
  MaskedTextInput,
  type MaskedTextInputProps,
} from "react-native-advanced-input-mask";

import BaseTextInput from "../BaseTextInput";
import Button from "../Button";

import styles from "./styles";

import type { MaskedTextInputRef } from "react-native-advanced-input-mask";

type Props = MaskedTextInputProps & {
  controlled?: boolean;
  initialValue?: string;
};

const TextInput: FC<Props> = (props) => {
  const {
    controlled = false,
    initialValue,
    onChangeText,
    onFocus,
    onBlur,
    style,
    defaultValue,
    ...rest
  } = props;

  const inputRef = React.useRef<MaskedTextInputRef>(null);

  const [textState, setTextState] = React.useState({
    extracted: initialValue || defaultValue,
    formatted: initialValue || defaultValue,
  });

  const [focused, setFocused] = React.useState(false);

  const handleTextChange = React.useCallback(
    (
      formatted: string,
      extracted: string,
      tailPlaceholder: string,
      complete: boolean,
    ) => {
      onChangeText?.(formatted, extracted, tailPlaceholder, complete);
      setTextState({ extracted, formatted });
    },
    [onChangeText],
  );

  const handleFocus = React.useCallback(
    (e: TextInputFocusEvent) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = React.useCallback(
    (e: TextInputFocusEvent) => {
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

  const handleSetText = React.useCallback(() => {
    inputRef.current?.setText("999999", false);
  }, []);

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
        defaultValue={defaultValue}
        renderTextInputComponent={BaseTextInput}
        style={style}
        value={controlled ? textState.formatted : undefined}
        onBlur={handleBlur}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
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
      <Button
        style={styles.button}
        title={"Set text"}
        onPress={handleSetText}
      />
    </>
  );
};

export default memo(TextInput);
