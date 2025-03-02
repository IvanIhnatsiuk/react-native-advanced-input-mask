import { StyleSheet } from "react-native";

export const ANDROID_PRESSABLE_RIPPLE = { borderless: false };

export default StyleSheet.create({
  container: {
    marginHorizontal: 8,
    minWidth: "90%",
  },
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#EAB68F",
    borderRadius: 6,
    padding: 12,
  },
  buttonText: {
    color: "black",
    fontSize: 14,
  },
});
