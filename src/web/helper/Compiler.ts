import State from '../model/state/State';
import EOLState from '../model/state/EOLState';
import FixedState from '../model/state/FixedState';
import FreeState from '../model/state/FreeState';
import OptionalValueState from '../model/state/OptionalValueState';
import ValueState from '../model/state/ValueState';
import type { StateType } from '../model/types';
import FormatSanitizer from './FormatSanitizer';
import type { Notation } from '../../types';
import {
  CLOSE_CURLY_BRACKET,
  CLOSE_SQUARE_BRACKET,
  ELLIPSIS_CHARACTER,
  ESCAPE_CHARACTER,
  FIXED_ALPHA_NUMERIC_CHARACTER,
  FIXED_LITERAL_CHARACTER,
  FIXED_NUMERIC_CHARACTER,
  FIXED_STATE_TYPES,
  OPEN_CURLY_BRACKET,
  OPEN_SQUARE_BRACKET,
  OPTIONAL_ALPHA_NUMERIC_CHARACTER,
  OPTIONAL_LITERAL_CHARACTER,
  OPTIONAL_NUMERIC_CHARACTER,
  OPTIONAL_STATE_TYPES,
} from '../model/constants';
import FormatError from './FormatError';

export default class Compiler {
  private customNotations: Notation[];

  constructor(customNotations: Notation[]) {
    this.customNotations = customNotations;
  }

  compile(formatString: string): State {
    const sanitizedString = FormatSanitizer.sanitize(formatString);
    return this.compileInternal(sanitizedString, false, false, null);
  }

  private compileInternal(
    formatString: string,
    valuable: boolean,
    fixed: boolean,
    lastCharacter: string | null
  ): State {
    if (!formatString) {
      return new EOLState(null);
    }

    const char = formatString.charAt(0);

    switch (char) {
      case OPEN_SQUARE_BRACKET:
        if (lastCharacter !== ESCAPE_CHARACTER) {
          return this.compileInternal(formatString.slice(1), true, false, char);
        }
        break;
      case OPEN_CURLY_BRACKET:
        if (lastCharacter !== ESCAPE_CHARACTER) {
          return this.compileInternal(formatString.slice(1), false, true, char);
        }
        break;
      case CLOSE_CURLY_BRACKET:
      case CLOSE_SQUARE_BRACKET:
        if (lastCharacter !== ESCAPE_CHARACTER) {
          return this.compileInternal(
            formatString.slice(1),
            false,
            false,
            char
          );
        }
        break;
      case ESCAPE_CHARACTER:
        if (lastCharacter !== ESCAPE_CHARACTER) {
          return this.compileInternal(
            formatString.slice(1),
            valuable,
            fixed,
            char
          );
        }
        break;
    }

    if (valuable) {
      switch (char) {
        case FIXED_NUMERIC_CHARACTER:
          return new ValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            FIXED_STATE_TYPES.numeric
          );
        case FIXED_LITERAL_CHARACTER:
          return new ValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            FIXED_STATE_TYPES.literal
          );
        case FIXED_ALPHA_NUMERIC_CHARACTER:
          return new ValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            FIXED_STATE_TYPES.alphaNumeric
          );
        case ELLIPSIS_CHARACTER:
          // Ellipses remain elliptical: re-construct inherited type from lastCharacter
          return new ValueState(
            null,
            this.determineInheritedType(lastCharacter)
          );
        case OPTIONAL_NUMERIC_CHARACTER:
          return new OptionalValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            OPTIONAL_STATE_TYPES.numeric
          );
        case OPTIONAL_LITERAL_CHARACTER:
          return new OptionalValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            OPTIONAL_STATE_TYPES.literal
          );
        case OPTIONAL_ALPHA_NUMERIC_CHARACTER:
          return new OptionalValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            OPTIONAL_STATE_TYPES.alphaNumeric
          );
        default:
          return this.compileWithCustomNotations(
            char,
            formatString.substring(1)
          );
      }
    }

    if (fixed) {
      return new FixedState(
        this.compileInternal(formatString.slice(1), false, true, char),
        char
      );
    }

    // Not in valuable or fixed => treat as FreeState
    return new FreeState(
      this.compileInternal(formatString.slice(1), false, false, char),
      char
    );
  }

  private determineInheritedType(
    lastCharacter: string | null
  ): StateType | Notation {
    switch (lastCharacter) {
      case FIXED_NUMERIC_CHARACTER:
      case OPTIONAL_NUMERIC_CHARACTER:
        return FIXED_STATE_TYPES.numeric;
      case FIXED_LITERAL_CHARACTER:
      case OPTIONAL_LITERAL_CHARACTER:
        return FIXED_STATE_TYPES.literal;
      case FIXED_ALPHA_NUMERIC_CHARACTER:
      case OPTIONAL_ALPHA_NUMERIC_CHARACTER:
      case ELLIPSIS_CHARACTER:
      case OPEN_SQUARE_BRACKET:
        return FIXED_STATE_TYPES.alphaNumeric;
      default:
        return this.determineTypeWithCustomNotations(lastCharacter);
    }
  }

  private compileWithCustomNotations(char: string, remaining: string): State {
    for (const customNotation of this.customNotations) {
      if (customNotation.character === char) {
        return customNotation.isOptional
          ? new OptionalValueState(
              this.compileInternal(remaining, true, false, char),
              customNotation
            )
          : new ValueState(
              this.compileInternal(remaining, true, false, char),
              customNotation
            );
      }
    }
    throw new FormatError();
  }

  private determineTypeWithCustomNotations(
    lastCharacter: string | null
  ): Notation {
    if (lastCharacter == null) {
      throw new FormatError();
    }
    for (const notation of this.customNotations) {
      if (notation.character === lastCharacter) {
        return notation;
      }
    }
    throw new FormatError();
  }
}
