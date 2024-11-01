import { StyleSheet, TextInput } from 'react-native';
import React, { forwardRef, memo, useCallback } from 'react';
import { PhoneInputMaskDecoratorView } from '../../nativeviews';
import type { PhoneInputProps } from '../../types';

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

const PhoneInput = memo<PhoneInputProps>(
  forwardRef<TextInput, PhoneInputProps>(
    (
      {
        affinityCalculationStrategy,
        allowSuggestions,
        autocomplete,
        autocompleteOnFocus,
        autoSkip,
        defaultValue,
        isRTL,
        autoCapitalize = 'words',
        value,
        onChangeText,
        ...rest
      },
      ref
    ) => {
      const IS_FABRIC = 'nativeFabricUIManager' in global;

      const onAdvancedMaskTextChangeCallback = useCallback(
        ({ nativeEvent: { extracted, formatted } }) => {
          onChangeText?.(formatted, extracted);
        },
        [onChangeText]
      );

      return (
        <>
          <TextInput {...rest} autoCapitalize={autoCapitalize} ref={ref} />
          <PhoneInputMaskDecoratorView
            affinityCalculationStrategy={affinityCalculationStrategy}
            allowSuggestions={allowSuggestions}
            autocomplete={autocomplete}
            autocompleteOnFocus={autocompleteOnFocus}
            autoSkip={autoSkip}
            defaultValue={defaultValue}
            isRTL={isRTL}
            onPhoneInputMaskChangeText={onAdvancedMaskTextChangeCallback}
            style={IS_FABRIC ? styles.farAway : styles.displayNone}
            value={value}
          />
        </>
      );
    }
  )
);

export default PhoneInput;
