import { TextInput } from 'react-native';
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import type { MaskedTextInputProps } from '../../types';

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
    const textInputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => textInputRef.current as TextInput);

    const onAdvancedMaskTextChangeCallback = useCallback(
      ({ nativeEvent: { extracted, formatted, tailPlaceholder } }) => {
        onChangeText?.(formatted, extracted);
        onTailPlaceholderChange?.(tailPlaceholder);
      },
      [onChangeText, onTailPlaceholderChange]
    );

    useEffect(() => {}, [ref]);

    return <TextInput ref={textInputRef} {...rest} />;
  }
);
export default memo(MaskedTextInput);
