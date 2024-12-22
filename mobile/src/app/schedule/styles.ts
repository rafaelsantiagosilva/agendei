import { colors, fontSize } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingBottom: 36
  },
  calendar: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 6,
    marginVertical: 12,
  },
  textHour: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.gray,
  },
  picker: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 6,
    marginVertical: 12
  }
});

export const calendar = {
  theme: {
    todayTextColor: colors.red,
    selectedDayBackgroundColor: colors.blue,
    selectedDayTextColor: colors.white,
    arrowColor: colors.blue,
    
    width: "100%",
    flex: 1
  }
}