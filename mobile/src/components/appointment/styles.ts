import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    borderColor: colors.whiteSmoke,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "100%"
  },
  title: {
    fontSize: fontSize.md,
    color: colors.darkGray,
    fontWeight: 500
  },
  specialty: {
    paddingVertical: 2,
    color: colors.gray
  },
  footer: {
    flexDirection: "row"
  },
  datetime: {
    width: "50%"
  },
  button: {
    backgroundColor: colors.red,
    width: "100%",
    justifyContent: "center",
    borderRadius: 6,
    padding: 12
  },
  buttonContainer: {
    width: "50%",
    padding: 8
  }
});