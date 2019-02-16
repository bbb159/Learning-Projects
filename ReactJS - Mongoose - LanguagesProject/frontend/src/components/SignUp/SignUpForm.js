import React, { Component } from "react";
import TextFieldGroup from '../Common/TextFieldGroup';
import validator from 'validator';
import PropTypes from 'prop-types';

import { Auth } from 'aws-amplify';

class SignUpForm extends Component {

    state = {
        name: '',
        email: '',
        address: '',
        password: '',
        verificationCode: '',
        showVerifyCode: false,
        errors: {},
        isLoading: false
    };

    onChange = (e) => {
        this.setState({ ...this.state,  [e.target.name]: e.target.value })
    }

    validate = (data) => {
        const errors = {};
        if (!data.name) errors.fullName = "Nome é obrigatório";
        if (!data.address) errors.address = "Endereço é obrigatório";
        if (!validator.isEmail(data.email)) errors.email = "Email inválido!";
        if (!data.password) errors.password = "Password é obrigatório";
        return errors;
    }

    validateVerifyCode = () => {
        const { verificationCode } = this.state;
        const errors = {};
        if (!verificationCode) errors.verificationCode = "Digite um código válido";
        return errors;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({ isLoading: true });
            this.props
                .signUp(this.state)
                .then(() => this.setState({ showVerifyCode: true }))
                .catch(err => this.setState({ errors: err, isLoading: false }));
        }
    }

    onVerifyCode = (e) => {
        e.preventDefault();
        const { email, verificationCode } = this.state;
        const errors = this.validateVerifyCode();
        this.setState({errors});
        if (Object.keys(errors).length === 0){
            this.props.confirmSignUp(email, verificationCode)
            .catch(err => this.setState({ errors: err, isLoading: false }));
        }   
    }

    render() {
        const { errors, showVerifyCode } = this.state;
        const formVerificationCode = (
            <form onSubmit={this.onVerifyCode}>
                <TextFieldGroup 
                    error={errors.verificationCode}
                    label="Código de verificação"
                    onChange={this.onChange}
                    value={this.state.verificationCode}
                    field="verificationCode"
                />

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">Confirmar</button>
                </div>
            </form>
        );
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Faça parte dessa experiência!</h1>

                    <TextFieldGroup 
                        error={errors.fullName}
                        label="Nome completo"
                        onChange={this.onChange}
                        value={this.state.name}
                        field="name"
                    />

                    <TextFieldGroup 
                        error={errors.email}
                        label="Email"
                        onChange={this.onChange}
                        value={this.state.email}
                        field="email"
                    />

                    <TextFieldGroup 
                        error={errors.password}
                        label="Password"
                        onChange={this.onChange}
                        value={this.state.password}
                        field="password"
                        type="password"
                    />

                    <TextFieldGroup 
                        error={errors.address}
                        label="Endereço"
                        onChange={this.onChange}
                        value={this.state.address}
                        field="address"
                    />
                    
                    <div className="form-group">
                        <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Registar</button>
                    </div>

                    { errors.message && <div className="alert-danger">{errors.message}</div> }
                </form>
                {showVerifyCode && formVerificationCode}
            </div>
            
        );
    }

}

SignUpForm.propTypes = {
    signUp: PropTypes.func.isRequired
}

export default SignUpForm;