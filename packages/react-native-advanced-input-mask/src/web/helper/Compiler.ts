import { FIXED_STATE_TYPES, OPTIONAL_STATE_TYPES } from "../model/constants";
import EOLState from "../model/state/EOLState";
import FixedState from "../model/state/FixedState";
import FreeState from "../model/state/FreeState";
import OptionalValueState from "../model/state/OptionalValueState";
import ValueState from "../model/state/ValueState";

import FormatError from "./FormatError";
import FormatSanitizer from "./FormatSanitizer";

import type { Notation } from "../../types";
import type State from "../model/state/State";
import type { StateType } from "../model/types";

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
    lastCharacter: string | null,
  ): State {
    if (!formatString) {
      return new EOLState(null);
    }

    const char = formatString.charAt(0);

    switch (char) {
      case "[":
        if (lastCharacter !== "\\") {
          return this.compileInternal(formatString.slice(1), true, false, char);
        }
        break;
      case "{":
        if (lastCharacter !== "\\") {
          return this.compileInternal(formatString.slice(1), false, true, char);
        }
        break;
      case "]":
      case "}":
        if (lastCharacter !== "\\") {
          return this.compileInternal(
            formatString.slice(1),
            false,
            false,
            char,
          );
        }
        break;
      case "\\":
        if (lastCharacter !== "\\") {
          return this.compileInternal(
            formatString.slice(1),
            valuable,
            fixed,
            char,
          );
        }
        break;
    }

    if (valuable) {
      switch (char) {
        case "0":
          return new ValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            FIXED_STATE_TYPES.numeric,
          );
        case "A":
          return new ValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            FIXED_STATE_TYPES.literal,
          );
        case "_":
          return new ValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            FIXED_STATE_TYPES.alphaNumeric,
          );
        case "…":
          // Ellipses remain elliptical: re-construct inherited type from lastCharacter
          return new ValueState(
            null,
            this.determineInheritedType(lastCharacter),
          );
        case "9":
          return new OptionalValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            OPTIONAL_STATE_TYPES.numeric,
          );
        case "a":
          return new OptionalValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            OPTIONAL_STATE_TYPES.literal,
          );
        case "-":
          return new OptionalValueState(
            this.compileInternal(formatString.substring(1), true, false, char),
            OPTIONAL_STATE_TYPES.alphaNumeric,
          );
        default:
          return this.compileWithCustomNotations(
            char,
            formatString.substring(1),
          );
      }
    }

    if (fixed) {
      return new FixedState(
        this.compileInternal(formatString.slice(1), false, true, char),
        char,
      );
    }

    // Not in valuable or fixed => treat as FreeState
    return new FreeState(
      this.compileInternal(formatString.slice(1), false, false, char),
      char,
    );
  }

  private determineInheritedType(
    lastCharacter: string | null,
  ): StateType | Notation {
    switch (lastCharacter) {
      case "0":
      case "9":
        return FIXED_STATE_TYPES.numeric;
      case "A":
      case "a":
        return FIXED_STATE_TYPES.literal;
      case "_":
      case "-":
      case "…":
      case "[":
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
              customNotation,
            )
          : new ValueState(
              this.compileInternal(remaining, true, false, char),
              customNotation,
            );
      }
    }

    throw new FormatError();
  }

  private determineTypeWithCustomNotations(
    lastCharacter: string | null,
  ): Notation {
    if (lastCharacter === null || lastCharacter === undefined) {
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
