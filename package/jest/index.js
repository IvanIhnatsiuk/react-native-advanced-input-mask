import { TextInput } from 'react-native';

export const AFFINITY_CALCULATION_STRATEGY = {
  WHOLE_STRING: 0,
  PREFIX: 1,
  CAPACITY: 2,
  EXTRACTED_VALUE_CAPACITY: 3,
};

const mock = {
  MaskedTextInput: TextInput,
  AFFINITY_CALCULATION_STRATEGY,
};

module.exports = mock;
