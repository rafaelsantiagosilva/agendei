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
    paddingBottom: 24
  },
  doctor: {
    justifyContent: "center",
    alignItems: "center",
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
  },
  notServicesContainer: {
    height: "70%",
    alignItems: "center",
    justifyContent: "center"
  },
  notServices: {
    textAlign: "center",
    fontSize: 21,
    width: "70%",
    color: colors.lightGray
  }
});