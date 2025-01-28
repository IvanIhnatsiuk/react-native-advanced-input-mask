import { NULL_STRING } from '../constants';
import type { Next } from '../types';

abstract class State {
  child: State | null = null;

  constructor(child: State | null) {
    this.child = child;
  }

  abstract accept: (char: string) => Next | null;

  nextState = (): State => this.child!;

  autocomplete = (): Next | null => null;

  toString = (): string =>
    `BASE -> ${this.child ? this.child.toString() : NULL_STRING}`;
}

export default State;
