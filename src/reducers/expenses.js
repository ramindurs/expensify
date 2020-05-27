
const expensesRedecuerDefaultState = [];

export default (state = expensesRedecuerDefaultState, action) => {
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
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};