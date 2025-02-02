import React, { memo, useMemo, type FC } from 'react';
import {
  Animated,
  TextInput as RNTextInput,
  Text,
  useAnimatedValue,
} from 'react-native';
import {
  MaskedTextInput,
  type MaskedTextInputProps,
} from 'react-native-advanced-input-mask';
import styles, {
  DEFAULT_BORDER_COLOR,
  FOCUSED_BORDER_COLOR,
  PLACEHOLDER_COLOR,
} from './styles';
import Button from '../Button';

type Props = MaskedTextInputProps & {
  controlled?: boolean;
  initialValue?: string;
};

const AnimatedTextInputView = Animated.createAnimatedComponent(RNTextInput);

const TextInput: FC<Props> = (props) => {
  const {
    controlled,
    initialValue,
    onChangeText,
    onFocus,
    onBlur,
    style,
    ...rest
  } = props;

  const progress = useAnimatedValue(0);

  const inputRef = React.useRef<RNTextInput>(null);

  const [textState, setTextState] = React.useState({
    extracted: initialValue,
    formatted: initialValue,
  });

  const [focused, setFocused] = React.useState(false);

  const handleTextChange = React.useCallback(
    (formatted: string, extracted: string) => {
      onChangeText?.(formatted, extracted);
      setTextState({ extracted, formatted });
    },
    [onChangeText]
  );

  const handleFocus = React.useCallback(
    (e) => {
      Animated.timing(progress, {
        duration: 350,
        toValue: 1,
        useNativeDriver: true,
      }).start();
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus, progress]
  );

  const handleBlur = React.useCallback(
    (e) => {
      Animated.timing(progress, {
        duration: 350,
        toValue: 0,
        useNativeDriver: true,
      }).start();
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur, progress]
  );

  const handleClearTextButtonPress = React.useCallback(() => {
    if (!controlled) {
      inputRef.current?.clear();
    }
    setTextState({ extracted: '', formatted: '' });
  }, [controlled]);

  const handleFocusButtonPress = React.useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const inputStyle = useMemo(
    () => [
      styles.input,
      style,
      {
        borderColor: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_BORDER_COLOR, FOCUSED_BORDER_COLOR],
        }),
      },
    ],
    [progress, style]
  );

  return (
    <>
      <Text style={styles.text}>extracted value {textState.extracted}</Text>
      <Text style={styles.text}>formatted value {textState.formatted}</Text>
      <Text style={styles.text}>focused {focused ? 'Yes' : 'No'}</Text>
      <MaskedTextInput
        ref={inputRef}
        {...rest}
        TextInputView={AnimatedTextInputView}
        placeholderTextColor={progress.interpolate({
          inputRange: [0, 1],
          outputRange: [PLACEHOLDER_COLOR, FOCUSED_BORDER_COLOR],
        })}
        style={inputStyle}
        onBlur={handleBlur}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
        value={controlled ? textState.formatted : undefined}
      />
      <Button
        style={styles.button}
        title="Clear text"
        onPress={handleClearTextButtonPress}
      />
      <Button
        style={styles.button}
        title="Focus text input"
        onPress={handleFocusButtonPress}
      />
    </>
  );
};

export default memo(TextInput);
