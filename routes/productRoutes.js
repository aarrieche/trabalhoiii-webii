const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');
const { verifyPermission } = require('../middlewares/permissionsMiddleware');


router.use(verifyPermission('Módulo de Produtos'));

router.get('/', getProducts);

module.exports = router;
