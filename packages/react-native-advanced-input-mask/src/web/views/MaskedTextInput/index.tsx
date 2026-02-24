import React, { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { TextInput } from "react-native";

import useMaskedTextInputListener from "../../hooks/useMaskedTextInputListener";

import type { MaskedTextInputProps } from "../../../types";

const MaskedTextInput = forwardRef<TextInput | null, MaskedTextInputProps>(
  (
    {
      affinityCalculationStrategy,
      affinityFormat,
      autocomplete = true,
      autoSkip = false,
      customNotations,
      isRTL = false,
      mask,
      autoCapitalize = "words",
      allowedKeys,
      defaultValue,
      onChange,
      onChangeText,
      onTailPlaceholderChange,
      onFocus,
      renderTextInputComponent,
      validationRegex,
      ...rest
    },
    ref,
  ) => {
    const InputComponent = renderTextInputComponent ?? TextInput;

    const inputRef = useRef<TextInput>(null);

    const {
      defaultValue: maskedDefaultValue,
      handleFocus,
      handleOnChange,
      setTextField,
    } = useMaskedTextInputListener({
      mask,
      affinityFormat,
      affinityCalculationStrategy,
      customNotations,
      allowedKeys,
      autocomplete,
      autoSkip,
      isRTL,
      onChange,
      onChangeText,
      onTailPlaceholderChange,
      onFocus,
      validationRegex,
      defaultValue,
    });

    useImperativeHandle<TextInput | null, TextInput | null>(
      ref,
      () => {
        setTextField(inputRef.current as unknown as HTMLInputElement);

        return inputRef.current;
      },
      [setTextField, inputRef],
    );

    return (
      <InputComponent
        ref={inputRef}
        autoCapitalize={autoCapitalize}
        defaultValue={maskedDefaultValue}
        onChange={handleOnChange}
        onFocus={handleFocus}
        {...rest}
      />
    );
  },
);

export default memo(MaskedTextInput);
