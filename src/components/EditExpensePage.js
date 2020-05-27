import React from 'react';
import {connect} from "react-redux";
import ExpenseForm from "./ExpenseForm";
import {startEditExpense, startRemoveExpense} from "../actions/expenses";

export class EditExpensePage extends React.Component {
    removeExpense = (id) => {
        this.props.startRemoveExpense(id);
        this.props.history.push('/dashboard');
    };
    editExpense = (id, expense) => {
        this.props.startEditExpense(id, expense);
        this.props.history.push('/dashboard');
    };

    render() {
        return (
            <div>
                <h3>Edit Expense ID {this.props.expense.id}</h3>
                <ExpenseForm
                    expenseToEdit={this.props.expense}
                    submitMessage={'Update Expense'}
                    onSubmit={(expense) => {
                        this.editExpense(this.props.expense.id, expense)
                    }}
                />
                <button onClick={() => {
                    this.removeExpense(this.props.expense.id)
                }
                }>Delete
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find(e => e.id === props.match.params.id)
    };
};

const matchDispatchToProps = (dispatch, props) => {
    return {
        startEditExpense: (id, expense) => dispatch(startEditExpense({
            id: id,
            updates: expense
        })),
        startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
    };
};

export default connect(mapStateToProps, matchDispatchToProps)(EditExpensePage);
