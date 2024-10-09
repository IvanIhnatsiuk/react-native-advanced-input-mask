import type { TextInputProps } from 'react-native';
import { TextInput } from 'react-native';
import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import MaskedTextInputDecoratorView from './MaskedTextInputNative';
import type { MaskedTextInputDecoratorViewProps } from './types';

type MaskedTextInputProps = Omit<
  TextInputProps,
  'onChangeText' | 'autocomplete'
> &
  MaskedTextInputDecoratorViewProps;

const MaskedTextInput = memo<MaskedTextInputProps>(
  forwardRef<TextInput, MaskedTextInputProps>(
    (
      {
        affinityCalculationStrategy,
        affinityFormat,
        autocompleteOnFocus,
        autoSkip,
        autocomplete,
        maskFormat,
        customNotations,
        customTransformation,
        allowSuggestions,
        isRTL,
        onChangeText,
        ...rest
      },
      ref
    ) => {
      const onChangeTextCallback = useCallback(
        ({ nativeEvent: { extracted, formatted } }) =>
          onChangeText(extracted, formatted),
        [onChangeText]
      );

      const mask = useMemo(
        () => ({
          maskFormat,
          customNotations,
        }),
        [maskFormat, customNotations]
      );

      return (
        <>
          <TextInput {...rest} ref={ref} />
          <MaskedTextInputDecoratorView
            affinityCalculationStrategy={affinityCalculationStrategy}
            autocompleteOnFocus={autocompleteOnFocus}
            affinityFormat={affinityFormat}
            allowSuggestions={allowSuggestions}
            autocomplete={autocomplete}
            autoSkip={autoSkip}
            isRTL={isRTL}
            mask={mask}
            customTransformation={customTransformation}
            onChangeText={onChangeTextCallback}
          />
        </>
      );
    }
  )
);

export default MaskedTextInput;
