import React, { Component } from 'react';
import ItemComponent from './ItemComponent';

class CharactersPage extends Component {
    render() {
        return (
            <ItemComponent 
                itemName='/characters'
                title='QUAIS SÃO OS PERSONAGENS?'
                titleDescription='Conheça mais sobre os
                    personagens da Marvel. Se estiver confiante, adicione seu herói clicando no botão abaixo!'
                createText='CRIAR PERSONAGEM'
                modalTitle='Criando seu personagem personalizado'
                modalDescription='Preencha o nome e a descrição do seu personagem da marvel, seja criativo!'
            />
        );
    }

}

export default CharactersPage;