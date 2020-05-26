import {v4 as uuidv4} from "uuid";
import database from '../firebase/firebase';

const FB_REF='expenses';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
    }
);

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const  {
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
        return database().ref(FB_REF).push(expense).then((fbRef) => {
            dispatch(addExpense({
                id: fbRef.key,
                ...expense
            }))
        })
    };
};

export const removeExpense = ({id}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const editExpense = ({id, updates}) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

