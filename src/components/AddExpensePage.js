import React from 'react';
import {connect} from 'react-redux';
import {addExpense} from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.onSubmit(expense);
        this.props.history.push('/');
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
        onSubmit: (expense) => dispatch(addExpense(expense))
    };
};

export default connect(undefined, mapDispatchTpProps)(AddExpensePage);