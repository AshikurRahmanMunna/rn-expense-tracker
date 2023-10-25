import React from "react";
import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../data/expenses";

const AllExpenses = () => {
  return (
    <View>
      <ExpensesOutput expenses={DUMMY_EXPENSES} expense_period="Total" />
    </View>
  );
};

export default AllExpenses;
