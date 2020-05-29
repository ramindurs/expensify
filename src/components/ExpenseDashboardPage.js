import React from 'react';
import Expenses from "./Expenses";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesSummary from "./ExpensesSummary";

const ExpenseDashboardPage = () => (
    <div>
        <ExpensesSummary/>
        <ExpensesFilter/>
        <Expenses/>
    </div>
);

export default ExpenseDashboardPage;