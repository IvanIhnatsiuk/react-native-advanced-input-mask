import { getCharacterTypeString } from "../utils";

import State from "./State";

import type { Notation } from "../../../types";
import type { Next, StateType } from "../types";

class OptionalValueState extends State {
  stateType: StateType | Notation;

  constructor(child: State, stateType: StateType | Notation) {
    super(child);
    this.stateType = stateType;
  }

  private accepts(character: string): boolean {
    if (this.stateType) {
      if ("name" in this.stateType) {
        return this.stateType.regex.test(character);
      }

      return this.stateType.characterSet.includes(character);
    }

    return false;
  }

  accept: (character: string) => Next = (character) =>
    this.accepts(character)
      ? {
          state: this.nextState(),
          insert: character,
          pass: true,
          value: character,
        }
      : { state: this.nextState(), insert: null, pass: false, value: null };

  toString: () => string = () => {
    const typeStr = getCharacterTypeString(this.stateType);

    return `${typeStr} -> ${this.child?.toString() ?? "null"}`;
  };
}

export default OptionalValueState;
