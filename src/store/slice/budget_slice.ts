import { BudgetState, Transaction } from "@/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* const loadFromLocalStorage = (): BudgetState => {
  if (typeof window != "undefined") {didnt let to use because rendered it server side
    //on browser or not when we use nextjs and use localstorage because localstorage used to on browser
    const storageData = localStorage.getItem("budget");
    if (storageData) {
      const data = JSON.parse(storageData);
      return data;
    }
  }
  return { income: 0, expenses: 0, transaction: [] };
}; */

const initialState: BudgetState = {
  income: 0,
  expenses: 0,
  transactions: []
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      const { categoryType } = action.payload;
      if (categoryType === "income") {
        state.income += action.payload.amount;
      } else {
        state.expenses += action.payload.amount;
      }
      state.transactions.push(action.payload);
      localStorage.setItem("budget", JSON.stringify(state));
    },
    getLocalStorageInitialize: (state, action: PayloadAction<BudgetState>) => {
      state.income = action.payload.income;
      state.transactions = action.payload.transactions;
      state.expenses = action.payload.expenses;
    }
  }
});
export const { addTransaction, getLocalStorageInitialize } =
  budgetSlice.actions;

export default budgetSlice.reducer;
