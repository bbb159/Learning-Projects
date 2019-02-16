import React, { Component } from 'react';
import '../../styles/login.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

class LoginForm extends Component {
    
    state = {
        user: '',
        password: '',
        errors: false
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props
            .submit(this.state)
            .catch(err => this.setState({errors: true}));
    }

    onChange = (e) => {
        this.setState({...this.state, [e.target.name]: e.target.value });
    }

    render() {
        const { errors, user, password } = this.state;
        return (
            <div id="loginForms" className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-4 col-md-offset-4 loginBox">
                        <form onSubmit={this.onSubmit} id="loginForm" className="form-group">
                        <p className="loginTitle">LOGIN</p>
                        <hr />
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="addonUsername">
                                        <FontAwesomeIcon icon={faUserAstronaut} size="2x" className="icon"/>
                                    </span>
                                </div>
                                <input className="form-control inputText"
                                    type="text"
                                    name="user"
                                    value={user}
                                    onChange={this.onChange}
                                    placeholder="Username"
                                    required
                                    />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="addonPassword">
                                        <FontAwesomeIcon icon={faUnlockAlt} size="2x" className="icon"/>
                                    </span>
                                </div>
                                <input className="form-control inputText"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                    placeholder="Password"
                                    required
                                    />
                            </div>

                            <div className="input-group error">
                                {errors && <p>* Usuário ou senha inválidos</p>}
                            </div>

                            <div className="input-group">
                                <button className="btn-danger btn-lg login">Login</button>
                            </div>

                            
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default LoginForm;