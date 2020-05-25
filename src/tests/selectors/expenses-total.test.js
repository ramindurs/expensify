import expensesTotal from '../../selectors/expenses-total';
import expenses from "../fixtures/expenses";

test('should give a total of 0 when there are no expenses', () => {
    const total = expensesTotal([]);

    expect(total).toEqual(0);
});

test('should give a total when there is only one expense', () => {
    const anExpense = expenses[1];
    const total = expensesTotal([anExpense]);

    expect(total).toEqual(anExpense.amount);
});

test('should give a total when there are more than one expenses', () => {
    const total = expensesTotal(expenses);

    expect(total).toEqual(24500);
});