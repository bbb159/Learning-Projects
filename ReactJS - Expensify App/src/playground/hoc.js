//Higher Order Component ( HOC ) = a component (Higher order component) that renders another component
//Re-use code
//Render hijacking
//Prop manipulation
//Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>INFO BITCH</h1>
        <p>THIS IS THE INFO BITCH {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>*this is private info bitch*</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props}/>: <p>YOU NEED TO AUTHENTICATE</p>}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info='this is the info bitch' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info='this is the info bitch'/>, document.getElementById('app'));