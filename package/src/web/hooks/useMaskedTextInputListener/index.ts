import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MaskedTextChangedListener from "../../AdvancedTextInputMaskListener";
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
} from "react-native";
import type { Props } from "./types";
import CaretString from "../../model/CaretString";
import { CaretGravityType } from "../../model/types";

const useMaskedTextInputListener = ({
  autocompleteOnFocus,
  mask,
  affinityFormat,
  affinityCalculationStrategy,
  customNotations,
  allowedKeys = "",
  autocomplete = true,
  autoSkip = false,
  isRTL = false,
  onChange,
  onChangeText,
  onTailPlaceholderChange,
  onFocus,
  defaultValue,
  validationRegex,
}: Props) => {
  const prevDispatchedPayload = useRef<{
    extracted: string;
    formatted: string;
  }>({ extracted: "", formatted: "" });

  const isInitialMount = useRef(true);

  const [listener] = useState<MaskedTextChangedListener>(
    () =>
      new MaskedTextChangedListener(
        mask,
        affinityFormat,
        customNotations,
        affinityCalculationStrategy,
        autocomplete,
        autoSkip,
        isRTL,
        allowedKeys,
        validationRegex,
        autocompleteOnFocus,
        defaultValue,
      ),
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      return;
    }

    if (listener.affineFormats !== affinityFormat && affinityFormat) {
      listener.affineFormats = affinityFormat;
    }

    if (listener.customNotations !== customNotations && customNotations) {
      listener.customNotations = customNotations;
    }

    if (
      listener.affinityCalculationStrategy !== affinityCalculationStrategy &&
      affinityCalculationStrategy !== undefined
    ) {
      listener.affinityCalculationStrategy = affinityCalculationStrategy;
    }

    if (listener.autocomplete !== autocomplete) {
      listener.autocomplete = autocomplete;
    }

    if (listener.autoskip !== autoSkip) {
      listener.autoskip = autoSkip;
    }

    if (listener.primaryFormat !== mask) {
      listener.primaryFormat = mask;
    }

    if (listener.allowedKeys !== allowedKeys) {
      listener.setAllowedKeys(allowedKeys);
    }

    if (listener.rightToLeft !== isRTL) {
      listener.rightToLeft = isRTL;
    }

    if (listener.getValidationRegex() !== validationRegex) {
      listener.setValidationRegex(validationRegex);
    }

    if (listener.autocompleteOnFocus !== autocompleteOnFocus) {
      listener.autocompleteOnFocus = autocompleteOnFocus;
    }

    if (defaultValue !== listener.defaultValue) {
      listener.setText(defaultValue ?? "", false);
    }
  }, [
    autocompleteOnFocus,
    validationRegex,
    affinityFormat,
    customNotations,
    mask,
    isRTL,
    autoSkip,
    autocomplete,
    affinityCalculationStrategy,
    allowedKeys,
    listener,
    defaultValue,
  ]);

  const handleOnChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const { tailPlaceholder, formattedText, extractedValue } =
        listener.handleTextChange(e);

      const formattedValue = formattedText.string;

      if (
        prevDispatchedPayload.current.extracted === extractedValue &&
        prevDispatchedPayload.current.formatted === formattedValue
      ) {
        return;
      }

      onChange?.(e);
      onChangeText?.(formattedValue, extractedValue);
      onTailPlaceholderChange?.(tailPlaceholder);

      prevDispatchedPayload.current = {
        extracted: extractedValue,
        formatted: formattedValue,
      };
    },
    [listener, onChange, onChangeText, onTailPlaceholderChange],
  );

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      listener.handleFocus(e);
      onFocus?.(e);
    },
    [listener, onFocus],
  );

  const defaultValueResult = useMemo(
    () =>
      defaultValue
        ? listener.primaryMask.apply(
            new CaretString(defaultValue, defaultValue.length, {
              autocomplete: true,
              autoskip: false,
              type: CaretGravityType.Forward,
            }),
          ).formattedText.string
        : undefined,
    [defaultValue, listener.primaryMask],
  );

  return {
    setTextField: listener.setTextField,
    handleOnChange,
    handleFocus,
    listener,
    defaultValue: defaultValueResult,
    inputRef: listener.textField,
  };
};

export default useMaskedTextInputListener;
