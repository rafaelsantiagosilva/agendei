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
  doctorsList: {
    display: "flex",
    width: "100%",
    gap: 2,
  },
  notDoctorsContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  notDoctors: {
    textAlign: "center",
    fontSize: 21,
    width: "70%",
    color: colors.lightGray
  }
});