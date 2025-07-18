import codegenNativeCommands from "react-native/Libraries/Utilities/codegenNativeCommands";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

import type { HostComponent } from "react-native";
import type { ViewProps } from "react-native/Libraries/Components/View/ViewPropTypes";
import type {
  DirectEventHandler,
  Int32,
} from "react-native/Libraries/Types/CodegenTypes";

export type OnAdvancedMaskTextChange = Readonly<{
  extracted: string;
  formatted: string;
  tailPlaceholder: string;
  complete: boolean;
}>;

type CustomTransformation = {
  transformationChar: string;
  transformationString: string;
};

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
  customTransformation?: Readonly<CustomTransformation>;
  allowedKeys?: string;
  defaultValue?: string;
  isRTL?: boolean;
  onAdvancedMaskTextChange?: DirectEventHandler<OnAdvancedMaskTextChange>;
  primaryMaskFormat: string;
  value?: string;
  validationRegex?: string;
}

export interface NativeCommands {
  setText: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    text: string,
    autocomplete: boolean,
  ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ["setText"],
});

export default codegenNativeComponent<NativeProps>(
  "AdvancedTextInputMaskDecoratorView",
) as HostComponent<NativeProps>;
