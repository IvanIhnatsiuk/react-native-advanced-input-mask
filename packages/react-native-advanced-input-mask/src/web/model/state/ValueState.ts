import State from './State';
import type { Ellipsis, Next, StateType } from '../types';
import type { Notation } from '../../../types';
import { getCharacterTypeString } from '../utils';

class ValueState extends State {
  stateType: StateType | Ellipsis | Notation;

  constructor(
    child: State | null,
    valueState: StateType | Ellipsis | Notation
  ) {
    super(child);
    this.stateType = valueState;
  }

  private accepts(character: string): boolean {
    if ('name' in this.stateType) {
      if (this.stateType.name === 'ellipsis') {
        return this.checkEllipsis(this.stateType.inheritedType, character);
      }

      return this.stateType.regex.test(character);
    }
    return this.stateType.characterSet.includes(character);
  }

  private checkEllipsis(
    stateType: StateType | Ellipsis | Notation,
    character: string
  ): boolean {
    if ('name' in stateType) {
      if (stateType.name === 'ellipsis') {
        this.checkEllipsis(stateType.inheritedType, character);
      } else {
        return stateType.regex.test(character);
      }
    }

    return (stateType as Notation).characterSet.includes(character);
  }

  accept: (character: string) => Next | null = (character) =>
    this.accepts(character)
      ? {
          state: this.nextState(),
          insert: character,
          pass: true,
          value: character,
        }
      : null;

  get isElliptical(): boolean {
    return 'name' in this.stateType && this.stateType.name === 'ellipsis';
  }

  nextState: () => State = () => (this.isElliptical ? this : this.child!);

  toString: () => string = () => {
    const typeStr = getCharacterTypeString(this.stateType);

    return `${typeStr} -> ${this.child?.toString() ?? 'null'}`;
  };
}

export default ValueState;
