import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
} from "react-native";
import type { MaskedTextInputOwnProps } from "../../../types";

export type Props = MaskedTextInputOwnProps & {
  onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};
