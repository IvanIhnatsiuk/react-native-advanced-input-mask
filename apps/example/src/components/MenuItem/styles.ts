import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowRadius: 15,
    shadowOpacity: 0.1,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginVertical: 8,
    elevation: 20,
    marginHorizontal: 16,
  },
  contentContainer: {
    padding: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  emoji: {
    color: "black",
    fontSize: 20,
  },
});
