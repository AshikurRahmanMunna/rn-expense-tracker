import React, { useContext, useLayoutEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  CustomStackNavigationProp,
  CustomStackRouteProp,
} from "../types/navigation";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../context/ExpensesContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { IExpensePayload } from "../types";
interface IManageExpense {
  route: CustomStackRouteProp<"ManageExpense">;
  navigation: CustomStackNavigationProp<"ManageExpense">;
}
const ManageExpense: React.FC<IManageExpense> = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const { deleteExpense, addExpense, updateExpense, expenses } =
    useContext(ExpensesContext);
  const editingExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const handleDeleteExpense = () => {
    deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = (data: IExpensePayload) => {
    if (isEditing) {
      updateExpense(editedExpenseId, data);
    } else {
      addExpense(data);
    }
    navigation.goBack();
  };
  if (isEditing && !editingExpense) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Expense not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancel}
        onSubmit={handleConfirm}
        editing={isEditing}
        editingExpense={editingExpense}
      />
      {isEditing && editedExpenseId && (
        <View style={styles.deleteContainer}>
          <IconButton
            color={GlobalStyles.colors.error500}
            icon="trash"
            size={36}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  notFound: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
