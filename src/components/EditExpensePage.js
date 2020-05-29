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
                <div className="page-header-layout">
                    <div className="content_container">
                        <h1 className="page-header-layout__title">
                            Editing Expense
                            <span className="page-header-layout__title-reduce">
                                &nbsp; &nbsp; ID {this.props.expense.id}
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="content_container">
                    <ExpenseForm
                        expenseToEdit={this.props.expense}
                        submitMessage={'Save Updates'}
                        onSubmit={(expense) => {
                            this.editExpense(this.props.expense.id, expense)
                        }}
                    />
                    <button
                        className="button-layout__danger"
                        onClick={() => {
                            this.removeExpense(this.props.expense.id)
                        }}>
                        Delete Expense
                    </button>
                </div>
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
