import CaretStringIterator from "./CaretStringIterator";
import CaretString from "../model/CaretString";

class RTLCaretStringIterator extends CaretStringIterator {
  constructor(caretString: CaretString) {
    super(caretString);
  }

  insertionAffectsCaret: () => boolean = () =>
    this.currentIndex <= this.caretString.caretPosition;
}

export default RTLCaretStringIterator;
