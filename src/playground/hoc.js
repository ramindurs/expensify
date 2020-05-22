// Higher Order Component (HOC) - A component that renders another component
// Render hijacking
// props manipulation
// Abstract state
import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is {props.info}</p>
    </div>
);

// This is a HOC
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin &&  <p>This is private info - please do not share!</p> }
            <WrappedComponent {...props}/>
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);

const requireAuthentication = (WrappedComponenet) => {
    return (props) => (
        <div>
            { !!props.isAuthenticated ? <WrappedComponenet {...props}/> : <p>Please Authenticate first to see the page.</p>}
        </div>
    );
};
const AuthInfo = requireAuthentication(AdminInfo);

ReactDOM.render(<AuthInfo isAuthenticated={true} isAdmin={false} info="This is some info"/>, document.getElementById('app'));
