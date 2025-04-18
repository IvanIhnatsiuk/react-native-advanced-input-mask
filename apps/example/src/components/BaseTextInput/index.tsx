import { forwardRef, memo, useCallback, useMemo } from "react";
import React from "react";
import {
  type NativeSyntheticEvent,
  TextInput,
  type TextInputFocusEventData,
  type TextInputProps,
} from "react-native";
import Reanimated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import styles, {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_BORDER_COLOR,
  FOCUSED_BORDER_COLOR,
  PLACEHOLDER_COLOR,
  PRESSED_BACKGROUND_COLOR,
} from "./styles";

const AnimatedTextInputView = Reanimated.createAnimatedComponent(TextInput);

const BaseTextInput = forwardRef<TextInput, TextInputProps>(
  ({ onBlur, onFocus, style, ...rest }, ref) => {
    const progress = useSharedValue(0);
    const backgroundColorProgress = useSharedValue(0);

    const animateTo = useCallback(
      (focused: boolean) => {
        progress.set(withTiming(focused ? 1 : 0, { duration: 350 }));
      },
      [progress],
    );

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        animateTo(true);
        onFocus?.(e);
      },
      [onFocus, animateTo],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        animateTo(false);
        onBlur?.(e);
      },
      [onBlur, animateTo],
    );

    const handlePressIn = useCallback(() => {
      if (progress.get() === 0) {
        backgroundColorProgress.set(withTiming(1, { duration: 150 }));
      }
    }, [backgroundColorProgress, progress]);

    const handlePressOut = useCallback(() => {
      backgroundColorProgress.set(withTiming(0, { duration: 450 }));
    }, [backgroundColorProgress]);

    const animatedStyle = useAnimatedStyle(
      () => ({
        backgroundColor: interpolateColor(
          backgroundColorProgress.get(),
          [0, 1],
          [DEFAULT_BACKGROUND_COLOR, PRESSED_BACKGROUND_COLOR],
        ),
        borderColor: interpolateColor(
          progress.get(),
          [0, 1],
          [DEFAULT_BORDER_COLOR, FOCUSED_BORDER_COLOR],
        ),
      }),
      [backgroundColorProgress],
    );

    const inputStyle = useMemo(
      () => [styles.input, style, animatedStyle],
      [style, animatedStyle],
    );

    return (
      <AnimatedTextInputView
        ref={ref}
        {...rest}
        placeholderTextColor={PLACEHOLDER_COLOR}
        style={inputStyle}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      />
    );
  },
);

export default memo(BaseTextInput);
