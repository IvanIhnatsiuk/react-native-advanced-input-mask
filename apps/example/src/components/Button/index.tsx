import React, { memo, useMemo, type FC } from 'react';
import {
  Pressable,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import styles, { ANDROID_PRESSABLE_RIPPLE } from './styles';

type Props = PressableProps & {
  title: string;
  style?: StyleProp<ViewStyle>;
};

const Button: FC<Props> = ({ title, style, ...rest }) => {
  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () => [styles.buttonContainer, style],
    [style]
  );

  return (
    <Pressable
      android_ripple={ANDROID_PRESSABLE_RIPPLE}
      {...rest}
      style={containerStyle}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default memo(Button);
