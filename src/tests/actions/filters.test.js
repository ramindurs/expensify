import {
    setTextFilter,
    setSortByDate,
    setSortByAmount,
    setStartDate,
    setEndDate} from "../../actions/filters";
import moment from "moment";

test('should set startDate action filter', () => {
    const action = setStartDate(moment(0));

    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should set endDAte action filter', () => {
    const action = setEndDate(moment(0));

    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should set text filter with provided value', () => {
    const action = setTextFilter('test');

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'test'
    });
});

test('should set text filter with default value', () => {
    const action = setTextFilter();

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should set sortBy by date', () => {
    const action = setSortByDate();

    expect(action).toEqual({
        type: 'SET_SORT_BY',
        sortBy: 'date'
    });
});

test('should set sortBy by amount', () => {
    const action = setSortByAmount();

    expect(action).toEqual({
        type: 'SET_SORT_BY',
        sortBy: 'amount'
    });
});