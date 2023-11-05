export interface IExpense {
  id: string;
  description: string;
  date: Date;
  amount: number;
}
export interface IExpensePayload {
  description: string;
  date: Date;
  amount: number;
}
