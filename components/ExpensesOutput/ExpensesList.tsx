import React from "react";
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
import { IExpense } from "../../types";
interface IExpensesList {
  expenses: IExpense[];
}
const renderExpenseItem = ({ item }: ListRenderItemInfo<IExpense>) => {
  return <Text>{item.description}</Text>;
};
const ExpensesList: React.FC<IExpensesList> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ExpensesList;
