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

export type MaskedTextInputDecoratorViewNativeProps = {
  mask: {
    maskFormat: string;
    customNotations?: Notation[];
  };
  onChangeText: (extractedValue: string, formattedValue: string) => void;
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
  // IOS only props
  allowSuggestions?: boolean;
  autocompleteOnFocus?: boolean;
};

export type MaskedTextInputDecoratorViewProps = Omit<
  MaskedTextInputDecoratorViewNativeProps,
  'mask'
> & {
  maskFormat: string;
  customNotations?: Notation[];
};
