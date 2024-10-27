import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import React, { forwardRef, memo, useCallback } from 'react';
import MaskedTextInputDecoratorView from './MaskedTextInputNative';
import type { MaskedTextInputDecoratorViewNativeProps } from './types';

type MaskedTextInputProps = Omit<TextInputProps, 'onChangeText'> &
  MaskedTextInputDecoratorViewNativeProps;

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

const MaskedTextInput = memo<MaskedTextInputProps>(
  forwardRef<TextInput, MaskedTextInputProps>(
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
  )
);

export default MaskedTextInput;
