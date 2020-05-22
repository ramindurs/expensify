import moment from "moment";

export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment) : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment) : true;
        const textMatch = expense.description.toUpperCase().indexOf(text.toUpperCase()) !== -1;
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => (sortBy === 'date' ? b.createdAt - a.createdAt: b.amount - a.amount));
};