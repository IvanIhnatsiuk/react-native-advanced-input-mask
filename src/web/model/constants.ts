import { StateName, type StateType } from './types';

export const OPTIONAL_STATE_TYPES: Record<StateName, StateType> = {
  numeric: {
    regex: /^\d$/,
    name: StateName.numeric,
    typeString: '[9]',
  },
  literal: {
    regex: /^[A-Za-z]$/,
    name: StateName.literal,
    typeString: '[a]',
  },
  alphaNumeric: {
    regex: /^[A-Za-z0-9]$/,
    name: StateName.alphaNumeric,
    typeString: '[-]',
  },
};

export const FIXED_STATE_TYPES: Record<StateName, StateType> = {
  literal: {
    regex: /^[A-Za-z]$/,
    name: StateName.literal,
    typeString: '[A]',
  },
  numeric: {
    regex: /^\d$/,
    name: StateName.numeric,
    typeString: '[0]',
  },
  alphaNumeric: {
    regex: /^[A-Za-z0-9]$/,
    name: StateName.alphaNumeric,
    typeString: '[_]',
  },
};
