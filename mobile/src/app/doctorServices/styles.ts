import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24
  },
  title: {
    textAlign: "center",
    color: colors.white,
    fontWeight: 600,
    fontSize: fontSize.lg
  },
  doctor: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24
  },
  doctorName: {
    textAlign: "center",
    color: colors.white,
    fontWeight: 500,
    fontSize: fontSize.md
  },
  doctorSpecialty: {
    color: colors.whiteSmoke
  },
  doctorIcon: {
    width: 76,
    height: 76
  }
});