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

export const ELLIPSES = 'ellipsis';
export const NULL_STRING = 'null';

export const OPEN_SQUARE_BRACKET = '[';
export const CLOSE_SQUARE_BRACKET = ']';

export const OPEN_CURLY_BRACKET = '{';
export const CLOSE_CURLY_BRACKET = '}';

export const ESCAPE_CHARACTER = '\\';

export const OPTIONAL_NUMERIC_CHARACTER = '9';
export const FIXED_NUMERIC_CHARACTER = '0';

export const FIXED_LITERAL_CHARACTER = 'A';
export const OPTIONAL_LITERAL_CHARACTER = 'a';

export const FIXED_ALPHA_NUMERIC_CHARACTER = '_';
export const OPTIONAL_ALPHA_NUMERIC_CHARACTER = '-';

export const ELLIPSIS_CHARACTER = '…';
