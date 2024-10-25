import type { HostComponent } from 'react-native';
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {
  DirectEventHandler,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type OnAdvancedMaskTextChange = Readonly<{
  extracted: string;
  formatted: string;
}>;

type CustomTransformation = Readonly<{
  transformationChar: string;
  transformationString: string;
}>;

type Notation = {
  /**
   * A symbol in format string.
   */
  character: string;
  /**
   * An associated character set of acceptable input characters.
   */
  characterSet: string;
  /**
   * Is it an optional symbol or mandatory?
   */
  isOptional: boolean;
};

export interface NativeProps extends ViewProps {
  primaryMaskFormat: string;
  customNotations?: ReadonlyArray<Notation>;
  onAdvancedMaskTextChange?: DirectEventHandler<OnAdvancedMaskTextChange>;
  affinityFormat?: ReadonlyArray<string>;
  autocomplete?: boolean;
  autoSkip?: boolean;
  isRTL?: boolean;
  affinityCalculationStrategy?: Int32;
  customTransformation?: CustomTransformation;
  defaultValue?: string;
  value?: string;
  // IOS only props
  allowSuggestions?: boolean;
  autocompleteOnFocus?: boolean;
}

export default codegenNativeComponent<NativeProps>(
  'AdvancedTextInputMaskDecoratorView'
) as HostComponent<NativeProps>;
