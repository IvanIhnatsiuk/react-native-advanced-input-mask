import { StyleSheet, TextInput, type NativeSyntheticEvent } from "react-native";
import React, { forwardRef, memo, useCallback } from "react";
import MaskedTextInputDecoratorView from "../../MaskedTextInputNative";
import type { MaskedTextInputProps } from "../../../types";
import { IS_FABRIC } from "../../architecture";

const styles = StyleSheet.create({
  displayNone: {
    display: "none",
  },
  farAway: {
    position: "absolute",
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
      allowedKeys,
      autocomplete,
      autocompleteOnFocus,
      autoSkip,
      customNotations,
      customTransformation,
      defaultValue,
      isRTL,
      mask,
      autoCapitalize = "words",
      value,
      onChangeText,
      onTailPlaceholderChange,
      renderTextInputComponent,
      validationRegex,
      ...rest
    },
    ref,
  ) => {
    const InputComponent = renderTextInputComponent ?? TextInput;

    const onAdvancedMaskTextChangeCallback = useCallback(
      ({
        nativeEvent: { extracted, formatted, tailPlaceholder },
      }: NativeSyntheticEvent<{
        extracted: string;
        formatted: string;
        tailPlaceholder: string;
      }>) => {
        onChangeText?.(formatted, extracted);
        onTailPlaceholderChange?.(tailPlaceholder);
      },
      [onChangeText, onTailPlaceholderChange],
    );

    return (
      <>
        <InputComponent {...rest} autoCapitalize={autoCapitalize} ref={ref} />
        <MaskedTextInputDecoratorView
          allowedKeys={allowedKeys}
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
          validationRegex={validationRegex}
          value={value}
        />
      </>
    );
  },
);
export default memo(MaskedTextInput);
