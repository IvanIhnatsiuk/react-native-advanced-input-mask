import CaretString from '../model/CaretString';
import { CaretGravityType } from '../model/types';

class CaretStringIterator {
  protected caretString: CaretString;
  protected currentIndex: number;

  constructor(caretString: CaretString, currentIndex: number = 0) {
    this.caretString = caretString;
    this.currentIndex = currentIndex;
  }

  insertionAffectsCaret(): boolean {
    const { caretGravity, caretPosition } = this.caretString;

    const isBackwardGravity = caretGravity.type === CaretGravityType.Backward;

    return isBackwardGravity
      ? this.currentIndex <= caretPosition
      : this.currentIndex < caretPosition;
  }

  deletionAffectsCaret: () => boolean = () =>
    this.currentIndex < this.caretString.caretPosition;

  next(): string | null {
    const { string } = this.caretString;
    if (this.currentIndex >= string.length) {
      return null;
    }

    const char = string.charAt(this.currentIndex);

    this.currentIndex += 1;

    return char;
  }
}

export default CaretStringIterator;
