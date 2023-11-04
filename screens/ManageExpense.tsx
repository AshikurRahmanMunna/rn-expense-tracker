import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import {
  CustomStackNavigationProp,
  CustomStackRouteProp,
} from "../types/navigation";
import { DUMMY_EXPENSES } from "../data/expenses";
interface IManageExpense {
  route: CustomStackRouteProp<"ManageExpense">;
  navigation: CustomStackNavigationProp<"ManageExpense">;
}
const ManageExpense: React.FC<IManageExpense> = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const item = DUMMY_EXPENSES.find((exp) => exp.id === editedExpenseId);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  return <View></View>;
};

export default ManageExpense;
