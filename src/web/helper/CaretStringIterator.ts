import CaretString from '../model/CaretString';
import { CaretGravityType } from '../model/CartGravity';

class CaretStringIterator {
  protected caretString: CaretString;
  protected currentIndex: number;

  constructor(caretString: CaretString, currentIndex: number = 0) {
    this.caretString = caretString;
    this.currentIndex = currentIndex;
  }

  insertionAffectsCaret(): boolean {
    const gravity = this.caretString.caretGravity;
    if (gravity.type === CaretGravityType.Backward) {
      return this.currentIndex < this.caretString.caretPosition;
    }
    return (
      this.currentIndex <= this.caretString.caretPosition ||
      (this.currentIndex === 0 && this.caretString.caretPosition === 0)
    );
  }

  deletionAffectsCaret(): boolean {
    return this.currentIndex < this.caretString.caretPosition;
  }

  next(): string | null {
    const str = this.caretString.string;
    if (this.currentIndex >= str.length) {
      return null;
    }

    const char = str.charAt(this.currentIndex);

    this.currentIndex += 1;

    return char;
  }
}

export default CaretStringIterator;
