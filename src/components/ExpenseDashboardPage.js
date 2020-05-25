import React from 'react';
import Expenses from "./Expenses";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesSummary from "./ExpensesSummary";

const ExpenseDashboardPage = () => (
    <div>
        <ExpensesFilter/>
        <ExpensesSummary/>
        <Expenses/>
    </div>
);

export default ExpenseDashboardPage;