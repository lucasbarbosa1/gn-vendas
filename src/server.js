require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const handlebars = require('express-handlebars');

const server = express();

server.use(cors());
server.use(express.urlencoded({extended: false}));
server.use(express.json());

server.use(express.static('public'));

server.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
server.set('view engine', 'handlebars');

server.use('/', routes);

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
})

