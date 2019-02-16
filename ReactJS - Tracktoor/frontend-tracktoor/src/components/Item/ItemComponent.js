import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CharSerieCard from './CharSerieCard';
import CreatorCard from './CreatorCard';
import idGenerator from 'react-id-generator';
import ItemModal from './ItemModal';
import { getItens, getItensFiltered } from '../../actions/itemActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import '../../styles/itemComponent.css';

class CharSerieComponent extends Component {

    state = {
        itens: [{}],
        itemName: this.props.itemName,
        id: '',
        name: '',
        fullName: '',
        description: '',
        modified: '',
        open: false,
        page: 1,
        loading: true,
        search: '',
        order: '',
        errors: undefined
    }

    componentDidMount() {
        const { itemName } = this.state;
        this.props.getItens(itemName).then(res => {
            this.setState({itens: res.data.data.results, loading: false, errors: undefined});
        }).catch(err => this.setState({errors: err.message}));;
    }

    onChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    addItem = (e) => {
        e.preventDefault();
        let { itens, name, fullName, description, itemName } = this.state;
    
        const today = new Date(),
              modified = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        let item = {};

        if (itemName !== '/creators')
            item = {
                id: idGenerator(),
                name,
                description,
                modified
            }
        else 
            item = {
                id: idGenerator(),
                fullName: fullName,
                description,
                modified
            }
        itens.push(item)
        this.setState({itens});
        this.onCloseModal();
        this.clearState();
    }

    removeItem = (id) => {
        this.setState({ itens: this.state.itens.filter(item => {
            return item.id !== id;
        }) });
    }

    editItem = (id, name, description) => {
        let { itens, itemName } = this.state;
        const today = new Date(),
              modified = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let updatedItens = {}

        if (itemName !== '/creators')
            updatedItens = itens.map(item => (
                item.id === id ? {...item, name, description, modified}: item
            ));
        else
            updatedItens = itens.map(item => (
                item.id === id ? {...item, fullName: name, description, modified}: item
            ));
        this.setState({ itens: updatedItens });
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    clearState = () => {
        this.setState({name: '', description: '', id: '', modified: ''})
    }

    showPreviousPage = () => {
        if (this.state.page !== 1) {
            this.setState(state => ({
              page: state.page - 1,
            }));
        }
    }
    
    showNextPage = () => {
        this.setState({ page: this.state.page + 1 });
    }

    updateSearch = (e) => {
        this.setState({ search: e.target.value, page: 1 })
    }

    updateOrderBy = (e) => {
        this.setState({ loading: true, search: '' });
        let order = e.target.value;
        const { itemName } = this.state; 
        if (order === 'name'){
            if (itemName === '/creators') order = 'firstName';
            if (itemName === '/series') order = 'title';
        }
        this.props.getItensFiltered(itemName, order).then(res => {
            this.setState({itens: res.data.data.results, loading: false, errors: undefined});
        }).catch(err => this.setState({errors: err.message}));
    }
    
    render() {

        let { itens, loading, page, open, search, errors, itemName } = this.state;

        let filteredItens = itens.filter(item => {
            if (item.name !== undefined)
                return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            else if (item.title !== undefined)
                return item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            else if (item.fullName !== undefined && item.fullName !== '')
                return item.fullName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            return undefined;
        });


        const itemsToDisplay = itemName === '/creators' ? 4 : 2;
        const startIndex = (this.state.page - 1) * itemsToDisplay;
        const visibleItens = filteredItens.slice(startIndex, startIndex + itemsToDisplay);
        const maxPage = filteredItens.length === 0 ? 1 : Math.ceil(filteredItens.length / itemsToDisplay);

        const loadingItens = (
            <div className="loader"></div>
        );

        const requestError = (
            <div className="requestError">
                Houve um erro inesperado, serviço indisponível!
            </div>
        );

        const emptyList = (
            <div className="requestError">
                Não encontrado!
            </div>
        );

        return (
            <div>
            <div className="jumbotron jumbotron-fluid d-flex align-items-end"></div>

            <div className="container">
                <div className="title">
                <h1 className="jumboTitle">{this.props.title}</h1>
                <h6 className="jumboDescription">{this.props.titleDescription}</h6>
                    <button type="button" className="btn btn-danger mt-4" 
                        id="btnCreateChar" onClick={this.onOpenModal} disabled={loading}>
                        <FontAwesomeIcon icon={faPlus} size="1x" className="mr-4"/>
                        {this.props.createText}
                    </button>

                    <ItemModal
                        open={open} 
                        onCloseModal={this.onCloseModal}
                        title={this.props.modalTitle}
                        modalDescription={this.props.modalDescription}
                        onChange={this.onChange}
                        name={itemName !== '/creators' ? this.state.name : this.state.fullName}
                        description={this.state.description}
                        action={this.addItem}
                        actionText="Criar"
                        item={itemName !== '/creators' ? '' : 'creator'}
                    />
                </div>   
                
                <div className="title filter" style={{padding: '0'}}>
                    <div className="form-row col-lg-12 col-md-12 col-sm-12 mt-3" style={{padding: '0'}}>
                        <div className="col-sm-8 col-md-4 ">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Nome a ser filtrado" 
                                name="search"
                                onChange={this.updateSearch}
                                value={search}/>
                        </div>
                        <div className="col-sm-4 col-md-2">
                            <select className="custom-select" id="orderBySelect"
                                    onChange={this.updateOrderBy}>
                                <option defaultValue disabled>Ordenação</option>/
                                <option value="name">Nome</option>
                                <option value="modified">Data modificação</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="title mt-4">
                    <button type="button" className="btn btn-secondary mr-2" onClick={this.showPreviousPage} disabled={page === 1}>
                        <FontAwesomeIcon icon={faBackward} size="1x"/> Anterior
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={this.showNextPage} disabled={page === maxPage}>
                        Próxima <FontAwesomeIcon icon={faForward} size="1x"/>
                    </button>
                </div>

                {loading && !errors && loadingItens}
                {errors && requestError}
                {filteredItens.length === 0 && !loading && emptyList}
                
                    <div className="row mb-5">
                        {!loading && itemName !== '/creators' && visibleItens.map((item, index) => <CharSerieCard key={`${item.id}_${index}`}
                                                                    {...item} 
                                                                    removeCharSerie={this.removeItem} 
                                                                    editCharSerie={this.editItem} />)}
                    </div>
                    <div className="row mb-5">
                        {!loading && itemName === '/creators' && visibleItens.map((item, index) => <CreatorCard key={`${item.id}_${index}`}
                                                                    {...item}
                                                                    removeCreator={this.removeItem}
                                                                    editCreator={this.editItem} />)}
                    </div>
                
            </div>
            </div>
        );
    }

}

CharSerieComponent.propTypes = {
    getItens: PropTypes.func.isRequired,
    getItensFiltered: PropTypes.func.isRequired
}

export default connect(null, { getItens, getItensFiltered })(CharSerieComponent);