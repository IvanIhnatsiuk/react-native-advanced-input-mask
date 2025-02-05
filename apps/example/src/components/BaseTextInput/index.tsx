import { Animated, TextInput, type TextInputProps } from 'react-native';
import { forwardRef, memo, useCallback, useMemo } from 'react';
import useAnimatedValue from '../../hooks/react-native/useAnimatedValue';
import React from 'react';
import styles, { DEFAULT_BORDER_COLOR, FOCUSED_BORDER_COLOR } from './styles';

const AnimatedTextInputView = Animated.createAnimatedComponent(TextInput);

const BaseTextInput = forwardRef<TextInput, TextInputProps>(
  ({ onBlur, onFocus, style, ...rest }, ref) => {
    const progress = useAnimatedValue(0);

    const animateTo = useCallback(
      (focused: boolean) => {
        Animated.timing(progress, {
          duration: 350,
          toValue: focused ? 1 : 0,
          useNativeDriver: true,
        }).start();
      },
      [progress]
    );

    const handleFocus = useCallback(
      (e) => {
        animateTo(true);
        onFocus?.(e);
      },
      [onFocus, animateTo]
    );

    const handleBlur = useCallback(
      (e) => {
        animateTo(false);
        onBlur?.(e);
      },
      [onBlur, animateTo]
    );

    const inputStyle = useMemo(
      () => [
        styles.input,
        style,
        {
          borderColor: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_BORDER_COLOR, FOCUSED_BORDER_COLOR],
          }),
        },
      ],
      [progress, style]
    );

    return (
      <AnimatedTextInputView
        ref={ref}
        {...rest}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={inputStyle}
      />
    );
  }
);

export default memo(BaseTextInput);
