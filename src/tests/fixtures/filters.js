import moment from 'moment';

const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: moment(0)
};

const altFilters = {
    text: '',
    sortBy: 'amount',
    startDate: moment(1500),
    endDate: moment(4000)
};

export {filters, altFilters};