import React from 'react';
import {Link} from 'react-router-dom';
import moment from "moment";
import numeral from 'numeral';

export const Expense = ({ id, description, amount, createdAt, dispatch, history}) => {
    return (
        <div>
            {id} <Link to={`/edit/${id}` }>{description}</Link>
            <p>
                {numeral(amount / 100).format('0,0.00')}
                -
                {moment(createdAt).format('MMM Do YYYY')}
            </p>
        </div>
    );
};

export default Expense;
