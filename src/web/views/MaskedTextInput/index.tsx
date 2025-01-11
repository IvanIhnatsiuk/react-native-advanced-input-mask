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
      onChange,
      onChangeText,
      onTailPlaceholderChange,
      onFocus,
      ...rest
    },
    ref
  ) => {
    const { handleOnChange, handleFocus } = useMaskedTextInputListener({
      mask,
      affinityFormat,
      affinityCalculationStrategy,
      customNotations,
      autocomplete,
      autoSkip,
      isRTL,
      onChange,
      onChangeText,
      onTailPlaceholderChange,
      onFocus,
    });

    return (
      <TextInput
        ref={ref}
        autoCapitalize={autoCapitalize}
        onChange={handleOnChange}
        onFocus={handleFocus}
        {...rest}
      />
    );
  }
);
export default memo(MaskedTextInput);
