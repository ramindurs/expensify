import 'react-dates/initialize';
import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from "react-dates";


export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        const expense = props.expenseToEdit;
        this.state = {
            description: expense && expense.description ? expense.description : '',
            note: expense && expense.note ? expense.note : '',
            amount: expense && expense.amount ? this.convertIntToFloatString(expense.amount) : '',
            createdAt: expense && expense.createdAt ? moment(expense.createdAt) : moment(),
            calendarFocus: false,
            error: ''
        };
    }
    convertIntToFloatString = (intnum) => parseFloat(intnum) / 100;

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note}));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}));
        }
    };
    onDateChange = (date) => {
        if (!!date) {
            this.setState(() => ({createdAt: date}));
        }
    };
    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocus: focused}));
    };
    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.description && this.state.amount) {
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                note: this.state.note,
                amount: Math.round(parseFloat(this.state.amount, 10) * 100),
                createdAt: this.state.createdAt.valueOf()
            });
        } else {
            this.setState(() => ({error: 'Please provide description and amount'}));
        }
    };

    render() {
        return (
            <div>
                {this.state.error ? <p>{this.state.error}</p> : ''}
                <form onSubmit={this.onSubmitForm}>
                    <input
                        type="text"
                        placeholder={'description'}
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        autoFocus/>
                    <input
                        type="text"
                        placeholder={'amount'}
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocus}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        onChange={this.onNoteChange}
                        value={this.state.note}
                        placeholder={'Add a note'}>
                    </textarea>
                    <button>{this.props.submitMessage}</button>
                </form>
            </div>
        )
    };
};
