import type { ViewProps } from 'react-native';
import type { AFFINITY_CALCULATION_STRATEGY } from './enums';

export type Notation = {
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

export type MaskedTextInputDecoratorViewNativeProps = ViewProps & {
  primaryMaskFormat: string;
  customNotations?: Notation[];
  onAdvancedMaskTextChange: (
    extractedValue: string,
    formattedValue: string
  ) => void;
  affinityFormat?: string[];
  autocomplete?: boolean;
  autoSkip?: boolean;
  isRTL?: boolean;
  affinityCalculationStrategy?: AFFINITY_CALCULATION_STRATEGY;
  secureTextEntry?: boolean;
  customTransformation?: {
    transformationChar: string;
    transformationString: string;
  };
  defaultValue?: string;
  value?: string;
  // IOS only props
  allowSuggestions?: boolean;
  autocompleteOnFocus?: boolean;
};
