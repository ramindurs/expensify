import {startAddExpense, addExpense, editExpense, removeExpense} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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
    const result = addExpense(expenses[2]);

    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mobile',
        note : 'Note',
        amount: 1234,
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense : {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database().ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const emptyExpense = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...emptyExpense
            }
        });
        return database().ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(emptyExpense);
        done();
    });
});
