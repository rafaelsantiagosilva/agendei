import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
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
  },
  notAppointmentsContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  notAppointments: {
    textAlign: "center",
    fontSize: 21,
    width: "70%",
    color: colors.lightGray
  },
});