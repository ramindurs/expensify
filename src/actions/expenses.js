import database from '../firebase/firebase';

export const addExpense = (expense) => ({
        type: 'ADD_EXPENSE',
        expense
    }
);

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = {
            description,
            note,
            amount,
            createdAt
        };
        return database().ref(getFirebasePath(getState)).push(expense).then((fbRef) => {
            dispatch(addExpense({
                id: fbRef.key,
                ...expense
            }))
        })
    };
};

export const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = (id) => {
    return (dispatch, getState) => {
        const ref = `${getFirebasePath(getState)}/${id}`;
        return database().ref(ref).remove().then(() => {
            return dispatch(removeExpense(id));
        }).catch((error) => {
            console.error('Error removing ', ref);
        });
    };
};

export const editExpense = ({id, updates}) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = ({id, updates}) => {
    return (dispatch, getState) => {
        const ref = `${getFirebasePath(getState)}/${id}`;
        return database().ref(ref).update(updates).then(() => {
            return dispatch(editExpense({id, updates}));
        }).catch((error) => {
            console.error('Error updating', ref);
        });
    }
};

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        return database().ref(getFirebasePath(getState)).once('value')
            .then((dataSnapshot) => {
                const expenses = [];
                dataSnapshot.forEach((childSnapshot) => {
                    expenses.push({
                        ...childSnapshot.val(),
                        id: childSnapshot.key
                    });
                });
                return dispatch(setExpenses(expenses));
            });
    };
};

const getFirebasePath = (getState) => (`users/${getState().auth.uid}/expenses`);
