import React, { Component } from 'react';
import ItemComponent from './ItemComponent';

class SeriesPage extends Component {
    render() {
        return (
            <ItemComponent 
                itemName='/series'
                title='QUAIS SÃO AS SÉRIES?'
                titleDescription='Conheça mais sobre as
                    séries da Marvel. Se estiver confiante, adicione a sua clicando no botão abaixo!'
                createText='CRIAR SÉRIE'
                modalTitle='Criando sua série personalizada'
                modalDescription='Preencha o nome e a descrição da sua série da marvel, seja criativo!'
            />
        );
    }

}

export default SeriesPage;