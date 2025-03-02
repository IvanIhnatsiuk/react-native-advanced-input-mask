import type { FC } from "react";
import React, { memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Reanimated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import type { TouchableHighlightProps } from "../types";

const noop = () => {};

const TouchableHighlight: FC<TouchableHighlightProps> = ({
  children,
  disabled,
  onPress = noop,
  style,
  overlayColor = "rgba(0,0,0,0.1)",
  ...rest
}) => {
  const opacity = useSharedValue(0);

  const gesture = useMemo(
    () =>
      Gesture.Tap()
        .onBegin((event) => {
          console.log(event.numberOfPointers);
          opacity.value = withTiming(1, { duration: 150 });
        })
        .onEnd(() => runOnJS(onPress)())
        .onFinalize(() => {
          opacity.value = withTiming(0, { duration: 450 });
        })
        .enabled(!disabled),
    [disabled, opacity, onPress],
  );

  const highlight = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      backgroundColor: overlayColor,
    }),
    [overlayColor],
  );

  const highlightStyle = useMemo(
    () => [StyleSheet.absoluteFillObject, highlight],
    [highlight],
  );

  return (
    <GestureDetector gesture={gesture}>
      <Reanimated.View style={style} {...rest}>
        {children}
        <Reanimated.View style={highlightStyle} />
      </Reanimated.View>
    </GestureDetector>
  );
};

export default memo(TouchableHighlight);
