import React, { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  CustomStackNavigationProp,
  CustomStackRouteProp,
} from "../types/navigation";
import { DUMMY_EXPENSES } from "../data/expenses";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../context/ExpensesContext";
interface IManageExpense {
  route: CustomStackRouteProp<"ManageExpense">;
  navigation: CustomStackNavigationProp<"ManageExpense">;
}
const ManageExpense: React.FC<IManageExpense> = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const { deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext);
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
  const handleConfirm = () => {
    if (isEditing) {
      updateExpense(editedExpenseId, {
        description: "Test",
        amount: 19.99,
        date: new Date(),
      });
    } else {
      addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date(),
      });
    }
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={handleCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleConfirm}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
