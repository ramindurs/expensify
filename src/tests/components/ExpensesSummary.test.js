import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

const expensesTotal = (ex) => (ex.map(e => e.amount).reduce((a, b) => a + b, 0) / 100);

test('should render expenses summary component', () => {
    const wrapper = shallow(<ExpensesSummary
        expenses={[]}
    />);

    expect(wrapper).toMatchSnapshot();
});

test('should render expenses when there is one expense', () => {
    const wrapper = shallow(<ExpensesSummary
        expenses={[expenses[0]]}
        expensesTotal={expensesTotal}
    />);

    expect(wrapper).toMatchSnapshot();
});

test('should render expenses when there are more than one expense', () => {
    const wrapper = shallow(<ExpensesSummary
        expenses={expenses}
        expensesTotal={expensesTotal}
    />);

    expect(wrapper).toMatchSnapshot();
});