import type { Next } from "../model/types";

class AutocompletionStack extends Array<Next> {
  push(item: Next | null): number {
    if (item === null) {
      this.length = 0;

      return 0;
    }

    return super.push(item);
  }

  pop(): Next {
    return super.pop()!;
  }

  empty(): boolean {
    return this.length === 0;
  }
}

export default AutocompletionStack;
