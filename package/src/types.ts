import type { AFFINITY_CALCULATION_STRATEGY } from "./enums";
import type { ElementType, JSX } from "react";
import type { TextInputProps } from "react-native";

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

export type MaskedTextInputOwnProps = {
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
   * Callback function to be called when the text changes.
   * @param formattedValue The formatted value.
   * @param extractedValue The extracted value.
   * @param tailPlaceholder tail placeholder value.
   * @param complete a boolean flag indicating that the extracted value is complete
   */
  onChangeText?: (
    formattedValue: string,
    extractedValue: string,
    tailPlaceholder: string,
    complete: boolean,
  ) => void;
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
   * Default is true.
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
  /**
   * Custom transformation to be applied to the text input.
   * Defines how the input text should be transformed.
   */
  customTransformation?: CustomTransformation;
  /**
   * A string representing all symbols that can be entered in the text input.
   * For example: "0123456789".
   */
  allowedKeys?: string;
  defaultValue?: string;
  value?: string;
  // IOS only props
  /**
   * Whether to allow suggestions for the text input on iOS.
   * @default false.
   */
  allowSuggestions?: boolean;
  autocompleteOnFocus?: boolean;
  renderTextInputComponent?:
    | ElementType
    | ((props: TextInputProps) => JSX.Element);
  /**
   * A validation regex that runs before applying the mask.
   *
   * ⚠️ Use this only when absolutely necessary. Prefer using `allowedKeys` with `affinityFormat` instead.
   */
  validationRegex?: string;
};

export type MaskedTextInputRef = {
  setText: (text: string, autocomplete?: boolean) => void;
  clear: () => void;
  blur: () => void;
  isFocused: () => boolean;
  focus: () => void;
  setNativeProps: (props: object) => void;
  setSelection: (start: number, end: number) => void;
};

export type MaskedTextInputProps = Omit<TextInputProps, "onChangeText"> &
  MaskedTextInputOwnProps;
