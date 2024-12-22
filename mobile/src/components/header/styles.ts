import { colors } from "@/constants/colors";
import { fontSize } from "@/constants/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    margin: 12,
    width: 125,
    height: 29
  },
  text: {
    fontSize: 24,
    color: colors.blue,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 12
  }
});
