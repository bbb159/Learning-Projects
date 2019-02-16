import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup, confirmSignUp } from '../../actions/authActions';
import { addFlashMessage } from '../../actions/flashMessagesActions';

class SignUpPage extends Component {

    signUp = (data) => this.props.signup(data);

    confirmSignUp = (email, confirmationCode) => this.props.confirmSignUp(email, confirmationCode)
        .then(() => {
            this.props.addFlashMessage({
                type: 'success',
                text: 'Email confirmado com sucesso'
            });
            this.props.history.push('/login');
        })

    render() {
        return (
            <div className="row justify-content-center align-items-center">
                <SignUpForm signUp={this.signUp} confirmSignUp={this.confirmSignUp}/>
            </div>
        );
    }
}

SignUpPage.propTypes = {
    signup: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}


export default connect(null, { signup, addFlashMessage, confirmSignUp })(SignUpPage);