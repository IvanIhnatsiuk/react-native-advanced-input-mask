import React, { useCallback } from "react";
import { Text, View } from "react-native";

import Touchable from "../replicas/touchables";

import styles from "./styles";

export type PressParams<T> = {
  info: T;
  title: string;
  emoji: string;
};

export type Props<T> = {
  title: string;
  info: T;
  testId: string;
  emoji: string;
  onPress: (params: PressParams<T>) => void;
};

const MenuItem = <T,>(props: Props<T>) => {
  const { title, onPress, info, testId, emoji } = props;

  const handlePress = useCallback(() => {
    onPress({ info, title, emoji });
  }, [emoji, info, onPress, title]);

  return (
    <View style={styles.container}>
      <Touchable
        style={styles.contentContainer}
        testID={testId}
        onPress={handlePress}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.emoji}>{emoji}</Text>
      </Touchable>
    </View>
  );
};

export default MenuItem;
