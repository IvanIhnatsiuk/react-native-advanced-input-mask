import type { FC } from 'react';
import React from 'react';
import { Button, Text, View } from 'react-native';
import MaskedTextInput, {
  type MaskedTextInputProps,
} from 'react-native-advanced-input-mask';
import styles from './styles';

type Props = {
  title: string;
} & MaskedTextInputProps;

const AdvancedTextInput: FC<Props> = ({ title, ...rest }) => {
  const [textState, setTextState] = React.useState({
    extracted: '',
    formatted: '',
  });

  const onChangeText = React.useCallback((formatted, extracted) => {
    console.log('extracted:', extracted, 'formatted:', formatted);
    setTextState({ extracted, formatted });
  }, []);

  const clearText = React.useCallback(() => {
    setTextState({ extracted: '', formatted: '' });
  }, []);

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text>extracted value {textState.extracted}</Text>
      <Text>formatted value {textState.formatted}</Text>
      <View>
        <MaskedTextInput
          {...rest}
          value={textState.formatted}
          style={styles.textInput}
          onChangeText={onChangeText}
          onTailPlaceholderChange={console.log}
        />
      </View>
      <Button title="Clear text" onPress={clearText} />
    </>
  );
};

export default AdvancedTextInput;
