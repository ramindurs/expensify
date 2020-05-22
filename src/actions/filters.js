export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

export const setSortByDate = () => setSortBy();

export const setSortByAmount = () => setSortBy('amount');

const setSortBy = (sortBy = 'date') => ({
    type: 'SET_SORT_BY',
    sortBy
});

export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

export const filterReducerDefaultState = {
    text: 'rent',
    sortBy: 'date', //date or amount
    startDate: undefined,
    endDate: undefined
};