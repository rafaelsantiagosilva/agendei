import { StyleSheet } from "react-native";
import { colors } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3
  },
  text: {
    color: colors.lightGray,
    textAlign: "center",
  },
  link: {
    color: colors.blue, 
    textAlign: "center",
  }
});