import { reverse } from '../helper/string';
import type { CaretGravity } from './types';

class CaretString {
  string: string;
  caretPosition: number;
  caretGravity: CaretGravity;

  constructor(
    string: string,
    caretPosition: number,
    caretGravity: CaretGravity
  ) {
    this.string = string;
    this.caretPosition = caretPosition;
    this.caretGravity = caretGravity;
  }

  reversed = (): CaretString =>
    new CaretString(
      reverse(this.string),
      this.string.length - this.caretPosition,
      this.caretGravity
    );
}

export default CaretString;
