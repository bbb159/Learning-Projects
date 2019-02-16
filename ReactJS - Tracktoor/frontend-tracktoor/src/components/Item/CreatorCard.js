import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ItemModal from './ItemModal';
import '../../styles/creatorCard.css';

class CreatorCard extends Component {

    state = {
        fullName: this.props.fullName,
        open: false
    }

    removeCreator = (e) => {
        e.preventDefault();
        this.props.removeCreator(this.props.id);
    }

    onChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    editCreator = (e) => {
        e.preventDefault();
        const { fullName } = this.state;
        this.props.editCreator(this.props.id, fullName);
        this.onCloseModal();
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {

        const { fullName } = this.props;
        const { open } = this.state;

        return (
            <div className="col-lg-3 col-sm-3 col-md-6">
                <div className="card" style={{width: '100%'}}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.fullName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Modificado em {this.props.modified.slice(0, 10)}</h6>
                        <div className="cardButton">
                            <button type="button" className="btn btn-info mr-2 alignRight" onClick={this.onOpenModal}>
                                <FontAwesomeIcon icon={faPencilAlt} size="1x" />
                            </button>
                            <button type="button" className="btn btn-danger alignRight" onClick={this.removeCreator}>
                                <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                            </button>
                        </div>
                    </div>
                </div>

                <ItemModal
                        open={open} 
                        onCloseModal={this.onCloseModal}
                        title={`Editando o autor: ${fullName}`}
                        modalDescription={'Preencha o nome do autor da Marvel'}
                        onChange={this.onChange}
                        name={this.state.fullName}
                        action={this.editCreator}
                        actionText="Editar"
                        item='creator'
                    />
            </div>
        );
    }
}

export default CreatorCard;