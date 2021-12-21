const express = require('express');
const router = express.Router();

const ProductController = require('./controllers/ProductController');

router.get('/produtos', ProductController.listarTodos);
router.get('/cadastrar', ProductController.productForm)
router.post('/cadastrar', ProductController.cadastrar);
router.get('/compra/:id', ProductController.formCompra);
router.post('/compra/:id', ProductController.procCompra);

module.exports = router;