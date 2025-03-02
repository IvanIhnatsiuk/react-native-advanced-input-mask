import { Platform } from "react-native";

import TouchableHighlight from "./TouchableHighlight";
import { RectButton } from "react-native-gesture-handler";
import type { TouchableComponentType } from "./types";
import { memo } from "react";

const Touchable = Platform.select({
  ios: TouchableHighlight as TouchableComponentType,
  default: memo(RectButton) as TouchableComponentType,
});

export default Touchable;
