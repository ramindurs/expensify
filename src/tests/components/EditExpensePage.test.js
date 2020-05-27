import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let wrapper, expense, history, removeExpenseSpy, editExpenseSpy;

beforeEach(() => {
    expense = expenses[0];
    history = {
        push: jest.fn()
    };
    removeExpenseSpy = jest.fn();
    editExpenseSpy = jest.fn();

    wrapper = shallow(<EditExpensePage
        expense={expense}
        history={history}
        startRemoveExpense={removeExpenseSpy}
        editExpense={editExpenseSpy}
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

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpenseSpy).toHaveBeenLastCalledWith('1', expense);
});