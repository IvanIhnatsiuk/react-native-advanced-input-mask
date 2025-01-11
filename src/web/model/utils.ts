import type { Notation } from '../../types';
import type { Ellipsis, StateType } from './types';

export const getCharacterTypeString = (
  state?: StateType | Notation | Ellipsis
): string => {
  if (!state) {
    return '[?]';
  }

  return 'name' in state ? state.typeString : `[${state.character}]`;
};
