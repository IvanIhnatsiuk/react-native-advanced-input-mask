import type { StateType } from './types';

export const OPTIONAL_STATE_TYPES: Record<
  'literal' | 'numeric' | 'alphaNumeric',
  StateType
> = {
  numeric: {
    regex: /^\d$/,
    name: 'numeric',
    typeString: '[9]',
  },
  literal: {
    regex: /^[A-Za-z]$/,
    name: 'literal',
    typeString: '[a]',
  },
  alphaNumeric: {
    regex: /^[A-Za-z0-9]$/,
    name: 'alphaNumeric',
    typeString: '[-]',
  },
};

export const FIXED_STATE_TYPES: Record<
  'literal' | 'numeric' | 'alphaNumeric',
  StateType
> = {
  literal: {
    regex: /^[A-Za-z]$/,
    name: 'literal',
    typeString: '[A]',
  },
  numeric: {
    regex: /^\d$/,
    name: 'numeric',
    typeString: '[0]',
  },
  alphaNumeric: {
    regex: /^[A-Za-z0-9]$/,
    name: 'alphaNumeric',
    typeString: '[_]',
  },
};
