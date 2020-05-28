import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddExpense,
    addExpense,
    startEditExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startSetExpenses, startRemoveExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from '../../firebase/firebase';

const uid = 'USER_1234';
const authState = {
    auth: {
        uid
    }
};
const fbBasePath = `users/${uid}/expenses`;

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expenseData[id] = {description, note, amount, createdAt};
    });
    database().ref(fbBasePath).set(expenseData).then(() => {
        done();
    });
});

test('should set up remove expense action', () => {
    const result = removeExpense(1234);

    expect(result).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 1234
    });
});

test('should start removing expense', (done) => {
    const store = createMockStore(authState);
    const idToDelete = expenses[1].id;

    store.dispatch(startRemoveExpense(idToDelete)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: idToDelete
        });
        return database().ref(`${fbBasePath}/${idToDelete}`).once('value')
            .then((snapshot) => {
                expect(snapshot.val()).toBeFalsy();
                done();
            })
    });
});

test('should set up edit expense action', () => {
    const result = editExpense({id: '1234', updates: {description: 'test'}});

    expect(result).toEqual({
        type: 'EDIT_EXPENSE',
        id: '1234',
        updates: {
            description: 'test'
        }
    });
});

test('should start edit expense action', (done) => {
    const store = createMockStore(authState);
    const expenseToEdit = {
        ...expenses[1],
        description: 'New Description',
        amount: 9999,
        note: 'New note',
        createdAt: 999999999
    };

    store.dispatch(startEditExpense({id: expenseToEdit.id, updates: expenseToEdit})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: expenseToEdit.id,
            updates: {
                ...expenseToEdit
            }
        });
        return database().ref(`${fbBasePath}/${expenseToEdit.id}`).once('value')
            .then((snapshot) => {
                expect(snapshot.val()).toEqual(expenseToEdit);
                done();
            });
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
    const store = createMockStore(authState);
    const expenseData = {
        description: 'Mobile',
        note: 'Note',
        amount: 1234,
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database().ref(`${fbBasePath}/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(authState);
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
        return database().ref(`${fbBasePath}/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(emptyExpense);
        done();
    });
});

test('should setup set expense action with data', () => {
    const action = setExpenses(expenses);

    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});


test('should fetch the expenses from the database', (done) => {
    const store = createMockStore(authState);
    store.dispatch(startSetExpenses({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });

});
