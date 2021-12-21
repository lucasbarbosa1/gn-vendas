# Gn-Vendas

## Resumo
Gn-vendas é uma aplicação web desenvolvida para a vaga de analista de dados na empresa Gerencianet. Trata-se de um sistema que simula o cadastro, a listagem e a venda de produtos. Foi dividido nas seguintes rotas:

- /produtos -> Lista os produtos cadastrados, contendo um botão de compra para cada produto e também um botão para cadastro de novo produto.
- /cadastrar -> Quando o usuário clica no botão "Cadastrar novo produto", é redirecionado para esta página, que possui os campos de preenchimento obrigatório para cadastro do produto, bem como dois botões "Cadastrar" e "Voltar". O primeiro envia a requisição e se tudo estiver corretamente preenchido, salva os dados do novo produto no banco. Caso o usuário clique em "Voltar", é redirecionado para a página /produtos.
- /compra -> Quando o usuário clica no botão "Comprar" ao lado de algum produto, é encaminhado para a página /compra/:id que conterá as informações do produto selecionado para compra e um formulário para a geração do boleto. Ao clicar no botão "Gerar Boleto", caso os dados tenham sido preenchidos corretamente, o usuário é redirecionado para a página contendo o boleto.

## Tecnologias utilizadas
- Backend - Javascript (NodeJS)
- Frontend - HTML/Css/Javascript (Bootstrap, Handlebars)
- Bando de dados - Mysql 

## Execução

Primeiramente, para o banco de dados foi criado um arquivo variaveis.env, que pode ser editado para guardar os valores necessários (DB_HOST, DB_USER, DB_PASS, DB_NAME) para a conexão com o banco. Além disso, neste arquivo também há uma variável PORT que armazena o valor da porta escolhida para executar o servidor local (no meu caso, 3000). Para executar:

- Instalar as dependências do projeto na pasta do mesmo (node, express, gn-apisdk-node, moment, mysql, express-handlebars, cors, dotenv).
- Após a instalação, para executar o projeto basta digitar no terminal 
```sh
npm start
```
- Ao abrir http://localhost:PORT/produtos, é exibida a tela contendo a listagem dos produtos, bem como as opções de comprar e cadastrar produto, que redirecionam para as páginas já descritas anteriormente.





**Desenvolvido por Lucas Barbosa**

