import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import expensesTotal from "../selectors/expenses-total";

export class ExpensesSummary extends React.Component {
    getTotalNumber = () => (this.props.expenses.length);
    getTotalAmount = () => (this.props.expensesTotal(this.props.expenses));

    render() {
        return (
            <div>
                <div className="page-header-layout">
                    <div className="content_container">
                        <h1 className="page-header-layout__title">Viewing
                            {this.getTotalNumber() === 0 ? <span> Number of Expenses: 0</span> :
                                <span> Number of Expenses: {this.getTotalNumber()} Total Amount: £{this.getTotalAmount()}</span>
                            }
                        </h1>
                        <div className="page-header-layout__actions">
                            <Link className="button-layout" to='/create'>Add Expense</Link>
                        </div>
                    </div>
                </div>
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
