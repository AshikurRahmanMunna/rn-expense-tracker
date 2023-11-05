import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { IExpense } from "../../types";
import { DUMMY_EXPENSES } from "../../data/expenses";
import { GlobalStyles } from "../../constants/styles";
interface IExpensesOutput {
  expenses: IExpense[];
  expense_period: string;
  fallback_text?: string;
}
const ExpensesOutput: React.FC<IExpensesOutput> = ({
  expenses,
  expense_period,
  fallback_text = "No Expenses",
}) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expense_period} />
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={styles.noText}>{fallback_text}</Text>
        </View>
      )}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  noText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 10,
  },
});
