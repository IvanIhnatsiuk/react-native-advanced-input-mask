import Mask from './Mask';
import CaretString from '../model/CaretString';
import RTLCaretStringIterator from './RTLCaretStringIterator';
import CaretStringIterator from './CaretStringIterator';
import type { Notation } from '../../types';
import type { MaskResult } from '../model/types';

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
    // Apply the mask to the reversed text,
    // then reverse the result back.
    return super.apply(text.reversed()).reversed();
  }

  makeIterator(text: CaretString): CaretStringIterator {
    return new RTLCaretStringIterator(text);
  }

  private static reversedFormat(format: string): string {
    // Reverse the string first
    let reversed = format.split('').reverse().join('');

    // Replace bracket-escape sequences
    reversed = reversed
      .replace(/\[\\/g, '\\]')
      .replace(/\]\\/, '\\[')
      .replace(/\{\\/g, '\\}')
      .replace(/\}\\/, '\\{');

    // Flip '[' to ']' and '{' to '}' etc.
    const mapped = reversed
      .split('')
      .map((ch) => {
        switch (ch) {
          case '[':
            return ']';
          case ']':
            return '[';
          case '{':
            return '}';
          case '}':
            return '{';
          default:
            return ch;
        }
      })
      .join('');

    return mapped;
  }
}
