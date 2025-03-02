import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
  },
  contentContainer: {
    paddingVertical: 20,
    flex: 1,
  },
  leftAction: { width: 50, height: 50, backgroundColor: "crimson" },
  rightAction: { width: 50, height: 50, backgroundColor: "purple" },
  swipeable: {
    height: 50,
    marginBottom: 20,
    backgroundColor: "papayawhip",
    alignItems: "center",
  },
});

export default styles;
