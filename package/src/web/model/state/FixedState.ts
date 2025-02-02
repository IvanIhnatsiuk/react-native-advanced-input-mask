import type { Next } from '../types';
import State from './State';

class FixedState extends State {
  ownCharacter: string;

  constructor(child: State, ownCharacter: string) {
    super(child);
    this.ownCharacter = ownCharacter;
  }

  accept: (char: string) => Next = (char) =>
    char === this.ownCharacter
      ? {
          state: this.nextState(),
          pass: true,
          insert: char,
          value: char,
        }
      : {
          state: this.nextState(),
          insert: this.ownCharacter,
          value: this.ownCharacter,
          pass: false,
        };

  autocomplete: () => Next = () => ({
    state: this.nextState(),
    insert: this.ownCharacter,
    value: this.ownCharacter,
    pass: false,
  });

  toString = () =>
    `{${this.ownCharacter}} -> ${this.child?.toString() ?? 'null'} `;
}

export default FixedState;
