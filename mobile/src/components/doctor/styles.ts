import { colors, fontSize } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.whiteSmoke,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    marginHorizontal: "auto",
    width: "90%"
  },
  name: {
    fontSize: fontSize.md,
    color: colors.darkGray,
    fontWeight: "600"
  },
  specialty: {
    fontSize: fontSize.sm,
    color: colors.gray
  }
});