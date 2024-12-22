import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 20,
    justifyContent: "center"
  },
  title: {
    fontSize: fontSize.md,
    color: colors.darkGray,
    marginTop: 15,
    marginLeft: 32
  },
  appointmentsList: {
    display: "flex",
    width: "100%",
    gap: 2,
  }
});