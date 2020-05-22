import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let onSubmit, history, wrapper;

beforeEach(() => {
    onSubmit = jest.fn();

    history = {
        push: jest.fn()
    };
    wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history}/>);
});

test('should render add expense page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);

    expect(onSubmit).toHaveBeenLastCalledWith({
        "amount": 1500,
        "createdAt": 1000,
        "description": "Water Bill",
        "id": 1,
        "note": ""
    });
    expect(history.push).toHaveBeenLastCalledWith('/');
});
