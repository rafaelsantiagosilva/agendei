import { StyleSheet } from "react-native";
import { colors } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 40
  },
  logo: {
    width: 100,
    height: 23
  },
});