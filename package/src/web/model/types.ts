import type CaretString from "./CaretString";
import type State from "./state/State";

export type Next = {
  state: State;
  insert: string | null;
  pass: boolean;
  value: string | null;
};

export type StateType = {
  name: StateName;
  regex: RegExp;
  typeString: string;
};

export type Ellipsis = {
  name: "ellipsis";
  inheritedType: StateType;
  typeString: string;
};

export type MaskResult = {
  formattedText: CaretString;
  extractedValue: string;
  affinity: number;
  complete: boolean;
  tailPlaceholder: string;
  reversed(): MaskResult;
};

export interface CaretGravity {
  autocomplete: boolean;
  autoskip: boolean;
  type: CaretGravityType;
}

export const enum CaretGravityType {
  Forward,
  Backward,
}

export const enum StateName {
  literal = "literal",
  numeric = "numeric",
  alphaNumeric = "alphaNumeric",
}
