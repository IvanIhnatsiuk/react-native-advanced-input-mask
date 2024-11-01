import type { NativeProps } from './specs/AdvancedTextInputMaskDecoratorViewNativeComponent';
import type { NativeProps as PhoneInputNativeProps } from './specs/PhoneInputDecoratorViewNativeComponent';
import type { FC } from 'react';

const MaskedTextInputDecoratorView: FC<NativeProps> =
  require('./specs/AdvancedTextInputMaskDecoratorViewNativeComponent').default;

const PhoneInputMaskDecoratorView: FC<PhoneInputNativeProps> =
  require('./specs/PhoneInputDecoratorViewNativeComponent').default;

export { MaskedTextInputDecoratorView, PhoneInputMaskDecoratorView };
