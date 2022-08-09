const { Router } = require('express');
const { dashboard } = require('../controllers/dashboard');

const router = Router();

router.get('/', dashboard);

router.post('/', dashboard);

module.exports = router;


