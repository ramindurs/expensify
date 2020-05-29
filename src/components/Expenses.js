import React from 'react';
import {connect} from "react-redux";
import Expense from "./Expense";
import selectExpenses from '../selectors/expenses';

export const Expenses = (props) => (
    <div className="content_container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ?
                    (<div className="list-item list-item--message">
                        <span>No expenses</span>
                    </div>) :
                    (props.expenses.map((expense, index) =>
                        <Expense key={index}
                                 {...expense}
                        />))
            }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
};

export default connect(mapStateToProps)(Expenses);
