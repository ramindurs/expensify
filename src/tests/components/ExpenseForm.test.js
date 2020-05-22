import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from "../fixtures/expenses";
import moment from 'moment';

test('should render form with no data', () => {
    const wrapper = shallow(<ExpenseForm/>);

    expect(wrapper).toMatchSnapshot();
});

test('should render form with data', () => {
    const expenseToEdit = expenses[0];
    const wrapper = shallow(<ExpenseForm expenseToEdit={expenseToEdit} />);

    expect(wrapper).toMatchSnapshot();
});

test('should render error when form inputs are invalid', () => {
    const wrapper = shallow(<ExpenseForm/>);

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error')).toEqual('Please provide description and amount');
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'Test Bill';
    const wrapper = shallow(<ExpenseForm/>);

    wrapper.find('input').at(0).simulate('change', {
        target: {value}
    });

    expect(wrapper.state('description')).toEqual(value);
});

test('should set note on input change', () => {
    const value = "Test Note";
    const wrapper = shallow(<ExpenseForm/>);

    wrapper.find('textarea').simulate('change', {
        target: {value}
    });

    expect(wrapper.state('note')).toEqual(value);
});

test('should set amount when valid amount entered', () => {
    const value = '23.55';

    const wrapper = shallow(<ExpenseForm/>);

    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });

    expect(wrapper.state('amount')).toEqual(value);
});

test('should not set amount when invalid amount entered', () => {
    const value = '12.122';

    const wrapper = shallow(<ExpenseForm/>);

    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });

    expect(wrapper.state('amount')).toEqual('');
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const expenseToEdit = expenses[0];
    const wrapper = shallow(<ExpenseForm expenseToEdit={expenseToEdit} onSubmit={onSubmitSpy}/>);

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: 'Water Bill',
        note: '',
        amount: 1500,
        createdAt: 1000
    });
});

test('should set new date on date change', () => {
    const now = moment(1000000000000);
    const wrapper = shallow(<ExpenseForm/>);

    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);

    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const wrapper = shallow(<ExpenseForm/>);

    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused: true});

    expect(wrapper.state('calendarFocus')).toBe(true);
});