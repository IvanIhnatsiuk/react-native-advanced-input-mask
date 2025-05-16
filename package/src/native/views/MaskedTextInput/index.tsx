import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { StyleSheet, TextInput } from "react-native";

import { IS_FABRIC } from "../../architecture";
import AdvancedTextInputMaskDecoratorViewNativeComponent from "../../specs/AdvancedTextInputMaskDecoratorViewNativeComponent";
import { Commands } from "../../specs/AdvancedTextInputMaskDecoratorViewNativeComponent";

import type { MaskedTextInputProps, MaskedTextInputRef } from "../../../types";
import type {
  NativeCommands,
  NativeProps,
} from "../../specs/AdvancedTextInputMaskDecoratorViewNativeComponent";
import type { Component } from "react";
import type { NativeSyntheticEvent } from "react-native";

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

const MaskedTextInput = forwardRef<MaskedTextInputRef, MaskedTextInputProps>(
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
    const inputRef = useRef<TextInput>(null);
    const maskedViewDecoratorRef = useRef<
      Component<NativeProps, object> & NativeCommands
    >(null);
    const InputComponent = renderTextInputComponent ?? TextInput;

    useImperativeHandle(ref, () => {
      return {
        isFocused: () => !!inputRef.current?.isFocused(),
        blur: () => {
          inputRef.current?.blur();
        },
        focus: () => {
          inputRef.current?.focus();
        },
        setNativeProps: (props: object) => {
          inputRef.current?.setNativeProps(props);
        },
        clear: () => {
          if (maskedViewDecoratorRef.current) {
            // @ts-expect-error the type is correct
            Commands.setText(maskedViewDecoratorRef.current, "", false);
          }
        },
        setSelection: (start: number, end: number) => {
          inputRef.current?.setSelection(start, end);
        },
        setText: (text: string, autoComplete?: boolean) => {
          if (maskedViewDecoratorRef.current) {
            Commands.setText(
              // @ts-expect-error the type is correct
              maskedViewDecoratorRef.current,
              text,
              !!autoComplete,
            );
          }
        },
      };
    });

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
        <InputComponent
          {...rest}
          ref={inputRef}
          autoCapitalize={autoCapitalize}
        />
        <AdvancedTextInputMaskDecoratorViewNativeComponent
          // @ts-expect-error the type is correct
          ref={maskedViewDecoratorRef}
          affinityCalculationStrategy={affinityCalculationStrategy}
          affinityFormat={affinityFormat}
          allowedKeys={allowedKeys}
          allowSuggestions={allowSuggestions}
          autocomplete={autocomplete}
          autocompleteOnFocus={autocompleteOnFocus}
          autoSkip={autoSkip}
          customNotations={customNotations}
          customTransformation={customTransformation}
          defaultValue={defaultValue}
          isRTL={isRTL}
          primaryMaskFormat={mask}
          style={IS_FABRIC ? styles.farAway : styles.displayNone}
          validationRegex={validationRegex}
          value={value}
          onAdvancedMaskTextChange={onAdvancedMaskTextChangeCallback}
        />
      </>
    );
  },
);

export default memo(MaskedTextInput);
