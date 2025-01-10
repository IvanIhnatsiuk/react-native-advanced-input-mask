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
  tailPlaceholder: string;
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
  affinityCalculationStrategy?: Int32;
  affinityFormat?: ReadonlyArray<string>;
  allowSuggestions?: boolean;
  autocomplete?: boolean;
  autocompleteOnFocus?: boolean;
  autoSkip?: boolean;
  customNotations?: ReadonlyArray<Notation>;
  customTransformation?: CustomTransformation;
  defaultValue?: string;
  isRTL?: boolean;
  onAdvancedMaskTextChange?: DirectEventHandler<OnAdvancedMaskTextChange>;
  primaryMaskFormat: string;
  value?: string;
}

export default codegenNativeComponent<NativeProps>(
  'AdvancedTextInputMaskDecoratorView'
) as HostComponent<NativeProps>;
