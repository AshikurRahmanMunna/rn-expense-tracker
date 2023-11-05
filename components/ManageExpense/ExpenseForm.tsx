import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  GestureResponderEvent,
  Alert,
} from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { IExpense, IExpensePayload } from "../../types";
import moment from "moment";
import { GlobalStyles } from "../../constants/styles";
interface IExpenseForm {
  editing?: boolean;
  onCancel: (e: GestureResponderEvent) => void;
  onSubmit: (data: IExpensePayload) => void;
  editingExpense?: IExpense;
}
interface InputValues {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
}
const ExpenseForm: React.FC<IExpenseForm> = ({
  editing = false,
  onCancel,
  onSubmit,
  editingExpense,
}) => {
  const [inputs, setInputs] = useState<InputValues>({
    amount: {
      value: editing ? String(editingExpense?.amount) : "",
      isValid: true,
    },
    date: {
      value: editing ? moment(editingExpense?.date).format("YYYY-MM-DD") : "",
      isValid: true,
    },
    description: {
      value: editing ? editingExpense?.description || "" : "",
      isValid: true,
    },
  });

  const handleInputChange = (key: keyof InputValues, value: string) => {
    setInputs((pv) => ({ ...pv, [key]: { value, isValid: true } }));
  };

  const submitHandler = () => {
    const expenseData: IExpensePayload = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid Input", "Please check your input values");
      setInputs((currentInputs) => ({
        amount: { value: currentInputs.amount.value, isValid: amountIsValid },
        date: { value: currentInputs.date.value, isValid: dateIsValid },
        description: {
          value: currentInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }
    onSubmit(expenseData);
  };

  const formIsInValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{editing ? "Edit" : "Add"} Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          inputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text) => handleInputChange("amount", text),
            value: inputs.amount.value,
            placeholder: "Amount",
          }}
        />
        <Input
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          label="Date"
          inputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (text) => handleInputChange("date", text),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        inputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: "sentences",
          onChangeText: (text) => handleInputChange("description", text),
          value: inputs.description.value,
          placeholder: "Enter your description",
        }}
      />
      {formIsInValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {editing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;
const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  inputsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
