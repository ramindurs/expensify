import {createStore, combineReducers} from "redux";
import {v4 as uuidv4} from 'uuid';

// actions
const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({id}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpence = ({id, updates}) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toUpperCase().indexOf(text.toUpperCase()) !== -1;
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => (sortBy === 'date' ? b.createdAt - a.createdAt: b.amount - a.amount));
};

const expensesRedecuerDefaultState = [];
const expenseReducer = (state = expensesRedecuerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(ex => ex.id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => expense.id !== action.id ? expense : {
                ...expense,
                ...action.updates
            });
        default:
            return state;
    }
};

// actions for filter
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const setSortByDate = () => setSortBy();

const setSortByAmount = () => setSortBy('amount');

const setSortBy = (sortBy = 'date') => ({
    type: 'SET_SORT_BY',
    sortBy
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

const filterReducerDefaultState = {
    text: 'rent',
    sortBy: 'date', //date or amount
    startDate: undefined,
    endDate: undefined
};
const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SET_SORT_BY':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters: filterReducer
    })
);
store.dispatch(setTextFilter('drink'));
store.dispatch(setStartDate(10));
store.dispatch(setEndDate(30));
store.dispatch(setSortByAmount());

store.subscribe(() => {
        const state = store.getState();
        console.log(state);
        const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
        console.log(visibleExpenses);
    }
);

const e1 = store.dispatch(addExpense({
    description: 'Rent',
    amount: 1500
}));

const e2 = store.dispatch(addExpense({
    description: 'Drinks: Coffee',
    amount: 200,
    createdAt: 10
}));

const e3 = store.dispatch(addExpense({
    description: 'Drinks: Ice Tea',
    amount: 100,
    createdAt: 20
}));

const e4 = store.dispatch(addExpense({
    description: 'Drinks Coffee (Iced)',
    amount: 300,
    createdAt: 30
}));

//store.dispatch(removeExpense({id: e1.expense.id}));

store.dispatch(editExpence({
    id: e2.expense.id, updates:
        {
            note: 'This is a new note',
            amount: 250
        }
}));

// store.dispatch(setTextFilter());

store.dispatch(setSortByDate());

// store.dispatch(setStartDate());


const demoStore = {
    expenses: [{
        id: '12334',
        description: 'January rent',
        note: 'This is final payment',
        amount: 50000,
        createdAt: 0
    }],
    filter: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// object spread operator
const user = {
    name: 'ramindur',
    age: 58
};
