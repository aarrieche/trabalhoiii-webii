const express = require('express');
const router = express.Router();
const { getReports } = require('../controllers/reportController');
const { verifyPermission } = require('../middlewares/permissionsMiddleware');


router.use(verifyPermission('Módulo de Relatórios'));

router.get('/', getReports);

module.exports = router;
