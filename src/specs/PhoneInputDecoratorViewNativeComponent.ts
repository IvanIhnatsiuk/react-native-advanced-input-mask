import type { HostComponent } from 'react-native';
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type onPhoneInputMaskChangeText = Readonly<{
  extracted: string;
  formatted: string;
  tailPlaceholder: string;
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

type Country = {
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

export interface NativeProps extends ViewProps {
  allowSuggestions?: boolean;
  autocomplete?: boolean;
  autocompleteOnFocus?: boolean;
  autoSkip?: boolean;
  customNotations?: ReadonlyArray<Notation>;
  defaultValue?: string;
  isRTL?: boolean;
  onPhoneInputMaskChangeText?: DirectEventHandler<onPhoneInputMaskChangeText>;
  value?: string;
  enableCountries?: ReadonlyArray<string>;
  disableCountries?: ReadonlyArray<string>;
  customCountries?: ReadonlyArray<Country>;
}

export default codegenNativeComponent<NativeProps>(
  'PhoneInputMaskDecoratorView'
) as HostComponent<NativeProps>;
