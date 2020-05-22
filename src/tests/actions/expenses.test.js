import {addExpense, editExpense, removeExpense} from "../../actions/expenses";

test('should set up remove expense action', () => {
    const result = removeExpense({id: '1234'});

    expect(result).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '1234'
    });
});

test('should set up edit expense action', () => {
    const result = editExpense({id: '1234', updates: { description: 'test'}});

    expect(result).toEqual({
        type: 'EDIT_EXPENSE',
        id: '1234',
        updates: {
            description: 'test'
        }
    });
});

test('should set up provided values for adding expense', () => {
    const expense = {
        description: 'test desc',
        note: 'test note',
        amount: 1234,
        createdAt: 1000
    };
    const result = addExpense(expense);

    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expense,
            id: expect.any(String)
        }
    });
});

test('should set up default values for adding expense', () => {
    const result = addExpense({});
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});