import React, { useContext } from "react";
import { View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../context/ExpensesContext";

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  return (
    <View style={{ flex: 1 }}>
      <ExpensesOutput expenses={expenses} expense_period="Total" />
    </View>
  );
};

export default AllExpenses;
