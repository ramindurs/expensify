import React from 'react';
import {Link} from 'react-router-dom';

export const Expense = ({ id, description, amount, createdAt, dispatch, history}) => {
    return (
        <div>
            <p>{id} <Link to={`/edit/${id}` }>{description}</Link> {amount} {createdAt}</p>
        </div>
    );
};

export default Expense;
