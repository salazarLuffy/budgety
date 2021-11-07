import React, { useReducer, createContext } from "react";

import contextReducer from "./contextReducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    amount: 100,
    category: "Investments",
    type: "Income",
    date: "2021-12-17",
    id: "4aa17dfe-6efa-4956-a99a-8832f888bf30",
  },
  {
    amount: 1200,
    category: "Car",
    type: "Expense",
    date: "2021-11-11",
    id: "2b949aa0-f580-4ec9-b8ac-0328df10dc51",
  },
  {
    amount: 100,
    category: "Salary",
    type: "Income",
    date: "2021-11-08",
    id: "b822a879-230e-455b-8f9b-0d556bb6c6fa",
  },
];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const balance = transactions.reduce(
    (acc, currVal) =>
      currVal.type === "Expense" ? acc - currVal.amount : acc + currVal.amount,
    0
  );

  return (
    <ExpenseTrackerContext.Provider
      value={{
        transactions,
        balance,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
