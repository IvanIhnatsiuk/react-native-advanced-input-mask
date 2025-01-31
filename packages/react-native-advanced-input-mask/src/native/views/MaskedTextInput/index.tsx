import React, { forwardRef, memo, useCallback } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import MaskedTextInputDecoratorView from '../../MaskedTextInputNative';
import type { MaskedTextInputProps } from '../../../types';

const styles = StyleSheet.create({
  displayNone: {
    display: 'none',
  },
  farAway: {
    position: 'absolute',
    top: 1e8,
    left: 1e8,
  },
});

const MaskedTextInput = forwardRef<TextInput, MaskedTextInputProps>(
  (
    {
      affinityCalculationStrategy,
      affinityFormat,
      allowSuggestions,
      autocomplete,
      autocompleteOnFocus,
      autoSkip,
      customNotations,
      customTransformation,
      allowedKeys,
      defaultValue,
      isRTL,
      mask,
      autoCapitalize = 'words',
      value,
      onChangeText,
      onTailPlaceholderChange,
      ...rest
    },
    ref
  ) => {
    const IS_FABRIC = 'nativeFabricUIManager' in global;

    const onAdvancedMaskTextChangeCallback = useCallback(
      ({ nativeEvent: { extracted, formatted, tailPlaceholder } }) => {
        onChangeText?.(formatted, extracted);
        onTailPlaceholderChange?.(tailPlaceholder);
      },
      [onChangeText, onTailPlaceholderChange]
    );

    return (
      <>
        <TextInput {...rest} autoCapitalize={autoCapitalize} ref={ref} />
        <MaskedTextInputDecoratorView
          affinityCalculationStrategy={affinityCalculationStrategy}
          affinityFormat={affinityFormat}
          allowSuggestions={allowSuggestions}
          autocomplete={autocomplete}
          autocompleteOnFocus={autocompleteOnFocus}
          autoSkip={autoSkip}
          customNotations={customNotations}
          customTransformation={customTransformation}
          allowedKeys={allowedKeys}
          defaultValue={defaultValue}
          isRTL={isRTL}
          onAdvancedMaskTextChange={onAdvancedMaskTextChangeCallback}
          primaryMaskFormat={mask}
          style={IS_FABRIC ? styles.farAway : styles.displayNone}
          value={value}
        />
      </>
    );
  }
);
export default memo(MaskedTextInput);
