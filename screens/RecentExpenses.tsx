import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../data/expenses";

const RecentExpenses = () => {
  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={DUMMY_EXPENSES} expense_period="Last 7 days" />
    </View>
  );
};

export default RecentExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
