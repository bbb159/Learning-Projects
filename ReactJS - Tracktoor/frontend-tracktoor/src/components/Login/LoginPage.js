import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import PropTypes from 'prop-types';

class LoginPage extends Component {

    submit = (data) => this.props.login(data).then(() => this.props.history.push("/personagens"));

    render(){
        return (
            <LoginForm submit={this.submit}/>
        );
    }

}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);