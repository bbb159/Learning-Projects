import React, { Component } from 'react';
import TextFieldGroup from '../Common/TextFieldGroup';
import PropTypes from 'prop-types';
import validator from 'validator';

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        errors: {},
        isLoading: false
    };

    validate = () => {
        const { email, password } = this.state;
        const errors = {};
        if (!validator.isEmail(email)) errors.email = "Email inválido!";
        if (!password) errors.password = "Password é obrigatório";
        return errors;
    }
    onSubmit = (e) => {
        e.preventDefault();
        let errors = this.validate();
        this.setState({errors});
        const { email, password } = this.state;
        if (Object.keys(errors).length === 0) {
            this.setState({ isLoading: true })
            this.props
                .login(email, password)
                .catch(err => this.setState({ errors: err, isLoading: false }));
        }
    }

    onChange = (e) => {
        this.setState(...this.state, { [e.target.name]: e.target.value })
    }

    

    render() {
        const { errors, email, password, isLoading } = this.state;
        return (
            
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <TextFieldGroup 
                    field="email"
                    label="Email"
                    value={email}
                    error={errors.email}
                    onChange={this.onChange}
                />

                <TextFieldGroup 
                    field="password"
                    label="Password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                />

                <div className="form-group"><button className="btn-primary btn-lg" disabled={isLoading}>Login</button></div>

                { errors.message && <div className="alert-danger">{errors.message}</div> }
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}

export default (LoginForm);