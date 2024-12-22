import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    borderColor: colors.whiteSmoke,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 4,
    width: "100%"
  },
  title: {
    color: colors.gray
  },
  info: {
    fontSize: fontSize.lg
  }
});