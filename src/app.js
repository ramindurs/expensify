import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import getVisibleExpenses from "./selectors/expenses";
import {addExpense} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import {Provider} from 'react-redux';
import 'normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

// Testing Redux
store.subscribe(() => {
        const state = store.getState();
        console.log(state);
        const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
        console.log(visibleExpenses);
    }
);

const e1 = store.dispatch(addExpense({
    description: 'Water Bill',
    amount: 1500,
    createdAt: 200
}));

const e2 = store.dispatch(addExpense({
    description: 'Gas Bill',
    amount: 200,
    createdAt: 10
}));

const e3 = store.dispatch(addExpense({
    description: 'Rent',
    amount: 109000,
    createdAt: 100
}));

store.dispatch(setTextFilter('bill'));
setTimeout(() => {
    store.dispatch(setTextFilter('water'));
}, 3000);
