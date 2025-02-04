import { TextInput } from 'react-native';
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import type { MaskedTextInputProps } from '../../../types';
import useMaskedTextInputListener from '../../hooks/useMaskedTextInputListener';

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
      autoCapitalize = 'words',
      transformation,
      allowedKeys,
      defaultValue,
      onChange,
      onChangeText,
      onTailPlaceholderChange,
      onFocus,
      ...rest
    },
    ref
  ) => {
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
      transformation,
      autocomplete,
      autoSkip,
      isRTL,
      onChange,
      onChangeText,
      onTailPlaceholderChange,
      onFocus,
      defaultValue,
    });

    useImperativeHandle<TextInput | null, TextInput | null>(
      ref,
      () => {
        setTextField(inputRef.current as unknown as HTMLInputElement);

        return inputRef.current;
      },
      [setTextField, inputRef]
    );

    return (
      <TextInput
        ref={inputRef}
        autoCapitalize={autoCapitalize}
        defaultValue={maskedDefaultValue}
        onChange={handleOnChange}
        onFocus={handleFocus}
        {...rest}
      />
    );
  }
);
export default memo(MaskedTextInput);
