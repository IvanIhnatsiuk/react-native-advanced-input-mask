import type { CaretGravity } from './CaretGravity';
import { CaretGravityType } from './CaretGravity';

class Forward implements CaretGravity {
  type: CaretGravityType.Forward = CaretGravityType.Forward;
  autocompleteValue: boolean;

  constructor(autocompleteValue: boolean) {
    this.autocompleteValue = autocompleteValue;
  }

  get autocomplete(): boolean {
    return this.autocompleteValue;
  }

  get autoskip(): boolean {
    return false;
  }
}

export default Forward;
