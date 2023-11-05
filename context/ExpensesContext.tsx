import React, { createContext, useReducer } from "react";
import { IExpense, IExpensePayload } from "../types";
interface IExpenseContextProvider {
  children: React.ReactNode;
}
interface IExpensesContext {
  expenses: IExpense[];
  setExpenses: (payload: IExpense[]) => void;
  addExpense: (payload: IExpense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, payload: IExpensePayload) => void;
}
export const ExpensesContext = createContext<IExpensesContext>({
  expenses: [],
  setExpenses: () => {},
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

type AddAction = {
  type: "ADD";
  payload: IExpense;
};

type SetAction = {
  type: "SET";
  payload: IExpense[];
};

type DeleteAction = {
  type: "DELETE";
  payload: string;
};

type UpdateAction = {
  type: "UPDATE";
  payload: {
    id: string;
    data: IExpensePayload;
  };
};

type ExpenseAction = AddAction | SetAction | DeleteAction | UpdateAction;

const expenseReducer = (state: IExpense[], action: ExpenseAction) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload.reverse();
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const { id, data } = action.payload;
      const expenseIndex = state.findIndex((exp) => exp.id === id);
      if (expenseIndex === -1) {
        return state;
      }
      const updatableExpense = state[expenseIndex];
      const updatedItem = { ...updatableExpense, ...data };
      state[expenseIndex] = updatedItem;
      return state;
    default:
      return state;
  }
};

const ExpenseContextProvider: React.FC<IExpenseContextProvider> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(expenseReducer, []);
  const addExpense = (expenseData: IExpense) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const setExpenses = (expenses: IExpense[]) => {
    dispatch({ type: "SET", payload: expenses });
  };
  const deleteExpense = (id: string) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id: string, expenseData: IExpensePayload) => {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  };
  const contextValue: IExpensesContext = {
    addExpense,
    setExpenses,
    deleteExpense,
    expenses: state,
    updateExpense,
  };
  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpenseContextProvider;
