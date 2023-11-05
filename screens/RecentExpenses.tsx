import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../context/ExpensesContext";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  useEffect(() => {
    const getExpenses = async () => {
      const expensesData = await fetchExpenses();
      setExpenses(expensesData);
    };
    getExpenses();
  }, []);
  const today = new Date();
  const date7DaysAgo = getDateMinusDays(today, 7);
  const recentExpenses = expenses.filter(
    (expense) => expense.date > date7DaysAgo && expense.date <= today
  );
  return (
    <View style={styles.container}>
      <ExpensesOutput
        fallback_text="No recent expenses registered for the last 7 days."
        expenses={recentExpenses}
        expense_period="Last 7 days"
      />
    </View>
  );
};

export default RecentExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
