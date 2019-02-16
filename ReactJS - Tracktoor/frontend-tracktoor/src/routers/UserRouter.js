import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UserRouter = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={props => 
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />}
        />
);

UserRouter.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(UserRouter);