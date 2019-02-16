![Tracktoor](./logo.png)

# Developer Challenge
Procuramos por desenvolvedores entusiastas, pessoas que gostam de desafiar seus limites e não tem medo de sujar as mãos em ambientes desconhecidos.  

Preparamos alguns desafios para você!  
Resolva todos que quiser ou o máximo que conseguir 💪   

Recomendamos que você comece pelos desafios que se identifica mais, que acha mais fácil e pode mostrar toda sua capacidade. Deixe por último aqueles que queira avaliar como bônus 😉   

Não precisa resolver todos os desafios, que seja um, mas seja o seu melhor!

Leia todos os desafios antes de começar, em seguida faça um _fork_ desse repositório e comece a trabalhar.
Quando finalizar, abra um _Pull Request_ da sua resolução para este repositório.

# Let the games begin

Antes de ir para o que interessa, saiba que utilizaremos a [Marvel API](https://developer.marvel.com) para os desafios abaixo, portanto prepare seu terreno. [Acesse o site](https://developer.marvel.com/), clique em **Get Key**, siga os passos para conseguir sua chave e prepare-se!  

## Show your knowledge!

Aqui não existem limites, mostre tudo o que sabe. Documentação, git flow, boas práticas, arquitetura, teste, automação, o céu é o limite e estamos considerando tudo o que nos mostrar 🤘🤘🤘   

Se utilizar programação web funcional ganha nosso respeito!  

Ah! E não se esqueça, **KISS**    


1. Frontend Mastery  
  1.1 [Desafio - Make it work](#11-desafio---make-it-work)  
  1.2 [Desafio - Make it right](#12-desafio---make-it-right)  
  1.3 [Desafio - Show me what you got](#13-desafio---show-me-what-you-got)   
2. Backend Mastery  
  2.1 [Desafio - Start small](#21-desafio---start-small)  
  2.2 [Desafio - Think bigger](#22-desafio---think-bigger)  
3. [Desafio Bonus - Wubba lubba dub dub](#3-desafio-bonus---wubba-lubba-dub-dub)  



----------

**1. Frontend Mastery**

# 1.1 Desafio - Make it work
## Lista de personagens, autores e series

O objetivo aqui é **fazer** **as coisas** **funcionarem**, portanto use o framework que quiser e as ferramentas que achar necessárias para resolver o problema da forma mais eficiente.  
Agora que já temos nossa chave de acesso à [Marvel API](https://developer.marvel.com/), vamos continuar.  

## Requisitos
- a aplicação deverá ter um menu superior com as seguintes opções: **Personagens**, **Autores** e **Séries;**
- ao clicar em alguma das opções do menu, a aplicação deverá exibir uma página com a listagem correspondente a opção selecionada;
- as informações da lista serão buscadas da API através de uma requisição HTTP;
- cada item da lista deverá conter: **Titulo ou nome** e **data de modificação**;
- a lista deverá ter paginação, ou scroll infinito;

Se chegou até aqui você está bem 👏👏👏  
Pode avançar para o próximo desafio ou, caso se sinta confiante:  


- adicione um botão para remover um item (não se preocupe, não precisa persistir as mudanças);
- adicione um botão para adicionar um novo item, crie um formulário para preencher os dados que entrarão na lista;
- adicione um botão para editar um item, utilizando o mesmo formulário criado acima;

🚀🚀🚀🚀🚀


# 1.2 Desafio - Make it right
## Customizações, usabilidade e interação

Agora que já temos uma lista funcionando, está na hora de tornar a experiência do usuário mais agradável.   

Mostre o que você sabe fazer! ☺️   

HTML, CSS, SVG, animações, micro interações…  
Tudo é permitido, faça bom uso dos recursos do navegador para garantir uma experiência bacana.  

O único requisito aqui é que o layout seja responsivo e funcione em qualquer device.  
Portanto pense nas limitações do mobile, lembre também das ações que dependem de uma requisição e que fazem com que o usuário tenha que esperar. Tudo isso deve ser uma experiência agradável. Esse é o desafio!  
  
Ah! Se quiser nos agradar, utilize o conceito Type Design na aplicação do seu layout 😉   
Aqui vai um artigo para te ajudar:   https://www.toptal.com/designers/ui/type-design 

# 1.3 Desafio - Show me what you got
## Autenticação, filtros, ordenação e otimização

Já chegou no terceiro desafio? PARABÉNS! 🤩 

**Autenticação**

Pra fechar com chave de ouro nossos desafios de *frontend*, preparamos para você um servidorzinho de autenticação. O servidor está localizado na pasta /auth desse repositório.  

Dentro da pasta você encontrará instruções para rodar o servidor no arquivo README.md      
Esse servidor funciona como um proxy para a Marvel API, porém para acessar a API é preciso que você autentique o usuário.  

As instruções para autenticar também estão disponíveis dentro da pasta.  

Ao autenticar você receberá um *TOKEN* que deve ser repassado no _header_ _Authorization_ das demais requisições, concedendo acesso à API.  

**Filtros e ordenação**

Alguns *endpoints* da API dispõem do parâmetro *orderBy*, que permite ordenação por nome ou data de modificação. Adicione essa ordenação como opção na tela e faça um *input* de filtragem por nome.  

**Otimização**

Com tudo pronto, esse é o momento para repassar o código e refatorar ou otimizar o que ficou para trás. Implementar melhorias ou aqueles mínimos detalhes, que fazem toda a diferença!  



----------

**2. Backend Mastery**

# 2.1 Desafio - Start small

A API da marvel é excelente, porém tem um grande defeito: Não nos deixa adicionar os excelentes episódios do Rick and Morty! Para remediar isso, você decidiu criar um servidor que interfaceasse com a API e provesse uma estrutura de dados para armazenar seus próprios items.  


- Modele a base de dados. Como serão as relações entre os dados?  
- Implemente uma interface REST básica onde podemos fazer inserção/edição/remoção de items na nossa base. Caso o item não exista nela, devemos checar na API da marvel. A resposta deve seguir a mesma estrutura da API original, portanto para um frontend deve ser transparente.  
# 2.2 Desafio - Think bigger

Agora que temos um servidor básico,  vamos fazer ele robusto! Imagine que você acaba de atrair algumas centenas de fãs de R&M, que estão loucos para se degladiar em quem vai adicionar ou modificar os títulos primeiro 😞. Devemos prevenir o vandalismo e controlar os acessos, de forma que a edição seja moderada.


- Implemente um sistema de autenticação. Ele deve ser seguro (bcrypt), e de preferência independente do frontend, ou seja, se um dia decidirmos migrar para mobile não teremos nenhum problema. Para tal, use alguma forma de authentication token.
- Implemente um sistema de autorização onde você possa atribuir permissões diferentes para diferentes usuários, como moderadores e editores.

Questão bônus: Se o usuário não puder logar em dois lugares ao mesmo tempo, como você implementaria? Quais seriam os possíveis problemas e como você solucionaria?


----------
# 3. Desafio Bonus - Wubba lubba dub dub

Se você é um daqueles que *gabaritou* os desafios. **RESPECT 😉**   
Para o *grand finale* tente integrar o seu backend com o seu frontend, remova a camada de autenticação que criamos e use a sua própria.  

Faça as integrações necessárias, e adapte seu frontend e seu backend para que os dois possam conversar, atendendo as necessidades do usuário. 🙂  

Use e abuse do bom senso.

BOA SORTE!

----------

# Referências

* [git - the simple guide](https://rogerdudler.github.io/git-guide/)
* [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
* [10 Best Practices for Better RESTful API](https://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/)
* [Mostly Adequate Guide to Functional Programming](https://github.com/MostlyAdequate/mostly-adequate-guide)
* [BEM - Block Element Modifier](http://getbem.com/introduction/)