import { AFFINITY_CALCULATION_STRATEGY } from './enums';
import type { MaskedTextInputProps } from './types';
import AdvancedTextInputMaskListener from './web/AdvancedTextInputMaskListener';
import useMaskedTextInputListener from './web/hooks/useMaskedTextInputListener';
import MaskedTextInput from './web/views/MaskedTextInput';

export type { MaskedTextInputProps };

export { AFFINITY_CALCULATION_STRATEGY };

export {
  AdvancedTextInputMaskListener,
  MaskedTextInput,
  useMaskedTextInputListener,
};
