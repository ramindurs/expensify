
export default (expenses) => expenses.map(e => e.amount).reduce((a,b) => a + b, 0);