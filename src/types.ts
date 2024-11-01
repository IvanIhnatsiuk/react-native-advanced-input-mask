import type { TextInputProps } from 'react-native';
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

type CustomTransformation = {
  transformationChar: string;
  transformationString: string;
};

type CommonInputProps = Omit<TextInputProps, 'onChangeText'> & {
  /**
   * Callback function to be called when the text changes.
   * @param formattedValue The formatted value.
   * @param extractedValue The extracted value.
   */
  onChangeText?: (formattedValue: string, extractedValue: string) => void;
  /**
   * Whether to enable autocomplete for the text input.
   * Default is false.
   */
  autocomplete?: boolean;
  /**
   * Whether to automatically skip to the next input field when the current one is filled.
   * @default false.
   */
  autoSkip?: boolean;
  /**
   * Whether the text input should support right-to-left (RTL) text direction.
   * @default false.
   */
  isRTL?: boolean;
  /**
   * The strategy to use for affinity calculation.
   * Determines how the best mask format is selected based on the input.
   */
  affinityCalculationStrategy?: AFFINITY_CALCULATION_STRATEGY;
  defaultValue?: string;
  value?: string;
  // IOS only props
  /**
   * Whether to allow suggestions for the text input on iOS.
   * @default false.
   */
  allowSuggestions?: boolean;
  autocompleteOnFocus?: boolean;
};

export type MaskedTextInputProps = CommonInputProps & {
  /**
   * The mask format to be applied to the text input.
   * @example "[0000] [0000] [0000] [0000]"
   */
  mask: string;
  /**
   * Custom notations to be used in the mask format.
   * Each notation should be an object containing:
   * - character: The character to be replaced in the mask.
   * - characterSet: The set of characters that can replace the notation character.
   * - isOptional: Whether the notation character is optional.
   */
  customNotations?: Notation[];
  /**
   * Callback function to be called when tail placeholder changes.
   * @param tailPlaceholder The tail placeholder.
   */
  onTailPlaceholderChange?: (tailPlaceholder: string) => void;
  /**
   * An array of strings representing the affinity format.
   * Used to determine the best mask format based on the input.
   */
  affinityFormat?: string[];
  /**
   * Whether to enable autocomplete for the text input.
   * Default is false.
   */
  customTransformation?: CustomTransformation;
};

export type Country = {
  /**
   * International country name.
   */
  name: string;

  /**
   * Country name in its own language.
   */
  nameNative?: string;

  /**
   * Country emoji.
   */
  emoji: string;

  /**
   * Country ISO-3166 code, 2 valters.
   */
  iso3166alpha2: string;

  /**
   * Country ISO-3166 code, 3 valters.
   */
  iso3166alpha3: string;

  /**
   * Country dial code.
   */
  countryCode: string;

  /**
   * Primary ``Mask`` format for the country phone numbers.
   */
  primaryFormat: string;

  /**
   * Affine ``Mask`` formats for the country phone numbers.
   */
  affineFormats: ReadonlyArray<string>;

  /**
   * A regular expression to detect whether or not the entered digits correspond to this particular country.
   */
  phoneRegex: string;
};

export type PhoneInputProps = CommonInputProps & {
  enableCountries?: string[];
  disableCountries?: string[];
  customCountries?: Country[];
};
