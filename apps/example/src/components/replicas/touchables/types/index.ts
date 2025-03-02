import type { ComponentType } from "react";
import type {
  ColorValue,
  Falsy,
  Insets,
  RecursiveArray,
  RegisteredStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";

import type { GenericTouchableProps as TouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchableProps";

export type GenericTouchableProps = {
  hitSlop?: Insets;
  disabled?: boolean;
  style?:
    | (ViewStyle[] &
        RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>)
    | StyleProp<ViewStyle>
    | (AnimatedStyle<ViewStyle> & StyleProp<ViewStyle>);
  onPress?: () => void;
  onPressIn?: () => void;
} & TouchableProps;

export type TouchableHighlightProps = GenericTouchableProps & {
  overlayColor?: ColorValue;
};

// For cross-platform usage we have to specify both platform-specific properties
export type TouchableCrossPlatformProps = TouchableHighlightProps &
  TouchableNativeFeedbackProps;

export type TouchableComponentType = ComponentType<TouchableCrossPlatformProps>;
export type TouchableNativeFeedbackProps = GenericTouchableProps & {
  background?: ColorValue;
  duration?: number;
  borderless?: boolean;
  rippleRadius?: number;
};
