import State from "./State";
import type { Next } from "../types";

class FreeState extends State {
  ownCharacter: string;

  constructor(child: State, ownCharacter: string) {
    super(child);
    this.ownCharacter = ownCharacter;
  }

  accept: (char: string) => Next | null = (char: string): Next | null => {
    return this.ownCharacter === char
      ? {
          state: this.nextState(),
          insert: char,
          pass: true,
          value: null,
        }
      : {
          state: this.nextState(),
          insert: this.ownCharacter,
          pass: false,
          value: null,
        };
  };

  autocomplete: () => Next | null = () => ({
    state: this.nextState(),
    insert: this.ownCharacter,
    pass: false,
    value: null,
  });

  toString: () => string = () =>
    `${this.ownCharacter} -> ${this.child ? this.child.toString() : "null"}`;
}

export default FreeState;
