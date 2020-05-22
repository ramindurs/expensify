import React from 'react';
import {connect} from "react-redux";
import Expense from "./Expense";
import selectExpenses from '../selectors/expenses';

export const Expenses = (props) => (
    <div>
        <h1>Expenses List</h1>
        {props.expenses.map((expense, index) =>
            <Expense key={index}
                     {...expense}
            />)}
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
};

export default connect(mapStateToProps)(Expenses);
