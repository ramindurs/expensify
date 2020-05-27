import React from 'react';
import {connect} from 'react-redux';
import {startAddExpense} from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/dashboard');
    };

    render() {
        return (
            <div>
                <h3>Add Expenses</h3>
                <ExpenseForm
                    submitMessage={'Add Expense'}
                    onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

const mapDispatchTpProps = (dispatch) => {
    return {
        startAddExpense: (expense) => dispatch(startAddExpense(expense))
    };
};

export default connect(undefined, mapDispatchTpProps)(AddExpensePage);
