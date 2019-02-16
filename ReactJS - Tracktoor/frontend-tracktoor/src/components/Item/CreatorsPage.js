import React, { Component } from 'react';
import ItemComponent from './ItemComponent';

class CreatorsPage extends Component {
    render() {
        return (
            <ItemComponent 
                itemName='/creators'
                title='QUEM SÃO OS AUTORES?'
                titleDescription='Conheça mais sobre os autores de conteúdo da Marvel.
                Se estiver confiante, adicione um novo autor!'
                createText='CRIAR AUTOR'
                modalTitle='Criando seu autor personalizado'
                modalDescription='Preencha o nome completo e a descrição do novo autor, seja criativo!'
            />
        );
    }

}


export default CreatorsPage;