import selectExpenses from "../../selectors/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";

const filter = {
    text: 'bill',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

test('should filter by text value & sorted by date', () => {
    const result = selectExpenses(expenses, filter);

    expect(result).toEqual([expenses[1], expenses[0]]);
});

test('should filter by startDate and sort by date', () => {
    const updatedFilter = {
        ...filter,
        text: '',
        startDate: moment(2000)
    };
    const result  = selectExpenses(expenses, updatedFilter);

    expect(result).toEqual([expenses[2], expenses[1]]);
});

test('should filter by endDate and sort by date', () => {
    const updatedFilter = {
        ...filter,
        text: '',
        endDate: moment(2000)
    };
    const result  = selectExpenses(expenses, updatedFilter);

    expect(result).toEqual([expenses[1], expenses[0]]);
});

test('should sort by amount', () => {
    const updatedFilter = {
        ...filter,
        text: '',
        sortBy: 'amount'
    };
    const result  = selectExpenses(expenses, updatedFilter);

    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});