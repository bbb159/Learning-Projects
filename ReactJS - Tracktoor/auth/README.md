# Marvel API - Authenticated Proxy

## Requisitos

- NodeJS 8.10.x
- NPM 5.6.x

## Instalação

`npm install`

## Rodando

`npm start`

O servidor estará rodando em `http://localhost:5000`

## Autenticação

Para autenticar é preciso enviar uma requisição _**POST**_ para: `/login`  
Enviando os seguintes parâmetros em formato _**JSON**_:

```
user: rick_sanchez
password: 7719836421125
```

O servidor irá retornar um header _**Authorization**_ que deve ser enviado em todas as futuras requisições.  

No corpo da resposta você receberá um *JSON* contendo as informações do usuário.

## Acessando a Marvel API

Para acessar a API da Marvel basta acessar `/marvel`, passando a _query string_ `apikey` como manda a [Documentação da Marvel](https://developer.marvel.com/docs).  

Exemplo: `http://localhost:5000/marvel/characters?apikey=...`
