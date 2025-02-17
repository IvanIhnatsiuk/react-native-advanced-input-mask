import { StyleSheet } from "react-native";

export const ANDROID_PRESSABLE_RIPPLE = { borderless: false };

export default StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#EAB68F",
    borderRadius: 6,
    marginHorizontal: 8,
    padding: 12,
    minWidth: "90%",
  },
  buttonText: {
    color: "black",
    fontSize: 14,
  },
});
