import React from 'react';
import {connect} from "react-redux";
import ExpenseForm from "./ExpenseForm";
import {editExpense, removeExpense} from "../actions/expenses";

export class EditExpensePage extends React.Component{
    removeExpense = (id) => {
        this.props.removeExpense(id);
        this.props.history.push('/');
    };
    editExpense = (id, expense) => {
        this.props.editExpense(id, expense);
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <h3>Edit Expense ID {this.props.expense.id}</h3>
                <ExpenseForm
                    expenseToEdit={this.props.expense}
                    submitMessage={'Update Expense'}
                    onSubmit={(expense) => {this.editExpense(this.props.expense.id, expense)}}
                />
                <button onClick={() => {this.removeExpense(this.props.expense.id)}
                }>Delete</button>
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
        editExpense: (id, expense) => dispatch(editExpense({
            id: id,
            updates: expense
        })),
        removeExpense: (id) => dispatch(removeExpense({id}))
    };
};

export default connect(mapStateToProps, matchDispatchToProps)(EditExpensePage);