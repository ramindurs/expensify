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
                <div className='page-header-layout'>
                    <div className="content_container">
                        <h1 className='page-header-layout__title'>Add Expenses</h1>
                    </div>
                </div>
                <div className="content_container">
                    <ExpenseForm
                        submitMessage={'Save Expense'}
                        onSubmit={this.onSubmit}/>
                </div>
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
