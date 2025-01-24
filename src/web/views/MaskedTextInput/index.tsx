import { TextInput } from 'react-native';
import React, { forwardRef, memo } from 'react';
import type { MaskedTextInputProps } from '../../../types';
import useMaskedTextInputListener from '../../hooks/useMaskedTextInputListener';

const MaskedTextInput = forwardRef<TextInput, MaskedTextInputProps>(
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
    const {
      defaultValue: maskedDefaultValue,
      handleFocus,
      handleOnChange,
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
      defaultValue,
    });

    return (
      <TextInput
        ref={ref}
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
