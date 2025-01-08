import type { CaretGravity } from './CaretGravity';
import { CaretGravityType } from './CaretGravity';

class Backward implements CaretGravity {
  type: CaretGravityType.Backward = CaretGravityType.Backward;
  autoskipValue: boolean;

  constructor(autoskipValue: boolean) {
    this.autoskipValue = autoskipValue;
  }

  get autocomplete(): boolean {
    return false;
  }

  get autoskip(): boolean {
    return this.autoskipValue;
  }
}

export default Backward;
