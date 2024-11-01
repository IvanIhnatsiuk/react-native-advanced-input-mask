import React, { type FC } from 'react';
import { Button, Text } from 'react-native';
import {
  MaskedTextInput,
  type MaskedTextInputProps,
} from 'react-native-advanced-input-mask';

type Props = MaskedTextInputProps & {
  title: string;
};

const MaskInput: FC<Props> = ({ title, ...rest }) => {
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
      <Text>{title}</Text>
      <Text>extracted value {textState.extracted}</Text>
      <Text>formatted value {textState.formatted}</Text>
      <MaskedTextInput
        {...rest}
        value={textState.formatted}
        onChangeText={onChangeText}
      />
      <Button title="Clear text" onPress={clearText} />
    </>
  );
};

export default MaskInput;
