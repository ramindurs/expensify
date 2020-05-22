import React from 'react';
import Expenses from "./Expenses";
import ExpensesFilter from "./ExpensesFilter";

const ExpenseDashboardPage = () => (
    <div>
        <ExpensesFilter/>
        <Expenses/>
    </div>
);

export default ExpenseDashboardPage;