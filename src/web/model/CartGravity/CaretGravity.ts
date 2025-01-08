export interface CaretGravity {
  autocomplete: boolean;
  autoskip: boolean;
  type: CaretGravityType;
}

export const enum CaretGravityType {
  Forward,
  Backward,
}
