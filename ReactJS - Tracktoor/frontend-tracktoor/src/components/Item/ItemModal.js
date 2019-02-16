import React from 'react';
import styles from '../../styles/itemModal.css';
import Modal from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPencilAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';

const CharSerieModal = ({open, onCloseModal, title, modalDescription, onChange, name, description, action, actionText, item=''}) => {
    return (
        <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
                transitionEnter: styles.transitionEnter,
                transitionEnterActive: styles.transitionEnterActive,
                transitionExit: styles.transitionExitActive,
                transitionExitActive: styles.transitionExitActive,
                modal: styles.modal
            }}
            animationDuration={1000} >
            <div className="header">
                <h3>{title}</h3>
                <p>{modalDescription}</p>
            </div>

            <div className="modalCharacter">
                <form>
                    <hr />
                    <div className="form-group row">
                    <label htmlFor="charName" className="col-sm-12 col-md-12 col-lg-12 col-form-label"><strong>Nome</strong></label>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <input
                                type="text"
                                className="form-control"
                                id="charName"
                                name={item === 'creator' ? "fullName" : "name"}
                                onChange={onChange}
                                value={name} 
                                required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="charDescription" className="col-sm-12 col-md-12 col-lg-12 col-form-label"><strong>Descrição</strong></label>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <textarea 
                                className="form-control description" 
                                name="description"
                                id="charDescription"
                                rows="5"
                                onChange={onChange}
                                value={description}
                                disabled={item === 'creator'} >
                            </textarea>
                        </div>
                    </div>
                    <hr />
                    <div className="modalActions">
                        <button type="submit" className="btn btn-info mr-2" disabled={name === ''} onClick={action}>
                            {actionText === 'Criar' && <FontAwesomeIcon icon={faPlusSquare} size="1x" /> }
                            {actionText === 'Editar' && <FontAwesomeIcon icon={faPencilAlt} size="1x" />} {actionText}
                        </button>
                        <button type="button" className="btn btn-danger mr-2" onClick={onCloseModal}>
                        <FontAwesomeIcon icon={faWindowClose} size="1x" /> Fechar
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default CharSerieModal;