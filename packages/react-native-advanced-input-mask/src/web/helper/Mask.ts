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
          extractedValue: this.extractedValue.split('').reverse().join(''),
          affinity: this.affinity,
          complete: this.complete,
          tailPlaceholder: this.tailPlaceholder.split('').reverse().join(''),
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

  acceptableTextLength(): number {
    let state: State | null = this.initialState;
    let length = 0;
    while (state && !(state instanceof EOLState)) {
      if (
        state instanceof FixedState ||
        state instanceof FreeState ||
        state instanceof ValueState
      ) {
        length += 1;
      }
      state = state.child;
    }
    return length;
  }

  totalTextLength(): number {
    let state: State | null = this.initialState;
    let length = 0;
    while (state && !(state instanceof EOLState)) {
      if (
        state instanceof FixedState ||
        state instanceof FreeState ||
        state instanceof ValueState ||
        state instanceof OptionalValueState
      ) {
        length += 1;
      }
      state = state.child;
    }
    return length;
  }

  acceptableValueLength(): number {
    let state: State | null = this.initialState;
    let length = 0;
    while (state && !(state instanceof EOLState)) {
      if (state instanceof FixedState || state instanceof ValueState) {
        length += 1;
      }
      state = state.child;
    }
    return length;
  }

  totalValueLength(): number {
    let state: State | null = this.initialState;
    let length = 0;
    while (state && !(state instanceof EOLState)) {
      if (
        state instanceof FixedState ||
        state instanceof ValueState ||
        state instanceof OptionalValueState
      ) {
        length += 1;
      }
      state = state.child;
    }
    return length;
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
            return this.appendPlaceholder(state.child, placeholder + '-');
          case StateName.literal:
            return this.appendPlaceholder(state.child, placeholder + 'a');
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

class AutocompletionStack extends Array<Next> {
  push(item: Next | null): number {
    if (item == null) {
      this.length = 0;
      return 0;
    }
    return super.push(item);
  }

  pop(): Next {
    return super.pop()!;
  }

  empty(): boolean {
    return this.length === 0;
  }
}

export default Mask;
