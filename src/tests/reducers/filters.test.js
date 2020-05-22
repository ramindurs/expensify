import filterReducer from '../../reducers/filters';
import moment from "moment";

const defaultFilter = {
    text: 'rent',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};
test('should set up default values', () => {
    const result = filterReducer(undefined, {type: '@@INIT'});

    expect(result).toEqual(defaultFilter);
});

test('should set text filter', () => {
    const result = filterReducer(defaultFilter, {
        type: 'SET_TEXT_FILTER',
        text: 'bill'
    });

    expect(result).toEqual({
        ...defaultFilter,
        text: 'bill'
    });
});

test('should set sortBy filter', () => {
    const result = filterReducer(defaultFilter, {
        type: 'SET_SORT_BY',
        sortBy: 'amount'
    });

    expect(result).toEqual({
        ...defaultFilter,
        sortBy: 'amount'
    });
});

test('should set startDate filter', () => {
    const result = filterReducer(defaultFilter, {
        type: 'SET_START_DATE',
        startDate: moment(1000)
    });

    expect(result).toEqual({
        ...defaultFilter,
        startDate: moment(1000)
    });
});

test('should set endDate filter', () => {
    const result = filterReducer(defaultFilter, {
        type: 'SET_END_DATE',
        endDate: moment(1000)
    });

    expect(result).toEqual({
        ...defaultFilter,
        endDate: moment(1000)
    });
});