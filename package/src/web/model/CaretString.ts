import type { CaretGravity } from "./types";

class CaretString {
  string: string;
  caretPosition: number;
  caretGravity: CaretGravity;

  constructor(
    string: string,
    caretPosition: number,
    caretGravity: CaretGravity,
  ) {
    this.string = string;
    this.caretPosition = caretPosition;
    this.caretGravity = caretGravity;
  }

  reversed(): CaretString {
    return new CaretString(
      this.string.split("").reverse().join(""),
      this.string.length - this.caretPosition,
      this.caretGravity,
    );
  }
}

export default CaretString;
