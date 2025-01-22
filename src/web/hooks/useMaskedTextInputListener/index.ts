import { useCallback, useEffect, useRef, useState } from 'react';
import MaskedTextChangedListener from '../../AdvancedTextInputMaskListener';
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
} from 'react-native';
import type { Props } from './types';

const useMaskedTextInputListener = ({
  mask,
  affinityFormat,
  affinityCalculationStrategy,
  customNotations,
  allowedKeys = '',
  autocomplete = true,
  autoSkip = false,
  isRTL = false,
  onChange,
  onChangeText,
  onTailPlaceholderChange,
  onFocus,
}: Props) => {
  const prevDispatchedPayload = useRef<{
    extracted: string;
    formatted: string;
  }>({ extracted: '', formatted: '' });

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
        allowedKeys
      )
  );

  useEffect(() => {
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
      listener.allowedKeys = allowedKeys;
    }

    if (listener.rightToLeft !== isRTL) {
      listener.rightToLeft = isRTL;
    }
  }, [
    affinityFormat,
    customNotations,
    mask,
    isRTL,
    autoSkip,
    autocomplete,
    affinityCalculationStrategy,
    allowedKeys,
    listener,
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
    [listener, onChange, onChangeText, onTailPlaceholderChange]
  );

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      listener.handleFocus(e);
      onFocus?.(e);
    },
    [listener, onFocus]
  );

  return { handleOnChange, handleFocus, listener };
};

export default useMaskedTextInputListener;
