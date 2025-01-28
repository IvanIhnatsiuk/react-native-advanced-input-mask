import CaretString from '../model/CaretString';
import { StateName, type MaskResult, type Next } from '../model/types';
import type { Notation } from '../../types';
import State from '../model/state/State';
import Compiler from './Compiler';
import EOLState from '../model/state/EOLState';
import FixedState from '../model/state/FixedState';
import FreeState from '../model/state/FreeState';
import OptionalValueState from '../model/state/OptionalValueState';
import ValueState from '../model/state/ValueState';
import CaretStringIterator from './CaretStringIterator';
import { OPTIONAL_LITERAL_CHARACTER } from '../model/constants';
import { reverse } from './string';
import AutocompletionStack from './AutoCompelitionStack';

export class Mask {
  private static cache: Map<string, Mask> = new Map();
  private initialState: State;

  constructor(format: string, customNotations: Notation[] = []) {
    this.initialState = new Compiler(customNotations).compile(format);
  }

  static getOrCreate(format: string, customNotations: Notation[]): Mask {
    const cachedMask = Mask.cache.get(format);
    if (!cachedMask) {
      const newMask = new Mask(format, customNotations);
      Mask.cache.set(format, newMask);
      return newMask;
    }
    return cachedMask;
  }

  static isValid(format: string, customNotations: Notation[]): boolean {
    try {
      this.getOrCreate(format, customNotations);
      return true;
    } catch (e) {
      return false;
    }
  }

  apply(text: CaretString): MaskResult {
    const iterator = this.makeIterator(text);

    let affinity = 0;
    let extractedValue = '';
    let modifiedString = '';
    let modifiedCaretPosition = text.caretPosition;

    let state: State = this.initialState;
    const autocompletionStack = new AutocompletionStack();

    let insertionAffectsCaret = iterator.insertionAffectsCaret();
    let deletionAffectsCaret = iterator.deletionAffectsCaret();
    let character = iterator.next();

    while (character !== null) {
      const next: Next | null = state.accept(character);
      if (next) {
        if (deletionAffectsCaret) {
          autocompletionStack.push(state.autocomplete());
        }
        state = next.state;
        if (next.insert) {
          modifiedString += next.insert;
        }
        if (next.value) {
          extractedValue += next.value;
        }
        if (next.pass) {
          insertionAffectsCaret = iterator.insertionAffectsCaret();
          deletionAffectsCaret = iterator.deletionAffectsCaret();
          character = iterator.next();
          affinity += 1;
        } else {
          if (insertionAffectsCaret && next.insert) {
            modifiedCaretPosition += 1;
          }
          affinity -= 1;
        }
      } else {
        if (deletionAffectsCaret) {
          modifiedCaretPosition -= 1;
        }
        insertionAffectsCaret = iterator.insertionAffectsCaret();
        deletionAffectsCaret = iterator.deletionAffectsCaret();
        character = iterator.next();
        affinity -= 1;
      }
    }

    while (text.caretGravity.autocomplete && insertionAffectsCaret) {
      const next: Next | null = state.autocomplete();
      if (!next) break;
      state = next.state;
      if (next.insert) {
        modifiedString += next.insert;
        modifiedCaretPosition += 1;
      }
      if (next.value) {
        extractedValue += next.value;
      }
    }

    let tailState = state;
    let tail = '';

    while (text.caretGravity.autoskip && !autocompletionStack.empty()) {
      const skip: Next = autocompletionStack.pop();
      if (modifiedString.length === modifiedCaretPosition) {
        if (skip.insert && skip.insert === modifiedString.slice(-1)) {
          modifiedString = modifiedString.slice(0, -1);
          modifiedCaretPosition -= 1;
        }
        if (skip.value && skip.value === extractedValue.slice(-1)) {
          extractedValue = extractedValue.slice(0, -1);
        }
      } else {
        if (skip.insert) {
          modifiedCaretPosition -= 1;
        }
      }
      tailState = skip.state;
      tail = skip.insert ? skip.insert : tail;
    }

    const tailPlaceholder = this.appendPlaceholder(tailState, tail);

    const result: MaskResult = {
      formattedText: new CaretString(
        modifiedString,
        modifiedCaretPosition,
        text.caretGravity
      ),
      extractedValue,
      affinity,
      complete: this.noMandatoryCharactersLeftAfterState(state),
      tailPlaceholder,
      reversed() {
        return {
          formattedText: this.formattedText.reversed(),
          extractedValue: reverse(this.extractedValue),
          affinity: this.affinity,
          complete: this.complete,
          tailPlaceholder: reverse(this.tailPlaceholder),
          reversed: this.reversed,
        };
      },
    };
    return result;
  }

  makeIterator(text: CaretString): CaretStringIterator {
    return new CaretStringIterator(text);
  }

  placeholder: () => string = () =>
    this.appendPlaceholder(this.initialState, '');

  private computeLength(includeOptional: boolean, onlyValue: boolean): number {
    let length = 0;
    let current: State | null = this.initialState;

    while (current && !(current instanceof EOLState)) {
      if (onlyValue) {
        if (
          current instanceof ValueState ||
          current instanceof FixedState ||
          (includeOptional && current instanceof OptionalValueState)
        ) {
          length++;
        }
      } else {
        if (
          current instanceof FreeState ||
          current instanceof FixedState ||
          current instanceof ValueState ||
          (includeOptional && current instanceof OptionalValueState)
        ) {
          length++;
        }
      }
      current = current.child;
    }
    return length;
  }

  acceptableTextLength(): number {
    return this.computeLength(false, false);
  }

  totalTextLength(): number {
    return this.computeLength(true, false);
  }

  acceptableValueLength(): number {
    return this.computeLength(false, true);
  }

  totalValueLength(): number {
    return this.computeLength(true, true);
  }

  private appendPlaceholder(state: State | null, placeholder: string): string {
    if (!state) {
      return placeholder;
    }

    if (state instanceof EOLState) {
      return placeholder;
    }

    if (state instanceof FreeState || state instanceof FixedState) {
      return this.appendPlaceholder(
        state.child,
        placeholder + state.ownCharacter
      );
    }

    if (state instanceof ValueState || state instanceof OptionalValueState) {
      if ('name' in state.stateType) {
        switch (state.stateType.name) {
          case StateName.alphaNumeric:
            return this.appendPlaceholder(
              state.child,
              placeholder + OPTIONAL_LITERAL_CHARACTER
            );
          case StateName.literal:
            return this.appendPlaceholder(
              state.child,
              placeholder + OPTIONAL_LITERAL_CHARACTER
            );
          case StateName.numeric:
            return this.appendPlaceholder(state.child, placeholder + '0');
          case 'ellipsis':
            return placeholder;
        }
      }

      return this.appendPlaceholder(
        state.child,
        placeholder + state.stateType.character
      );
    }
    return placeholder;
  }

  private noMandatoryCharactersLeftAfterState(state: State): boolean {
    if (state instanceof EOLState) {
      return true;
    }
    if (state instanceof ValueState) {
      return state.isElliptical;
    }
    if (state instanceof FixedState) {
      return false;
    }
    return this.noMandatoryCharactersLeftAfterState(state.nextState());
  }
}

export default Mask;
