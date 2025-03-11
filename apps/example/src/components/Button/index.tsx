import React, { type FC, memo, useMemo } from "react";
import { type StyleProp, Text, View, type ViewStyle } from "react-native";

import Touchable from "../replicas/touchables";

import styles from "./styles";

import type { TouchableCrossPlatformProps } from "../replicas/touchables/types";

type Props = TouchableCrossPlatformProps & {
  title: string;
  style?: StyleProp<ViewStyle>;
};

const Button: FC<Props> = ({ title, style, ...rest }) => {
  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () => [styles.container, style],
    [style],
  );

  return (
    <View style={containerStyle}>
      <Touchable {...rest} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{title}</Text>
      </Touchable>
    </View>
  );
};

export default memo(Button);
