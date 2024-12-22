import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: fontSize.md,
    color: colors.darkGray,
    marginTop: 15,
    marginLeft: 32
  },
  doctorsList: {
    display: "flex",
    width: "100%",
    gap: 2,
  }
});