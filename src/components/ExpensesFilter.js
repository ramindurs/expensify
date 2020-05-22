import React from 'react';
import {connect} from 'react-redux';
import { DateRangePicker} from "react-dates";
import {setSortByAmount, setSortByDate, setTextFilter, setStartDate, setEndDate} from "../actions/filters";

export class ExpensesFilter extends React.Component {
    state = {
        calendarFocused: null
    };

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onTextFilterChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    setSortBy = (e) => {
        const sortBy = e.target.value;
        switch (sortBy) {
            case 'amount':
                this.props.setSortByAmount();
                return;
            default:
                this.props.setSortByDate();
                return;
        }
    };

    onFocusChange = (focusedInput) => {
        this.setState(() => ({ calendarFocused: focusedInput}));
    };

    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={this.onTextFilterChange}/>
                <select
                    value={this.props.filters.sortBy}
                    onChange={this.setSortBy}>
                    <option value={'date'}>Date</option>
                    <option value={'amount'}>Amount</option>
                </select>
                <DateRangePicker
                    startDateId={'startDate'}
                    startDate={this.props.filters.startDate}
                    endDateId={'endDate'}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates={true}
                />
            </div>
        );
    }
}

const mappedStateToProps = (state) => {
    return {
        filters: state.filters
    }
};

const mappedDispatchToProps = (dispatch) => {
    return {
        setStartDate: (date) => dispatch(setStartDate(date)),
        setEndDate: (date) => dispatch(setEndDate(date)),
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        setSortByAmount: () => dispatch(setSortByAmount()),
        setSortByDate: () => dispatch(setSortByDate())
    };
};

export default connect(mappedStateToProps, mappedDispatchToProps)(ExpensesFilter);