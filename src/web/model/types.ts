import type CaretString from './CaretString';
import type { State } from './state/State';

export type Next = {
  state: State;
  insert: string | null;
  pass: boolean;
  value: string | null;
};

export type StateType = {
  name: 'numeric' | 'literal' | 'alphaNumeric';
  regex: RegExp;
  typeString: string;
};

export type Ellipsis = {
  name: 'ellipsis';
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
