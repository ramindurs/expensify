import {createStore} from "redux";

// Action generators
const incrementCount = ({incrementBy = 1} = {}) => (
    {
        type: 'INCREMENT_COUNT',
        incrementBy
    }
);

const decrementCount = ({decrementBy = 1} = {}) => (
    {
        type: 'DECREMENT_COUNT',
        decrementBy
    }
);

const resetCount = () => (setCount());

const setCount = ({countValue = 0} = {}) => (
    {
        type: 'SET_COUNT',
        countValue
    }
);

// This is called a reducer
// 1. reducers are pure functions - does not depend on outside scope variables or change them
// 2. never changes state or action
const reducer = (state = {
    count: 0
}, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT_COUNT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET_COUNT':
            return {
                count: action.countValue
            };
        default:
            return state;
    }
};
const store = createStore(reducer);

const reduxUnsubscription = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(decrementCount());

store.dispatch(incrementCount({incrementBy: 10}));

store.dispatch(incrementCount());

store.dispatch(setCount({countValue: 100}));

store.dispatch(resetCount());

reduxUnsubscription();