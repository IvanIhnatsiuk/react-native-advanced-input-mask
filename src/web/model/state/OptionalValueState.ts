import type { Notation } from '../../../types';
import { NULL_STRING } from '../constants';
import type { Next, StateType } from '../types';
import { getCharacterTypeString } from '../utils';
import State from './State';

class OptionalValueState extends State {
  stateType: StateType | Notation;

  constructor(child: State, stateType: StateType | Notation) {
    super(child);
    this.stateType = stateType;
  }

  private accepts = (character: string): boolean => {
    if (this.stateType) {
      if ('name' in this.stateType) {
        return this.stateType.regex.test(character);
      }

      return this.stateType.characterSet.includes(character);
    }

    return false;
  };

  accept = (character: string): Next =>
    this.accepts(character)
      ? {
          state: this.nextState(),
          insert: character,
          pass: true,
          value: character,
        }
      : { state: this.nextState(), insert: null, pass: false, value: null };

  toString = (): string => {
    const typeStr = getCharacterTypeString(this.stateType);

    return `${typeStr} -> ${this.child?.toString() ?? NULL_STRING}`;
  };
}

export default OptionalValueState;
