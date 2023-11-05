import React, { createContext, useReducer } from "react";
import { IExpense, IExpensePayload } from "../types";
import { DUMMY_EXPENSES } from "../data/expenses";
interface IExpenseContextProvider {
  children: React.ReactNode;
}
interface IExpensesContext {
  expenses: IExpense[];
  addExpense: (payload: IExpensePayload) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, payload: IExpensePayload) => void;
}
export const ExpensesContext = createContext<IExpensesContext>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

type AddAction = {
  type: "ADD";
  payload: IExpensePayload;
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

type ExpenseAction = AddAction | DeleteAction | UpdateAction;

const expenseReducer = (state: IExpense[], action: ExpenseAction) => {
  switch (action.type) {
    case "ADD":
      const _id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: _id }, ...state];
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
  const [state, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);
  const addExpense = (expenseData: IExpensePayload) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id: string) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id: string, expenseData: IExpensePayload) => {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  };
  const contextValue: IExpensesContext = {
    addExpense,
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
