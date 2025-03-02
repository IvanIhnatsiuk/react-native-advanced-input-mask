import { StyleSheet } from "react-native";

export const FOCUSED_BORDER_COLOR = "#2a41cb";
export const DEFAULT_BORDER_COLOR = "#767676";
export const PLACEHOLDER_COLOR = "#767676";
export const DEFAULT_BACKGROUND_COLOR = "#ffffff";
export const PRESSED_BACKGROUND_COLOR = "#ebeded";

export default StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
    color: "#000",
    width: "90%",
    height: 50,
  },
});
