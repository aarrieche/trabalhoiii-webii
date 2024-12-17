const express = require('express');
const router = express.Router();
const { getFinanceData } = require('../controllers/financeController');
const { verifyPermission } = require('../middlewares/permissionsMiddleware');


router.use(verifyPermission('Módulo Financeiro'));


router.get('/', getFinanceData);

module.exports = router;
