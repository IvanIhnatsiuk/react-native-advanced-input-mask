import type { MaskedTextInputOwnProps } from "../../../types";
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
} from "react-native";

export type Props = MaskedTextInputOwnProps & {
  onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};
