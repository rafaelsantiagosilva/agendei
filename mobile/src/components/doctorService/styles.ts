import { colors, fontSize } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderColor: colors.whiteSmoke,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  info: {
    width: "50%",
    gap: 2
  },
  description: {
    fontSize: fontSize.md,
    color: colors.gray
  },
  price: {
    color: colors.blue
  },
  button: {
    backgroundColor: colors.blue,
    width: "100%",
    justifyContent: "center",
    borderRadius: 6,
    padding: 12
  },
  buttonContainer: {
    width: "35%",
    padding: 8
  }
});