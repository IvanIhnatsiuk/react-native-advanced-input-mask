import { memo } from "react";
import { Platform } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import TouchableHighlight from "./TouchableHighlight";

import type { TouchableComponentType } from "./types";

const Touchable = Platform.select({
  ios: TouchableHighlight as TouchableComponentType,
  default: memo(RectButton) as TouchableComponentType,
});

export default Touchable;
