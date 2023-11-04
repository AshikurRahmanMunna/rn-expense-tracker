import React from "react";
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
import { IExpense } from "../../types";
import ExpenseItem from "./ExpenseItem";
interface IExpensesList {
  expenses: IExpense[];
}
const renderExpenseItem = ({ item }: ListRenderItemInfo<IExpense>) => {
  return (
    <ExpenseItem
      amount={item.amount}
      date={item.date}
      description={item.description}
      id={item.id}
    />
  );
};
const ExpensesList: React.FC<IExpensesList> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item, i) => String(i)}
    />
  );
};

export default ExpensesList;
