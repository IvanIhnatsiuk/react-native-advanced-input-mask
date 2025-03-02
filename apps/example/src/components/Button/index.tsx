import React, { memo, useMemo, type FC } from "react";
import { Text, View, type StyleProp, type ViewStyle } from "react-native";
import styles from "./styles";
import Touchable from "../replicas/touchables";
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
