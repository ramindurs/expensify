import React from 'react';
import {Link} from "react-router-dom";

const NotFoundPage = () => (
    <div>
        <h3>Not Found!</h3>
        <Link to="/">Go to Home</Link>
    </div>
);

export default NotFoundPage;