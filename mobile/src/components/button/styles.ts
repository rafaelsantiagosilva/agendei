import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/theme";

export const styles = StyleSheet.create({
  btn: {
    width: "100%",
    backgroundColor: colors.blue,
    padding: 12,
    borderRadius: 10
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontSize: fontSize.md
  }
});