import React, { Component } from 'react';
import TextFieldGroup from '../Common/TextFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CreateGroupForm extends Component {
    state = {
        name: '',
        language: '',
        description: '',
        location: '',
        level: '',
        maxUsersAmount: '',
        owner: this.props.userId,
        errors: {},
        isLoading: false
    }

    onChange = (e) => {
        this.setState(...this.state, { [e.target.name]: e.target.value })
    }

    validate = (data) => {
        const errors = {};
        if (!data.name) errors.name = "Nome é obrigatório";
        if (!data.language) errors.language = "Idioma do grupo é obrigatório";
        if (!data.description) errors.description = "Descrição é obrigatório";
        if (!data.location) errors.location = "Localização é obrigatório";
        if (!data.level) errors.level = "Nível é obrigatório";
        if (!data.maxUsersAmount) errors.maxUsersAmount = "Quantidade máxima de usuários é obrigatório";
        return errors;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({ isLoading: true });
            this.props
                .submit(this.state)
                .catch(err => this.setState({ errors: err.response.data.errors, isLoading: false }));
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Cadastre um novo grupo</h1>

                <TextFieldGroup
                    error={errors.name}
                    label="Nome"
                    onChange={this.onChange}
                    value={this.state.name}
                    field="name"
                />

                <TextFieldGroup
                    error={errors.language}
                    label="Idioma"
                    onChange={this.onChange}
                    value={this.state.language}
                    field="language"
                />

                <TextFieldGroup
                    error={errors.description}
                    label="Descrição"
                    onChange={this.onChange}
                    value={this.state.description}
                    field="description"
                />

                <TextFieldGroup
                    error={errors.location}
                    label="Localização"
                    onChange={this.onChange}
                    value={this.state.location}
                    field="location"
                />

                <TextFieldGroup
                    error={errors.level}
                    label="Nível"
                    onChange={this.onChange}
                    value={this.state.level}
                    field="level"
                />

                <TextFieldGroup
                    error={errors.maxUsersAmount}
                    label="Quantidade máxima de usuários"
                    onChange={this.onChange}
                    value={this.state.maxUsersAmount}
                    field="maxUsersAmount"
                />

                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Criar</button>
                </div>

                { errors.global && <div className="alert-danger">{errors.global}</div> }

            </form>
        );
    }
}

CreateGroupForm.propTypes = {
    submit: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.user.userId
    }
}

export default connect(mapStateToProps)(CreateGroupForm);