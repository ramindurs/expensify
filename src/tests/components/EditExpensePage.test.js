import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let wrapper, expense, history, removeExpenseSpy, startEditExpense;

beforeEach(() => {
    expense = expenses[0];
    history = {
        push: jest.fn()
    };
    removeExpenseSpy = jest.fn();
    startEditExpense = jest.fn();

    wrapper = shallow(<EditExpensePage
        expense={expense}
        history={history}
        startRemoveExpense={removeExpenseSpy}
        startEditExpense={startEditExpense}
    />);
});

test('should render edit expense page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle remove expense', () => {
    wrapper.find('button').simulate('click');

    expect(removeExpenseSpy).toHaveBeenLastCalledWith('1');
});

test('should handle update expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);

    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
    expect(startEditExpense).toHaveBeenLastCalledWith('1', expense);
});
