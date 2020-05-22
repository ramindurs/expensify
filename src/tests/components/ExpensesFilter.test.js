import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesFilter} from "../../components/ExpensesFilter";
import {filters, altFilters} from "../fixtures/filters";
import moment from 'moment';

let wrapper, setSortByAmount, setSortByDate, setTextFilter, setStartDate, setEndDate;

beforeEach(() => {
    setSortByAmount = jest.fn();
    setSortByDate = jest.fn();
    setTextFilter = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(<ExpensesFilter
        setSortByAmount={setSortByAmount}
        setSortByDate={setSortByDate}
        setTextFilter={setTextFilter}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        filters={filters}
    />)
});

test('should render expenses filter page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render expenses with alternative filter', () => {
    wrapper.setProps({filters: altFilters});
    expect(wrapper).toMatchSnapshot();
});

test('should handle text filter change', () => {
    wrapper.find('input').prop('onChange')({target: { value: 'Water'}});

    expect(setTextFilter).toHaveBeenLastCalledWith('Water');
});
test('should handle sort by date', () => {
    wrapper.find('select').simulate('change', {
        target: { value: 'amount'}
    });

    expect(setSortByAmount).toHaveBeenCalled();
});

test('should handle sort by amount', () => {
    wrapper.find('select').simulate('change', {
        target: { value: 'date'}
    });

    expect(setSortByDate).toHaveBeenCalled();
});

test('should handle date change', () => {
    const startDate = moment(1500);
    const endDate = moment(3000);

    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus change', () => {
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')('endDate');

    expect(wrapper.state('calendarFocused')).toBe('endDate');
});