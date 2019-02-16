import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import PropTypes from 'prop-types';

class LoginPage extends Component {

    login = (email, password) => this.props.login(email, password).then(() => this.props.history.push("/dashboard"));

    render() {
        return (
            <div className="row justify-content-center align-items-center">
                <div className="col-md-4 col-md-offset-4">
                    <LoginForm login={this.login}/>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired 
};

export default connect(null, { login } )(LoginPage);