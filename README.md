# React Native Advanced Input Mask

<div>
  <img align="right" src="./gifs/demo.gif?raw=true" width="30%">
</div>

## Overview

`react-native-advanced-input-mask` is a React Native package that provides flexible input masking functionality for mobile applications. It allows you to format input fields dynamically as users type, ensuring that data is entered in a consistent and valid format. This package wraps the `input-mask-android` library for Android and its equivalent for iOS, offering a cross-platform solution.

Input masking can be used to format text fields for phone numbers, dates, credit card numbers, social security numbers, and other input types that require specific formatting.

### Features

- Ensures smooth, flicker-free text formatting in a real time.
- Supports multiple mask types and formats.
- Instantly applies the correct format as users type, without delays.
- Cross-platform support for iOS, Android and web.
- Easy integration with existing React Native components.

Install the package using npm or yarn:

```bash
npm install react-native-advanced-input-mask
# or
yarn add react-native-advanced-input-mask
```

## Usage

Import `react-native-advanced-input-mask` in your component to apply masking to input fields.

### Basic Example

```typescript
import React, { useState, useCallback } from 'react';
import { TextInput, View } from 'react-native';
import { MaskedTextInput } from 'react-native-advanced-input-mask';

const ExampleComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const onChangeText = useCallback((formatted, extracted) => {
   setPhoneNumber(formatted)
  }, []);

  return (
    <MaskedTextInput
      autocomplete={false}
      mask="+1 ([000]) [000]-[0000]"
      value={phoneNumber}
      onChangeText={onChangeText}
      keyboardType="numeric"
    />
  );
};

export default ExampleComponent;
```

### UK IBAN:

```typescript
import React, { useState, useCallback } from 'react';
import { TextInput, View } from 'react-native';
import { MaskedTextInput } from 'react-native-advanced-input-mask';

const ExampleComponent = () => {
  const [IBAN, setIBAN] = useState('');

  const onChangeText = useCallback((formatted, extracted) => {
   setIBAN(formatted)
  }, []);

  return (
    <MaskedTextInput
      autocomplete={false}
      mask="GB[00] [____] [0000] [0000] [0000] [00]"
      value={IBAN}
      onChangeText={onChangeText}
    />
  );
};

export default ExampleComponent;
```

### Dates:

```typescript
import React, { useState, useCallback } from 'react';
import { TextInput, View } from 'react-native';
import { MaskedTextInput } from 'react-native-advanced-input-mask';

const ExampleComponent = () => {
  const [date, setDate] = useState('');

  const onChangeText = useCallback((formatted, extracted) => {
   setDate(formatted)
  }, []);

  return (
    <MaskedTextInput
      autocomplete={false}
      mask="[00]{.}[00]{.}[9900]"
      value={date}
      onChangeText={onChangeText}
    />
  );
};

export default ExampleComponent;
```

### Detailed Mask Explanation

The mask pattern defines how user input is processed and displayed. The characters below are used for defining patterns:

- `[0]`: mandatory digit. For instance, `[000]` will allow entering three digits: `123`.
- `[9]`: optional digit.For instance, `[00099]` will allow entering up to five digits, but at least three.
- `[A]`: mandatory letter. For instance, `[AAA]` will allow entering three letters: `ABC`.
- `[a]`: optional letter. `[АААааа]` will allow entering from three to six letters.
- `[_]`: mandatory symbol (digit or letter).
- `[-]`: optional symbol (digit or letter).
- `[…]`: ellipsis. Allows to enter endless count of symbols.

## Advanced Usage

For applications requiring conditional or more complex formatting, this package provides additional configuration options.

### MaskedTextInput Component - Props

| Prop                          | Type                                 | Description                                                                                                                                    |
|-------------------------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `mask`                        | `string`                             | The mask format to be applied to the text input, defining the pattern for formatting. Example: `"[0000] [0000] [0000] [0000]"`.               |
| `customNotations`             | `Notation[]`                         | Array of custom notations for the mask format. Each notation object includes: `character`, `characterSet`, and `isOptional`.                  |
| `allowedKeys`                  |`string`                              | A string specifying the characters that are permitted for input.                                                         |
| `onChangeText`                | `(formatted: string, extracted: string) => void` | Callback function triggered on text change. Receives `formattedValue` (with mask) and `extractedValue` (raw input).                        |
| `onTailPlaceholderChange`     | `(tailPlaceholder: string) => void`  | Callback function called when the tail placeholder changes, receiving the updated `tailPlaceholder` value.                                    |
| `affinityFormat`              | `string[]`                           | Array of strings for affinity format, used to determine the best mask format based on the input.                                              |
| `autocomplete`                | `boolean`                            | Enables or disables autocomplete for the text input. Default is `false`.                                                                      |
| `autoSkip`                    | `boolean`                            | Automatically skips to the next input field when the current one is filled. Default is `false`.                                               |
| `isRTL`                       | `boolean`                            | Enables right-to-left (RTL) text direction for the text input. Default is `false`.                                                            |
| `affinityCalculationStrategy` | `AFFINITY_CALCULATION_STRATEGY`      | Defines the strategy for affinity calculation, determining how the best mask format is selected based on input.                               |
| `customTransformation`        | `CustomTransformation`               | Custom transformation applied to the text input to define how the input text should be transformed.                                           |
| `defaultValue`                | `string`                             | The default value for the input field.                                                                                                        |
| `value`                       | `string`                             | Current value of the input field, allowing controlled input behavior.                                                                         |
| `allowSuggestions`            | `boolean` (iOS only)                | Enables or disables input suggestions on iOS. Default is `false`.                                                                             |
| `autocompleteOnFocus`         | `boolean` (iOS only)                | Enables autocomplete when the text input is focused (iOS only).                                                                               |
| `placeholder`                 | `string`                             | Placeholder text displayed in the input.                                                                                                      |
| `keyboardType`                | `string`                             | Sets the keyboard type. Useful for numeric masks with `keyboardType="numeric"`.                                                               |
| `autoFocus`                   | `boolean`                            | If `true`, focuses the input on component load. Default is `false`.                                                                           |

## Cookbook

Cookbook is a community-driven handbook with complete solutions for common problems.  
Text formatting problems, of course.

Feel free to suggest your own recipes or correct the existing ones.

## Chapters

* [Credit cards](#cards)
* [Amount inputs](#amount)
* [Dates](#date)
* [IBAN, International Bank Account Number](#iban)
* [Phone numbers](#phone)

<a name="cards" />

### Credit cards

MM/YY: `[00]{/}[00]`  
CVV: `[000]`

#### American Express

```
[0000] [000000] [00000]
3[000] [000000] [00000]
```

#### Diners Club International

```
[0000] [000000] [0000]
3[000] [000000] [0000]
```

#### Discover

```
[0000] [0000] [0000] [0000]
6[000] [0000] [0000] [0000]
```

#### MasterCard

```
[0000] [0000] [0000] [0000]
5[000] [0000] [0000] [0000]
```

#### Visa

```
[0000] [0000] [0000] [0000]
4[000] [0000] [0000] [0000]
```

<a name="amount" />

### Amount inputs

```
[0999990].[09]
```

> [!NOTE]
> To forbid entering not allowed characters, use `allowedKeys` prop. For example `allowedKeys="0123456789,."`.

<a name="date" />

### Dates

Affine formats:

```
[00]{/}[00]{/}[00]
[00]{/}[00]{/}[0000]
```

```
[00]{.}[00]{.}[00]
[00]{.}[00]{.}[0000]
```

<a name="iban" />

### IBAN, International Bank Account Number

#### Belgium

```
BE[00] [0000] [0000] [0000]
```

#### France

```
FR[00] [0000] [0000] [0000] [0000] [0000] [000]
```

#### Germany

```
DE[00] [0000] [0000] [0000] [0000] [00]
```

#### Greece	

```
GR[00] [0000] [0000] [0000] [0000] [0000] [000]
```

#### Romania	

```
RO[00] [____] [0000] [0000] [0000] [0000]
```

#### Saudi Arabia

```
SA[00] [0000] [0000] [0000] [0000] [0000]
```

#### Spain

```
ES[00] [0000] [0000] [0000] [0000] [0000]
```

#### Switzerland

```
CH[00] [0000] [0000] [0000] [0000] [0]
```

#### United Kingdom

```
GB[00] [____] [0000] [0000] [0000] [00]
```

<a name="phone" />

### Phone numbers

```
8 ([000]) [000]-[00]-[00]
```

## Custom notations

```tsx
import React, { useState, useCallback } from 'react';
import { TextInput, View } from 'react-native';
import { MaskedTextInput } from 'react-native-advanced-input-mask';


const alphaNumericChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const charAlphaNumerics = [
  {
    character: '$',
    characterSet: alphaNumericChars,
    isOptional: false,
  },
];


const ExampleComponent = () => {
  const [text, setText] = useState('');

  const onChangeText = useCallback((formatted, extracted) => {
   setText(formatted)
  }, []);

  return (
    <MaskedTextInput
      mask="[$$$$$$$$$$$]"
      value={text}
      onChangeText={onChangeText}
    />
  );
};

```

## Contributing

To contribute to this package, clone the repository and install dependencies:
```bash
git clone https://github.com/IvanIhnatsiuk/react-native-advanced-input-mask
cd react-native-advanced-input-mask && yarn install
```
