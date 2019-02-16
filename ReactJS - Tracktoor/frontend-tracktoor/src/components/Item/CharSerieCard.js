import React, { Component } from 'react';
import ItemModal from './ItemModal';
import '../../styles/charSerieCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class CharSerieCard extends Component {

    state = {
        name: this.props.name ? this.props.name : this.props.title,
        description: this.props.description,
        open: false
    }

    removeCharSerie = (e) => {
        e.preventDefault();
        this.props.removeCharSerie(this.props.id);
    }

    onChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    editCharSerie = (e) => {
        e.preventDefault();
        const { name, description } = this.state;
        this.props.editCharSerie(this.props.id, name, description);
        this.onCloseModal();
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {

        const { thumbnail, name, description, title } = this.props;

        const nameOrTitle = name ? name : title;
        const editModalTitle = name ? 'Editando o personagem' : 'Editando a série'
        const editModalDescription = name ? `Preencha o nome e a descrição do seu personagem da Marvel. Seja criativo!` 
                                        : 'Preencha o nome e a descrição da sua série da Marvel. Seja criativo!'

        const { open } = this.state;
        const url = thumbnail ? thumbnail.path : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/';

        return (
            <div className="col-sm-12 col-md-6 col-lg-6 mt-4">
                <div className="card card-inverse card-info">
                    <div className="zoom">
                        <img className="card-img-top" src={`${url}/landscape_incredible.jpg`} />
                    </div>
                    <div className="card-block">
                        <figure className="profile">
                            <img src={`${url}/landscape_incredible.jpg`} className="profile-avatar" alt="" />
                        </figure>
                        <h5 className="card-title mt-3">{nameOrTitle}</h5>
                        <div className="card-text">
                            {description}
                        </div>
                    </div>
                    <div className="card-footer">
                        Modificado em: {this.props.modified.slice(0, 10)}
                        <button type="button" className="btn btn-danger" onClick={this.removeCharSerie}>
                            <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                        </button>
                        <button type="button" className="btn btn-info mr-2" onClick={this.onOpenModal}>
                            <FontAwesomeIcon icon={faPencilAlt} size="1x" />
                        </button>
                    </div>
                </div>

                <ItemModal
                        open={open} 
                        onCloseModal={this.onCloseModal}
                        title={`${editModalTitle}: ${nameOrTitle}`}
                        modalDescription={editModalDescription}
                        onChange={this.onChange}
                        name={this.state.name}
                        description={this.state.description}
                        action={this.editCharSerie}
                        actionText="Editar"
                    />
            </div>
        );
    }
}

export default CharSerieCard;