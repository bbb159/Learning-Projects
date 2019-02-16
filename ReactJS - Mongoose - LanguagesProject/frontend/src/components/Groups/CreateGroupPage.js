import React, { Component } from 'react';
import CreateGroupForm from './CreateGroupForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGroup } from '../../actions/groupsActions';
import { addFlashMessage } from '../../actions/flashMessagesActions';

class CreateGroupPage extends Component {

    submit = (data) => this.props.createGroup(data).then(
        () => {
            this.props.addFlashMessage({
                type: 'success',
                text: 'Grupo criado com sucesso!'
            });
            this.props.history.push("/dashboard");
        }
    );

    render() {
        return (
            <div className="row justify-content-center align-items-center">
                <CreateGroupForm submit={this.submit}/>
            </div>
        );
    }
}

CreateGroupPage.propTypes = {
    createGroup: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}


export default connect(null, { createGroup, addFlashMessage })(CreateGroupPage);