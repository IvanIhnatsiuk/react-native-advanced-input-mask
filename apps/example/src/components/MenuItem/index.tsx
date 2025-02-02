import React, { memo, useCallback } from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles';

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
    <Pressable style={styles.container} testID={testId} onPress={handlePress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.emoji}>{emoji}</Text>
    </Pressable>
  );
};

export default memo(MenuItem);
