import axiosInstance from "../api/http";
import { IExpense, IExpensePayload } from "../types";

export const createExpense = async (expenseData: IExpensePayload) => {
  const res = await axiosInstance.post("/expense.json", expenseData);
  return res.data.name;
};

export const updateExpense = async (
  id: string,
  expenseData: IExpensePayload
) => {
  return axiosInstance.put(`/expense/${id}.json`, expenseData);
};

export const deleteExpense = async (id: string) => {
  return axiosInstance.delete(`/expense/${id}.json`);
};

export const fetchExpenses = async () => {
  const res = await axiosInstance.get("/expense.json");
  const expenses: IExpense[] = [];
  for (const key in res.data) {
    expenses.push({
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    });
  }
  return expenses;
};
