const conn = require('../db');
const Gerencianet = require('gn-api-sdk-node');
const moment = require ('moment');
module.exports = {
    listarTodos: (req, res) => {
        conn.query('SELECT * FROM produtos', (err, rows) => {
            if (err){
                console.log(err);
                res.send("Erro ao buscar produtos cadastrados!\n");
            }else{
                res.render('listarProdutos', { rows });
            }
        });
    },

    productForm: (req, res) => {
        res.render('cadastro');
    },

    cadastrar: (req, res) => {
        const nome = req.body.nome;
        const valor = req.body.valor;
        conn.query('INSERT INTO produtos (nome, valor) VALUES(?, ?)', [nome, valor],
            (err, rows)=> {
                if (err){
                    console.log(err);
                }else{
                    res.render('cadastro', { alert: 'Produto cadastrado!'});
                }
            console.log("produto adicionado!", rows);
        });
    },

    formCompra: (req, res) => {
        conn.query('SELECT * FROM produtos WHERE id=?', [req.params.id], (err, rows) => {
            if (err){
                console.log(err);
            }else {
                console.log(rows);
                res.render('formcompra', {rows});
            }
        });
    },

    procCompra: (req, res) => {
        const {nome, cpf, telefone} = req.body;
        let produto;
        conn.query('SELECT * FROM produtos WHERE id=?', [req.params.id],
        (err, rows) => {
            if(err){
                console.log (err);
            }else {
                produto = rows[0];

                const clientId = 'Client_Id_4e4327e045ceb277ed5f62db8c46c399c309e0bf';
                const clientSecret = 'Client_Secret_bb1ad596c70e1c17089cd27ec860816670412681';
                const options = {
                    client_id: clientId,
                    client_secret: clientSecret,
                    sandbox: true
                }
                let expire = moment().add(2, 'days').format('YYYY-MM-DD');

                let boleto = {
                    payment: {
                        banking_billet: {
                            expire_at: expire,
                            customer: {
                                name: nome,
                                cpf: cpf,
                                phone_number: telefone
                            }
                        }
                    },
                    items: [{
                        name: produto.nome,
                        value: produto.valor*100,
                        amount: 1
                    }]
                }

                const gn = new Gerencianet(options);

                gn.oneStep({}, boleto).then((response) => {
                    console.log("Retorno da emissão", response);
                    const {charge_id, link} = response;

                    conn.query('INSERT INTO compras SET id_boleto = ?, link_pdf = ?',
                        [charge_id, link], (err, rows) => {
                            if (err){
                                console.log(err);
                            }else {
                                console.log("boleto gerado!", rows);
                                res.redirect(link);
                            }
                    });
                })

                .catch((err) => {
                    console.log('Erro na emissão do boleto', err);
                })

            }
        });
    }
}