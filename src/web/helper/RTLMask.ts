import Mask from './Mask';
import CaretString from '../model/CaretString';
import RTLCaretStringIterator from './RTLCaretStringIterator';
import CaretStringIterator from './CaretStringIterator';
import type { Notation } from '../../types';
import type { MaskResult } from '../model/types';
import {
  CLOSE_CURLY_BRACKET,
  CLOSE_SQUARE_BRACKET,
  OPEN_CURLY_BRACKET,
  OPEN_SQUARE_BRACKET,
} from '../model/constants';

export default class RTLMask extends Mask {
  private static rtlCache: Map<string, RTLMask> = new Map();

  constructor(format: string, customNotations: Notation[]) {
    super(RTLMask.reversedFormat(format), customNotations);
  }

  static getOrCreate(format: string, customNotations: Notation[]): RTLMask {
    const key = RTLMask.reversedFormat(format);
    const cachedMask = RTLMask.rtlCache.get(key);
    if (!cachedMask) {
      const newMask = new RTLMask(format, customNotations);
      RTLMask.rtlCache.set(key, newMask);
      return newMask;
    }
    return cachedMask;
  }

  apply(text: CaretString): MaskResult {
    return super.apply(text.reversed()).reversed();
  }

  makeIterator(text: CaretString): CaretStringIterator {
    return new RTLCaretStringIterator(text);
  }

  private static reversedFormat(format: string): string {
    const mapped = format.split('').reduceRight((acc, char) => {
      switch (char) {
        case OPEN_SQUARE_BRACKET:
          return acc + CLOSE_SQUARE_BRACKET;
        case CLOSE_SQUARE_BRACKET:
          return acc + OPEN_SQUARE_BRACKET;
        case OPEN_CURLY_BRACKET:
          return acc + CLOSE_CURLY_BRACKET;
        case CLOSE_CURLY_BRACKET:
          return acc + OPEN_CURLY_BRACKET;
        default:
          return acc + char;
      }
    }, '');

    return mapped;
  }
}
