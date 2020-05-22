import expenseReducer from '../../reducers/expenses';
import expenses from "../fixtures/expenses";

test('should set empty default set', () => {
    const result = expenseReducer(undefined, { type: '@@INIIT'});

    expect(result).toEqual([]);
});

test('should add expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense:     {
            id: 4,
            description: 'Mobile',
            note: '',
            amount: 3000,
            createdAt: 3000
        },
    };

    const result = expenseReducer(expenses, action);

    expect(result).toEqual([...expenses, action.expense]);
});

test('should remove expense when it exists', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const result = expenseReducer(expenses, action);

    expect(result).toEqual([expenses[0], expenses[2]]);
});

test('should remove expense when it does not exists', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    };

    const result = expenseReducer(expenses, action);

    expect(result).toEqual(expenses);
});


test('should update an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            note: 'Test Note',
            amount: 30000
        }
    };

    const result = expenseReducer(expenses, action);

    expect(result).toEqual([expenses[0], {
        id: 2,
        description: 'Electric bill',
        note: 'Test Note',
        amount: 30000,
        createdAt: 2000
    }, expenses[2]]);
});

test('should not update an expense if id is not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates: {
            note: 'Test Note',
            amount: 30000
        }
    };

    const result = expenseReducer(expenses, action);

    expect(result).toEqual(expenses);
});