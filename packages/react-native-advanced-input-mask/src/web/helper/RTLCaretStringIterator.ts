import CaretStringIterator from "./CaretStringIterator";

import type CaretString from "../model/CaretString";

class RTLCaretStringIterator extends CaretStringIterator {
  constructor(caretString: CaretString) {
    super(caretString);
  }

  insertionAffectsCaret: () => boolean = () =>
    this.currentIndex <= this.caretString.caretPosition;
}

export default RTLCaretStringIterator;
