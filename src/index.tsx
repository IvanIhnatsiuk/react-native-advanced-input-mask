import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import React, { forwardRef, memo, useCallback } from 'react';
import MaskedTextInputDecoratorView from './MaskedTextInputNative';
import type { MaskedTextInputDecoratorViewProps } from './types';

type MaskedTextInputProps = Omit<
  TextInputProps,
  'onChangeText' | 'autocomplete'
> &
  MaskedTextInputDecoratorViewProps;

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
        primaryMaskFormat,
        autoCapitalize = 'words',
        value,
        onChangeText,
        ...rest
      },
      ref
    ) => {
      const IS_FABRIC = 'nativeFabricUIManager' in global;

      const onChangeTextCallback = useCallback(
        ({ nativeEvent: { extracted, formatted } }) =>
          onChangeText(extracted, formatted),
        [onChangeText]
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
            onChangeText={onChangeTextCallback}
            primaryMaskFormat={primaryMaskFormat}
            style={IS_FABRIC ? styles.farAway : styles.displayNone}
            value={value}
          />
        </>
      );
    }
  )
);

export default MaskedTextInput;
