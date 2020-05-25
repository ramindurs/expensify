import React from 'react';
import {connect} from "react-redux";
import selectExpenses from '../selectors/expenses';
import expensesTotal from "../selectors/expenses-total";

export class ExpensesSummary extends React.Component {
    getTotalNumber = () => (this.props.expenses.length);
    getTotalAmount = () => (this.props.expensesTotal(this.props.expenses));

    render() {
        return (
            <div>
                <h4>Expenses Summary</h4>
                {this.getTotalNumber() === 0 ? 'Number of Expenses: 0' :
                    'Number of Expenses: ' + this.getTotalNumber() + ' Total Amount: £' + this.getTotalAmount()
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
        expensesTotal: (filteredExpenses) => (expensesTotal(filteredExpenses) / 100)
    }
};

export default connect(mapStateToProps)(ExpensesSummary);
