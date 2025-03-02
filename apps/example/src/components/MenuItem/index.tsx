import React, { memo, useCallback } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import Touchable from "../replicas/touchables";

export type Props<T = undefined> = {
  title: string;
  onPress: (info?: T) => void;
  info?: T;
  testId: string;
  emoji: string;
};

const MenuItem = <T,>(props: Props<T>) => {
  const { title, onPress, info, testId, emoji } = props;

  const handlePress = useCallback(() => {
    onPress(info);
  }, [info, onPress]);

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

export default memo(MenuItem);
